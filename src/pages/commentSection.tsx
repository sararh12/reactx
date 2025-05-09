import axios from "axios";
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

interface Comment {
  id: string;
  newsId?: string;
  courseId?: string;
  parentId?: string;
  currentUserLikeId?: string | null;
  inserDate: string;
  title: string;
  describe: string;
  likeCount: number;
  dissLikeCount: number;
  replyCount: number;
  currentUserIsLike: boolean;
  currentUserIsDissLike: boolean;
  autor: string;
  pictureAddress?: string | null;
}

export interface CommentEndpoints {
  createComment: string;
  likeComment: (commentId: string) => string;
  dislikeComment: (commentId: string) => string;
  deleteCommentLike: string | ((entityId: string) => string);
  getReplies: (commentId: string) => string;
  createReplyComment: string;
}

interface ArticleCommentPayload {
  newsId: string;
  title: string;
  describe: string;
  userId: number;
  parentId?: string;
}

// For new course comment (formdata) - Used to guide FormData construction
interface NewCourseCommentSchema {
  CourseId: string;
  Title: string;
  Describe: string;
}


interface CourseReplySchema {
  CommentId: string;
  CourseId: string;
  Title: string;
  Describe: string;
}


interface ApiErrorResponse {
  ErrorType?: string;
  ErrorMessage?: string | string[];
  message?: string; 
  errors?: Record<string, string[]>;
}

interface CommentSectionProps {
  comments: Comment[];
  refetchData: () => Promise<void>;
  endpoints: CommentEndpoints;
  contentId: string;
  contentType: "article" | "course";
  totalCommentsCount: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  refetchData,
  endpoints,
  contentId,
  contentType,
  totalCommentsCount,
}) => {
  const [loadedReplies, setLoadedReplies] = useState<Record<string, Comment[]>>(
    {}
  );
  const [expandedReplies, setExpandedReplies] = useState<
    Record<string, boolean>
  >({});
  const [loadingReplies, setLoadingReplies] = useState<Record<string, boolean>>(
    {}
  );
  const [commentText, setCommentText] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>(
    {}
  );

  const { toast } = useToast();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const handleCommentLikeDislike = async (
    commentId: string,
    likeType: boolean
  ) => {
    const token = localStorage.getItem("token");
    let comment = comments.find((c) => c.id === commentId);
    if (!comment) {
      for (const parentIdKey in loadedReplies) {
        const reply = loadedReplies[parentIdKey].find(
          (r) => r.id === commentId
        );
        if (reply) {
          comment = reply;
          break;
        }
      }
    }

    if (!comment) return;

    const isUndoingLike = likeType === true && comment.currentUserIsLike;
    const isUndoingDislike =
      likeType === false && comment.currentUserIsDissLike;

    try {
      if (isUndoingLike || isUndoingDislike) {
        if (
          comment.currentUserLikeId &&
          comment.currentUserLikeId !== "00000000-0000-0000-0000-000000000000"
        ) {
          let deleteEndpointUrl: string;
          if (typeof endpoints.deleteCommentLike === "function") {
            deleteEndpointUrl = endpoints.deleteCommentLike(
              comment.currentUserLikeId
            );
          } else {
            deleteEndpointUrl = endpoints.deleteCommentLike;
          }

          await axios.delete(deleteEndpointUrl, {
            headers: { Authorization: `Bearer ${token}` },
            data: { deleteEntityId: comment.currentUserLikeId }, 
          });
          toast({ title: "بازخورد شما حذف شد" });
        }
      } else {
        const endpoint = likeType
          ? endpoints.likeComment(commentId)
          : endpoints.dislikeComment(commentId);

        await axios.post(
          endpoint,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast({ title: likeType ? "نظر پسندیده شد" : "نظر دیسلایک شد" });
      }

      await refetchData();

      if (likeType) {
        setLikedComments((prev) => ({
          ...prev,
          [commentId]: !isUndoingLike,
        }));
      }
    } catch (err) {
      console.error("Error liking/disliking comment:", err);
      toast({
        title: "خطا در ثبت بازخورد",
        description: "لطفا دوباره تلاش کنید.",
        variant: "destructive",
      });
    }
  };

  const handleSubmitCommentOrReply = async (
    e: React.FormEvent,
    parentId?: string
  ) => {
    e.preventDefault();
    const userIdString = localStorage.getItem('userId');
    const token = localStorage.getItem("token");
    const textToSubmit = parentId ? replyText : commentText;

    if (!userIdString && contentType !== "course") { // UserId required for articles, not for course formdata
      toast({
        title: "خطا در احراز هویت",
        description: "شناسه کاربر یافت نشد. لطفا مجددا وارد شوید.",
        variant: "destructive",
      });
      return;
    }

    const parsedUserId = parseInt(userIdString || "0", 10);
    if (isNaN(parsedUserId) && contentType !== "course") {
      toast({
        title: "خطای شناسه کاربری",
        description: "شناسه کاربر نامعتبر است.",
        variant: "destructive",
      });
      return;
    }


    if (!textToSubmit.trim() || !contentId) {
      toast({
        title: "خطا",
        description: parentId
          ? "لطفا متن پاسخ را وارد کنید"
          : "لطفا نظر خود را وارد کنید",
        variant: "destructive",
      });
      return;
    }

    let payload: ArticleCommentPayload | FormData;
    let endpointUrl: string;
    let headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
      // Default to JSON, will be overridden for FormData
      "Content-Type": "application/json",
    };

    if (contentType === "article") {
      const titleForArticleComment = parentId
        ? `پاسخ به ${comments.find((c) => c.id === parentId)?.autor || "نظر"}`
        : "نظر جدید";
      payload = {
        newsId: contentId,
        title: titleForArticleComment,
        describe: textToSubmit,
        userId: parsedUserId, // Use parsed User ID
        ...(parentId && { parentId }),
      };
      endpointUrl = parentId
        ? endpoints.createReplyComment
        : endpoints.createComment;
    } else { // contentType === 'course', both new and reply are FormData
      const formData = new FormData();
      formData.append("CourseId", contentId);
      formData.append("Describe", textToSubmit);

      if (parentId) { // Replying to a course comment
        formData.append("CommentId", parentId); // This is the ParentId
        formData.append("Title", "پاسخ به نظر"); // Generic title for reply
        endpointUrl = endpoints.createReplyComment;
      } else { // New course comment
        formData.append("Title", "نظر برای دوره"); // Generic title for new comment
        endpointUrl = endpoints.createComment;
      }
      // UserId is NOT appended for FormData as per Postman (likely from token for course comments)
      payload = formData;
      headers = { // Override headers for FormData
        Authorization: `Bearer ${token}`,
        // "Content-Type": "multipart/form-data" is set automatically by axios for FormData
      };
    }

    try {
      await axios.post(endpointUrl, payload, { headers });

      toast({
        title: parentId ? "پاسخ شما ثبت شد" : "نظر شما ثبت شد",
        description: "پس از تایید نمایش داده خواهد شد",
      });

      if (parentId) {
        setReplyText("");
        setReplyingTo(null);
      } else {
        setCommentText("");
      }

      await refetchData();
    } catch (err) {
      console.error("Error submitting comment/reply:", err);
      let errorDescription = "لطفا دوباره تلاش کنید.";
      if (axios.isAxiosError(err) && err.response?.data) {
        const apiError = err.response.data as ApiErrorResponse;
        if (
          Array.isArray(apiError.ErrorMessage) &&
          apiError.ErrorMessage.length > 0
        ) {
          errorDescription = apiError.ErrorMessage.join("\n");
        } else if (typeof apiError.ErrorMessage === "string") {
          errorDescription = apiError.ErrorMessage;
        } else if (apiError.message) {
          errorDescription = apiError.message;
        } else if (apiError.errors) {
          const validationErrors = Object.values(apiError.errors).flat();
          if (validationErrors.length > 0) {
            errorDescription = (validationErrors as string[]).join(", ");
          }
        } else if (typeof apiError === "string") {
          errorDescription = apiError;
        }
      }
      toast({
        title:
          (axios.isAxiosError(err) && err.response?.data as ApiErrorResponse)?.ErrorType ||
          "خطا در ارسال",
        description: errorDescription,
        variant: "destructive",
      });
    }
  };

  const handleInitiateReply = (commentId: string) => {
    setReplyingTo(commentId);
    setReplyText("");
  };

  const handleToggleReplies = async (parentCommentId: string) => {
    const token = localStorage.getItem("token");
    if (loadedReplies[parentCommentId]) {
      setExpandedReplies((prev) => ({
        ...prev,
        [parentCommentId]: !prev[parentCommentId],
      }));
      return;
    }

    setLoadingReplies((prev) => ({ ...prev, [parentCommentId]: true }));
    try {
      const response = await axios.get<Comment[]>( // Ensure Comment type here matches display needs
        endpoints.getReplies(parentCommentId),
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLoadedReplies((prev) => ({
        ...prev,
        [parentCommentId]: response.data,
      }));
      setExpandedReplies((prev) => ({ ...prev, [parentCommentId]: true }));
    } catch (err) {
      console.error(
        `Error fetching replies for comment ${parentCommentId}:`,
        err
      );
      toast({
        title: "خطا در دریافت پاسخ‌ها",
        variant: "destructive",
      });
    } finally {
      setLoadingReplies((prev) => ({ ...prev, [parentCommentId]: false }));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg mt-8 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          نظرات{" "}
          {comments && comments.length > 0 ? `(${totalCommentsCount})` : "(۰)"}
        </h2>
      </div>

      <form onSubmit={handleSubmitCommentOrReply} className="mb-8">
        <textarea
          placeholder="نظر خود را بنویسید..."
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-luko-teal focus:border-transparent transition-shadow"
          rows={4}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        ></textarea>
        <Button
          type="submit"
          className="bg-luko-teal hover:bg-luko-teal/90 text-white px-6 py-2 rounded-lg transition-colors"
        >
          ارسال دیدگاه جدید
        </Button>
      </form>

      {comments && comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="border rounded-lg p-4 bg-gray-50/50"
            >
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-luko-teal/20 flex items-center justify-center overflow-hidden">
                  {comment.pictureAddress ? (
                    <img
                      src={comment.pictureAddress}
                      alt={comment.autor}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-luko-teal font-bold">
                      {comment.autor?.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="mr-4 flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-semibold text-gray-800">
                      {comment.autor}
                    </h4>
                    <div className="text-xs text-gray-500">
                      {formatDate(comment.inserDate)}
                    </div>
                  </div>
                  {comment.title && (
                    <div className="font-medium text-sm text-gray-700 mb-1">
                      {comment.title}
                    </div>
                  )}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {comment.describe}
                  </p>
                  <div className="flex items-center mt-3 text-gray-500 text-xs">
                    <button
                      className={`flex items-center ml-4 hover:text-luko-teal transition-colors ${likedComments[comment.id] || comment.currentUserIsLike
                        ? "text-luko-teal"
                        : ""
                        }`}
                      onClick={() => handleCommentLikeDislike(comment.id, true)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.865.8L2 10.5z" />
                      </svg>
                      {comment.likeCount}
                    </button>
                    <button
                      className={`flex items-center ml-4 hover:text-red-500 transition-colors ${comment.currentUserIsDissLike ? "text-red-500" : ""
                        }`}
                      onClick={() =>
                        handleCommentLikeDislike(comment.id, false)
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M18 9.5a1.5 1.5 0 01-3 0v-6a1.5 1.5 0 113 0v6zm-4 .167v-5.43a2 2 0 00-1.106-1.79l-.05-.025A4 4 0 0010.057 2H4.642a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 003.439 12H7V8a2 2 0 00-2-2 1 1 0 00-1 1v-.667a4 4 0 01.8-2.4L7.2 4.067a4 4 0 00.865-.8L12 1.5V9.5h2z" />
                      </svg>
                      {comment.dissLikeCount}
                    </button>
                    {comment.replyCount > 0 && (
                      <Button
                        variant="link"
                        className="text-xs text-luko-teal p-0 h-auto ml-4"
                        onClick={() => handleToggleReplies(comment.id)}
                        disabled={loadingReplies[comment.id]}
                      >
                        {loadingReplies[comment.id]
                          ? "در حال بارگذاری..."
                          : expandedReplies[comment.id]
                            ? "مخفی کردن پاسخ‌ها"
                            : `نمایش ${comment.replyCount} پاسخ`}
                      </Button>
                    )}
                    <button
                      className="flex items-center mr-auto hover:text-luko-teal transition-colors"
                      onClick={() => handleInitiateReply(comment.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                        />
                      </svg>
                      پاسخ
                    </button>
                  </div>
                </div>
              </div>

              {expandedReplies[comment.id] && loadedReplies[comment.id] && (
                <div className="mr-8 mt-3 space-y-3 pl-4 border-r-2 border-luko-teal/20">
                  {loadedReplies[comment.id].map((reply) => (
                    <div
                      key={reply.id}
                      className="border rounded-lg p-3 bg-white shadow-sm"
                    >
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-luko-teal/10 flex items-center justify-center overflow-hidden">
                          {reply.pictureAddress ? (
                            <img
                              src={reply.pictureAddress}
                              alt={reply.autor}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-luko-teal font-semibold text-sm">
                              {reply.autor?.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div className="mr-3 flex-1">
                          <div className="flex justify-between items-center mb-0.5">
                            <h5 className="font-semibold text-sm text-gray-700">
                              {reply.autor}
                            </h5>
                            <div className="text-xs text-gray-400">
                              {formatDate(reply.inserDate)}
                            </div>
                          </div>
                          {reply.title && (
                            <div className="font-medium text-xs text-gray-600 mb-1">
                              {reply.title}
                            </div>
                          )}
                          <p className="text-xs text-gray-600 leading-normal">
                            {reply.describe}
                          </p>
                          <div className="flex items-center mt-2 text-gray-500 text-xs">
                            <button
                              className={`flex items-center ml-3 hover:text-luko-teal transition-colors ${likedComments[reply.id] ||
                                reply.currentUserIsLike
                                ? "text-luko-teal"
                                : ""
                                }`}
                              onClick={() =>
                                handleCommentLikeDislike(reply.id, true)
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3 ml-0.5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.865.8L2 10.5z" />
                              </svg>
                              {reply.likeCount}
                            </button>
                            <button
                              className={`flex items-center ml-3 hover:text-red-500 transition-colors ${reply.currentUserIsDissLike
                                ? "text-red-500"
                                : ""
                                }`}
                              onClick={() =>
                                handleCommentLikeDislike(reply.id, false)
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3 ml-0.5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M18 9.5a1.5 1.5 0 01-3 0v-6a1.5 1.5 0 113 0v6zm-4 .167v-5.43a2 2 0 00-1.106-1.79l-.05-.025A4 4 0 0010.057 2H4.642a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 003.439 12H7V8a2 2 0 00-2-2 1 1 0 00-1 1v-.667a4 4 0 01.8-2.4L7.2 4.067a4 4 0 00.865-.8L12 1.5V9.5h2z" />
                              </svg>
                              {reply.dissLikeCount}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {replyingTo === comment.id && (
                <form
                  onSubmit={(e) => handleSubmitCommentOrReply(e, comment.id)}
                  className="mt-4 mr-12 pl-4 pb-2 border-r-2 border-luko-teal/30"
                >
                  <textarea
                    placeholder={`پاسخ به ${comment.autor}...`}
                    className="w-full border border-gray-300 rounded-lg p-2 mb-2 focus:ring-1 focus:ring-luko-teal focus:border-transparent transition-shadow text-sm"
                    rows={3}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    autoFocus
                  ></textarea>
                  <div className="flex justify-end space-x-2 space-x-reverse">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setReplyingTo(null)}
                      className="text-xs"
                    >
                      لغو
                    </Button>
                    <Button
                      type="submit"
                      size="sm"
                      className="bg-luko-teal hover:bg-luko-teal/90 text-white text-xs px-3 py-1"
                    >
                      ارسال پاسخ
                    </Button>
                  </div>
                </form>
              )}
            </div>
          ))}
          {totalCommentsCount > comments.length && (
            <div className="text-center mt-8">
              <Button
                variant="outline"
                className="border-gray-300 text-gray-600 hover:bg-gray-100 hover:border-gray-400"
              >
                مشاهده بیشتر
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </Button>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4">
          هنوز نظری ثبت نشده است. اولین نفر باشید!
        </p>
      )}
    </div>
  );
};

export default CommentSection;
