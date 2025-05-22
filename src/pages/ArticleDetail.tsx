import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import CommentSection from "./commentSection";
import {
  AddFavoriteBlogs,
  GetBlogsById,
  AddNewsDislike,
  AddNewsLike,
} from "@/services/api/blog/blogServices";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";

interface Comment {
  id: string;
  newsId: string;
  parentId: string;
  currentUserLikeId: string;
  inserDate: string;
  title: string;
  describe: string;
  likeCount: number;
  dissLikeCount: number;
  replyCount: number;
  currentUserIsLike: boolean;
  currentUserIsDissLike: boolean;
  autor: string;
  pictureAddress: string | null;
}

interface ArticleDetails {
  id: string;
  title: string;
  googleTitle: string;
  googleDescribe: string;
  miniDescribe: string;
  describe: string;
  keyword: string;
  shortLink: string | null;
  currentImageAddress: string | null;
  currentImageAddressTumb: string | null;
  insertDate: string;
  updateDate: string;
  currentRate: number;
  currentView: number;
  currentLikeCount: number;
  isSlider: boolean;
  active: boolean;
  userId: number;
  addUserFullName: string;
  newsCatregoryId: number;
  newsCatregoryName: string;
  commentsCount: number;
  inUsersFavoriteCount: number;
  currentUserFavoriteId: string;
  isCurrentUserFavorite: boolean;
  currentUserSetRate: boolean;
  currentUserRateNumber: number;
  currentUserIsLike: boolean;
  likeId: string;
  currentUserIsDissLike: boolean;
  currentDissLikeCount: number;
}

interface NewsDetailData {
  commentDtos: Comment[];
  detailsNewsDto: ArticleDetails;
}

const ArticleDetail: React.FC = () => {
  const { id: articleId } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [showAllContent, setShowAllContent] = useState(false);
  const [activeTab, setActiveTab] = useState("content");
  const [articleLiked, setArticleLiked] = useState(false);
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>(
    {}
  );
  const [articleData, setArticleData] = React.useState<NewsDetailData | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [AddFavorite, setAddFavorite] = useState(false);
  const [AddLike, setAddLike] = useState(false);
  const [AddDisike, setAddDislike] = useState(false);

  async function AddDislikeForNews(newsId) {
    const callApi = await AddNewsDislike(articleId);

    console.log(callApi?.data);

    setAddDislike(callApi?.data);
  }

  async function handleDislike(articleId: string) {
    try {
      const callApi = await AddNewsDislike(articleId);
      toast({ title: callApi?.data.message });
      console.log(callApi);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleLike(articleId: string) {
    try {
      const callApi = await AddNewsLike(articleId);
      toast({ title: callApi?.data.message });
      console.log(callApi);
    } catch (error) {
      console.log(error);
    }
  }

  async function GetDetails(articleId: string) {
    try {
      const res = await GetBlogsById(articleId);

      console.log(res?.data);
      setArticleData(res.data);
      if (res.data.detailsNewsDto.currentUserIsLike) {
        setArticleLiked(true);
      }
    } catch (err) {
      setError("خطا در دریافت اطلاعات مقاله.");
      console.error("Error fetching article:", err);
    }
  }

  async function AddFavNews() {
    const callApi = await AddFavoriteBlogs(articleId);

    console.log(callApi?.data);

    setAddFavorite(callApi?.data);
  }
  async function handleAddFavorite(articleId: string) {
    try {
      const callApi = await AddFavoriteBlogs(articleId);
      toast({ title: callApi?.data.message });
      console.log(callApi);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    GetDetails(articleId);
  }, [articleId]);

  const refetchArticleData = async () => {
    try {
      const response = await axios.get<NewsDetailData>(
        `https://classapi.sepehracademy.ir/api/News/${articleId}`
      );
      setArticleData(response.data);
      if (response.data.detailsNewsDto.currentUserIsLike) {
        setArticleLiked(true);
      } else {
        setArticleLiked(false);
      }
      setLikedComments({});
    } catch (err) {
      setError("خطا در به‌روزرسانی اطلاعات مقاله.");
      console.error("Error refetching article:", err);
    }
  };

  if (error) {
    return <div className="text-red-500 text-center py-10">{error}</div>;
  }

  if (!articleData) {
    return (
      <div className="text-center py-10 text-gray-500">
        در حال بارگذاری مقاله...
      </div>
    );
  }

  const article = articleData.detailsNewsDto;
  const comments = articleData.commentDtos;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "لینک کپی شد",
      description: "لینک مقاله در کلیپ‌بورد ذخیره شد",
    });
  };

  const keywords = article.keyword ? article.keyword.split(" ") : [];

  const commentEndpoints = {
    createComment: `https://classapi.sepehracademy.ir/api/News/CreateNewsComment`,
    likeComment: (commentId: string) =>
      `https://classapi.sepehracademy.ir/api/News/CommentLike/${commentId}?LikeType=true`,
    dislikeComment: (commentId: string) =>
      `https://classapi.sepehracademy.ir/api/News/CommentLike/${commentId}?LikeType=false`,
    deleteCommentLike: `https://classapi.sepehracademy.ir/api/News/DeleteCommentLikeNews`,
    getReplies: (commentId: string) =>
      `https://classapi.sepehracademy.ir/api/News/GetRepliesComments?Id=${commentId}`,
    createReplyComment: `https://classapi.sepehracademy.ir/api/News/CreateNewsReplyComment`,
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-grow rtl container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8">
            <article className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h1 className="text-3xl font-bold mb-3 text-gray-800">
                  {article.title}
                </h1>
                <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6 gap-x-4 gap-y-2">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1.5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>{formatDate(article.insertDate)}</span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1.5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{article.addUserFullName}</span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1.5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    <span>{article.currentView} بازدید</span>
                  </div>
                  <Button
                    variant="ghost"
                    className={`flex items-center text-gray-500 hover:text-luko-teal ${
                      articleData?.detailsNewsDto.isCurrentUserFavorite
                        ? "text-luko-teal font-semibold"
                        : ""
                    }`}
                    onClick={() => handleAddFavorite(articleId)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-1.5"
                      viewBox="0 0 24 24"
                      fill={
                        articleData?.detailsNewsDto.isCurrentUserFavorite
                          ? "currentColor"
                          : "none"
                      }
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      {articleData?.detailsNewsDto.isCurrentUserFavorite ? (
                        <path
                          fillRule="evenodd"
                          d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                          clipRule="evenodd"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.593 3.322c-1.1.128-2.13.526-3.026 1.158a9.703 9.703 0 00-4.96 0C8.607 4.402 7.577 4.004 6.477 3.876A49.022 49.022 0 004.5 4.752V19.5a.75.75 0 001.125.67l5.625-4.219 5.625 4.219A.75.75 0 0018 19.5V4.752c0-.87-.707-1.566-1.407-1.43z"
                        />
                      )}
                    </svg>
                    {/* {articleData?.detailsNewsDto.isCurrentUserFavorite
                      ? "ذخیره شده"
                      : "ذخیره"} */}
                  </Button>
                </div>
              </div>

              {article.currentImageAddress && (
                <img
                  src={article.currentImageAddress}
                  alt={article.title}
                  className="w-full h-auto object-cover"
                />
              )}

              <div className="p-6">
                <div className="text-sm text-gray-600 mb-6 leading-relaxed">
                  {article.miniDescribe}
                </div>

                <div
                  className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: article.describe,
                  }}
                />

                {keywords && keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-8 pt-4 border-t border-gray-200">
                    {keywords.map((tag, index) => (
                      <Link
                        key={index}
                        to={`/tag/${tag}`}
                        className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md text-xs hover:bg-luko-teal hover:text-white transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                )}

                <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between">
                  <div className="flex space-x-3 space-x-reverse">
                    <button onClick={() => handleLike(articleId)}>
                      {articleData?.detailsNewsDto.currentUserIsLike ? (
                        <AiFillLike className="size-6" />
                      ) : (
                        <AiOutlineLike className="size-6" />
                      )}
                    </button>

                    <button onClick={() => handleDislike(articleId)}>
                      {articleData?.detailsNewsDto.currentUserIsDissLike ? (
                        <AiFillDislike className="size-6" />
                      ) : (
                        <AiOutlineDislike className="size-6" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <CommentSection
                comments={comments}
                refetchData={refetchArticleData}
                endpoints={commentEndpoints}
                contentId={articleId || ""}
                contentType="article"
                totalCommentsCount={article.commentsCount}
              />
            </article>
          </div>

          <aside className="col-span-12 lg:col-span-4 space-y-6">
            <div className="bg-white p-5 rounded-lg shadow-lg">
              <h3 className="font-semibold text-lg mb-4 text-gray-800 border-b pb-2">
                دسته بندی
              </h3>
              <div className="space-y-3">
                <Link
                  to={`/category/${article.newsCatregoryId}`}
                  className="flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <span className="mr-3 text-sm text-gray-700 group-hover:text-luko-teal transition-colors">
                    {article.newsCatregoryName}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400 group-hover:text-luko-teal mr-auto transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="bg-white p-5 rounded-lg shadow-lg">
              <h3 className="font-semibold text-lg mb-4 text-gray-800 border-b pb-2">
                اطلاعات مقاله
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                  <span className="text-gray-600 text-sm">تاریخ انتشار:</span>
                  <span className="text-gray-800 text-sm font-medium">
                    {formatDate(article.insertDate)}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                  <span className="text-gray-600 text-sm">نویسنده:</span>
                  <span className="text-gray-800 text-sm font-medium">
                    {article.addUserFullName}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                  <span className="text-gray-600 text-sm">تعداد بازدید:</span>
                  <span className="text-gray-800 text-sm font-medium">
                    {article.currentView}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                  <span className="text-gray-600 text-sm">تعداد پسند:</span>
                  <span className="text-gray-800 text-sm font-medium">
                    {article.currentLikeCount}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                  <span className="text-gray-600 text-sm">تعداد نظرات:</span>
                  <span className="text-gray-800 text-sm font-medium">
                    {article.commentsCount}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-lg shadow-lg">
              <h3 className="font-semibold text-lg mb-4 text-gray-800 border-b pb-2">
                کلمات کلیدی
              </h3>
              <div className="flex flex-wrap gap-2">
                {keywords.map((tag, index) => (
                  <Link
                    key={index}
                    to={`/tag/${tag}`}
                    className="bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm hover:bg-luko-teal hover:text-white transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArticleDetail;
