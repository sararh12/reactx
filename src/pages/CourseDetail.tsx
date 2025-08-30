import CourseAccordion from "@/components/CourseAccordion";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  AddCourseLike,
  AddCourseReserve,
  AddFavoriteCourses,
  AddCourseDislike,
  RateCourse,
} from "@/services/api/course/courseService";
import { getTeacherDetail } from "@/services/api/teacher/teacherSevice";
import axios from "axios";
import React, { useState } from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { useParams } from "react-router-dom";
import CommentSection from "./commentSection";
import http from "@/services/interceptor/interceptor";
import { IoBookmark } from "react-icons/io5";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { IoPersonOutline } from "react-icons/io5";
import { FaMoneyBillWave, FaRegStar, FaStar } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import Rating from "react-rating";
import { LiaAngleDownSolid } from "react-icons/lia";

interface Comment {
  id: string;
  courseId: string;
  parentId?: string | null;
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

interface Teacher {
  pictureAddress?: string;
  fullName?: string;
  linkdinProfileLink: string;
  courseCounts: number;
  newsCount: number;
  histories: [];
  skills: [];
  teacherId: number;
}

interface CourseDetailData {
  courseId: string;
  title: string;
  subTitle?: string;
  describe: string;
  teacherName: string;
  teacherId: number;
  cost: number;
  capacity: number;
  imageAddress: string | null;
  isUserFavorite: boolean;
  isCourseReseve: number;
  currentUserLike: string;
  currentUserDissLike: string;
  sections: {
    id: string;
    title: string;
    lessons: number;
    duration: string;
  }[];

  courseRate?: number;
  currentRegistrants?: number;
  commentsCount?: number;
}

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [courseData, setCourseData] = React.useState<CourseDetailData | null>(
    null
  );
  const [courseComments, setCourseComments] = React.useState<Comment[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [loadingComments, setLoadingComments] = React.useState(true);
  const [teacherState, setTeacher] = useState<Teacher>();
  const [AddFavorite, setAddFavorite] = useState(false);
  const [AddLike, setAddLike] = useState(false);
  const [AddDisike, setAddDislike] = useState(false);
  const [rate, setRate] = useState(0);
  console.log(rate);
  console.log(courseData?.imageAddress);

  async function handleRating(value) {
    try {
      const callApi = await RateCourse(id, value);
      if (callApi?.data?.success) toast({ title: `${callApi?.data?.message}` });
    } catch (error) {
      console.log(error);
    }
  }

  async function AddDislikeForCourse(CourseId) {
    const callApi = await AddCourseDislike(courseData?.courseId);

    console.log(callApi?.data);

    setAddDislike(callApi?.data);
  }

  async function handleDislike(courseId: string) {
    try {
      const callApi = await AddCourseDislike(courseId);
      toast({ title: callApi?.data.message });
      console.log(callApi);
    } catch (error) {
      console.log(error);
    }
  }

  async function AddLikeForCourse(CourseId) {
    const callApi = await AddCourseLike(courseData?.courseId);

    console.log(callApi?.data);

    setAddLike(callApi?.data);
  }

  async function handleLike(courseId: string) {
    try {
      const callApi = await AddCourseLike(courseId);
      toast({ title: callApi?.data.message });
      console.log(callApi);
    } catch (error) {
      console.log(error);
    }
  }

  async function AddFavCourse() {
    const callApi = await AddFavoriteCourses(courseData?.courseId);

    console.log(callApi?.data);

    setAddFavorite(callApi?.data);
  }

  // useEffect(() => {
  //   if (courseData?.courseId) {
  //     AddFavCourse();
  //   }
  // }, [courseData]);

  async function handleReserve(courseId: string) {
    try {
      const callApi = await AddCourseReserve(courseId);
      toast({ title: callApi?.data.message });
      console.log(callApi);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAddFavorite(courseId: string) {
    try {
      const callApi = await AddFavoriteCourses(courseId);
      toast({ title: callApi?.data.message });
      console.log(callApi);
    } catch (error) {
      console.log(error);
    }
  }

  const teacherDetail = async (teacherId: number) => {
    const callApi = await getTeacherDetail(teacherId);
    setTeacher(callApi);
  };

  const fetchCourseComments = async () => {
    if (!id) return;
    setLoadingComments(true);
    try {
      const response = await axios.get<Comment[]>(
        `https://sepehracademy.liara.run/Course/GetCourseCommnets/${id}`
      );
      setCourseComments(response.data || []);
    } catch (error) {
      console.error("Error fetching course comments:", error);
      setCourseComments([]);
      toast({
        title: "خطا در دریافت نظرات دوره",
        description: "لطفا دوباره تلاش کنید.",
        variant: "destructive",
      });
    } finally {
      setLoadingComments(false);
    }
  };

  const fetchCourseDetails = async () => {
    if (!id) {
      console.error("Course ID is missing");
      setLoading(false);
      setCourseData(null);
      setCourseComments([]);
      return;
    }
    setLoading(true);
    try {
      const response = await http.get(`Home/GetCourseDetails?CourseId=${id}`);
      if (!response.data) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setRate(response?.data?.currentUserRateNumber);
      setCourseData(response.data as CourseDetailData);
      fetchCourseComments();
      console.log(response?.data?.teacherId);
      teacherDetail(response?.data?.teacherId);
    } catch (error) {
      console.error("Error fetching course details:", error);
      setCourseData(null);
      toast({
        title: "خطا در دریافت اطلاعات دوره",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchCourseDetails();
  }, [id]);

  const refetchDataAndComments = async () => {
    if (!id) return;
    setLoading(true);
    setLoadingComments(true);
    try {
      const detailsResponse = await fetch(
        `https://sepehracademy.liara.run/Home/GetCourseDetails?CourseId=${id}`
      );
      if (!detailsResponse.ok) {
        throw new Error(
          `HTTP error fetching details: ${detailsResponse.status}`
        );
      }
      const detailsData = await detailsResponse.json();
      setCourseData(detailsData as CourseDetailData);

      const commentsResponse = await axios.get<Comment[]>(
        `https://sepehracademy.liara.run/Course/GetCourseCommnets/${id}`
      );
      setCourseComments(commentsResponse.data || []);

      toast({ title: "اطلاعات دوره و نظرات به‌روزرسانی شد" });
    } catch (error) {
      console.error("Error refetching course data and comments:", error);
      toast({
        title: "خطا در به‌روزرسانی اطلاعات",
        description: "لطفا دوباره تلاش کنید.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setLoadingComments(false);
    }
  };

  const commentEndpoints = {
    createComment: `https://sepehracademy.liara.run/Course/AddCommentCourse`,
    likeComment: (commentId: string) =>
      `https://sepehracademy.liara.run/Course/AddCourseCommentLike?CourseCommandId=${commentId}`,
    dislikeComment: (commentId: string) =>
      `https://sepehracademy.liara.run/Course/AddCourseCommentDissLike?CourseCommandId=${commentId}`,
    deleteCommentLike: `https://classapi.sepehracademy.ir/api/Course/DeleteCourseCommentLike`,
    getReplies: (commentId: string) =>
      `https://sepehracademy.liara.run/Course/GetRepliesCourseComments?Id=${commentId}`,
    createReplyComment: `https://sepehracademy.liara.run/Course/AddReplyCourseComment`,
  };

  if (loading)
    return (
      <div className="text-center py-10">در حال بارگذاری اطلاعات دوره...</div>
    );
  if (!courseData)
    return <div className="text-center py-10">اطلاعات دوره یافت نشد.</div>;

  const teacher = courseData.teacherName;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow rtl">
        <div className="container mx-auto px-4 py-8">
          {/* Course Header */}
          <div className=" rounded-lg overflow-hidden mb-8">
            <div className="p-4 bg-white flex justify-between max-w-[1220px] mx-auto flex-col md:flex-row">
              <div className="p-4 max-w-[598px] rounded-2xl shadow-[0_8px_2px_0_#00000040] flex flex-col gap-4 min-w-[400px]">
                <div className="flex justify-between items-center ">
                  <h1 className="text-[29px]">{courseData?.title}</h1>
                  <div className="flex items-center gap-2">
                    <button
                      className="text-[#00B4AF]"
                      onClick={() => handleAddFavorite(courseData?.courseId)}
                    >
                      {courseData.isUserFavorite ? (
                        <IoBookmark className="size-6 " />
                      ) : (
                        <MdOutlineBookmarkBorder className="size-6 " />
                      )}
                    </button>
                    <div className="flex gap-2 text-[#00B4AF]">
                      <button
                        onClick={() => handleDislike(courseData?.courseId)}
                      >
                        {courseData.currentUserDissLike ? (
                          <AiFillDislike className="size-6" />
                        ) : (
                          <AiOutlineDislike className="size-6" />
                        )}
                      </button>
                      <button onClick={() => handleLike(courseData?.courseId)}>
                        {courseData.currentUserLike === "0" ? (
                          <AiOutlineLike className="size-6 " />
                        ) : (
                          <AiFillLike className="size-6 " />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <p className="text-[#777777] text-[20px] py-4">
                  {courseData?.miniDescribe}
                </p>
                <div className="flex justify-between items-center text-[#005B58]">
                  <div className="flex gap-2 items-center">
                    <IoPersonOutline />
                    <h3>{courseData?.teacherName}</h3>
                  </div>

                  <div className="flex gap-2 items-center">
                    <span>{courseData?.cost}</span>
                    <FaMoneyBillWave />
                  </div>
                </div>
                <button className="mt-5 mx-auto block w-[347px] bg-orange-500 hover:bg-orange-600 text-lg text-white h-12 rounded-[9px]">
                  <div
                    className="flex items-center text-center justify-center gap-2"
                    onClick={() => handleReserve(courseData?.courseId)}
                  >
                    <IoCartOutline />
                    {courseData.isCourseReseve 
                      ? "شرکت شده"
                      : "شرکت در دوره"}
                  </div>
                </button>
              </div>
              <div>
                <img
                  src={courseData?.imageAddress}
                  alt=""
                  className="w-[624px] h-[395px] rounded-[15px]"
                />
                
              </div>
            </div>
          </div>

          {/* Course Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-amber-500 text-2xl font-bold">
                    {courseData.courseRate || "N/A"}
                  </div>
                  <div className="text-sm text-gray-500">امتیاز دوره</div>
                </div>
                <div className="text-amber-500">
                  <Rating
                    initialRating={rate}
                    start={0}
                    step={1}
                    stop={5}
                    emptySymbol={<FaRegStar size={30} color="#ccc" />}
                    fullSymbol={<FaStar size={30} color="#FFD700" />}
                    onChange={handleRating}
                  />
                </div>
              </div>
              <div className="mt-4 h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-luko-teal rounded-full w-4/5"></div>
              </div>
              <div className="mt-4 text-sm text-gray-500">از مجموع ۲۵۰ رای</div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex flex-col">
                <div className="text-luko-teal text-2xl font-bold">
                  {courseData.currentRegistrants || 0}
                </div>
                <div className="text-sm text-gray-500">تعداد دانشجویان</div>
                <div className="flex items-center mt-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                    <div className="w-8 h-8 rounded-full bg-gray-400"></div>
                    <div className="w-8 h-8 rounded-full bg-gray-500"></div>
                  </div>
                  <div className="mr-4 text-xs text-gray-500">
                    و {courseData.capacity || 0} نفر دیگر
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-bold">دسترسی مادام‌العمر</div>
                  <div className="text-sm text-gray-500">بروزرسانی رایگان</div>
                </div>
                <div className="text-xl text-luko-teal">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Course Tabs */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="block text-[#005351] mr-5">توضیحات</div>

            <div className="p-6 shadow-[0_1px_2px_0_#00000040]">
              <div className="text-gray-700 leading-relaxed">
                <p className="mb-4">{courseData.describe}</p>

                <div className="mt-6 flex justify-center">
                  <Button
                    variant="outline"
                    className="text-[#006865] border-[#01CEC9] hover:bg-luko-teal/10  rounded-[45px] content-center flex"
                  >
                    مطالعه بیشتر
                    <LiaAngleDownSolid />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Course Syllabus */}
          <div className="bg-white rounded-lg shadow-md mb-8">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">سرفصل‌ها</h2>
            </div>

            <CourseAccordion sections={courseData.sections || []} />

            <div className="p-4 text-center">
              <Button variant="link" className="text-luko-teal">
                نمایش تمام سرفصل‌ها
              </Button>
            </div>
          </div>

          {/* Instructor */}
          {teacher && (
            <div className="bg-white rounded-lg shadow-md mb-8 p-6">
              <h2 className="text-xl font-bold mb-4">مدرس</h2>
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <img
                    src={teacherState?.pictureAddress || "/ostad.png"}
                    alt={courseData.teacherName || "مدرس دوره"}
                    className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-luko-teal"
                  />
                </div>
                <div className="md:w-3/4 md:pr-6">
                  <h3 className="text-lg font-bold mb-2">
                    {" "}
                    {courseData.teacherName}
                  </h3>
                  <div className="text-gray-500 mb-4"> مدرس دوره </div>
                  <p className="text-gray-700 mb-4">
                    استاد برجسته در زمینه برنامه‌نویسی و توسعه وب با بیش از ۱۰
                    سال سابقه تدریس.
                  </p>
                  <Button
                    variant="outline"
                    className="text-luko-teal border-luko-teal hover:bg-luko-teal/10"
                  >
                    مشاهده پروفایل مدرس
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Comments Section */}
          {loadingComments ? (
            <div className="text-center py-10">در حال بارگذاری نظرات...</div>
          ) : (
            <CommentSection
              comments={courseComments}
              refetchData={refetchDataAndComments}
              endpoints={commentEndpoints}
              contentId={courseData.courseId}
              contentType="course"
              totalCommentsCount={
                courseData.commentsCount !== undefined
                  ? courseData.commentsCount
                  : courseComments.length
              }
            />
          )}

          {/* Related Courses */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-6">دوره‌های مرتبط</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="h-40 bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <img
                      src={`/lovable-uploads/04f05962-568c-44ad-a091-a60a681fa24c.png`}
                      alt="React course"
                      className="h-16 w-16 rounded-full bg-black p-2"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-2">دوره پیشرفته جاوااسکریپت</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span>مهدی محمدی</span>
                    </div>
                    <div className="text-amber-500 mb-2">★★★★★</div>
                    <div className="text-luko-teal font-bold mt-2 text-left">
                      ۱,۴۵۰,۰۰۰ تومان
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CourseDetail;
