import CourseAccordion from "@/components/CourseAccordion";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import CommentSection from "./commentSection";
import { FaRegStar, FaStar } from "react-icons/fa";
import Rating from "react-rating";
import { LiaAngleDownSolid } from "react-icons/lia";
import useCourseDetails from "@/hooks/useCourseDetails";
import { CourseHeader } from "@/components/pages/courseDetails/courseDetailsHeader";

const CourseDetail: React.FC = () => {
  const {
    courseData,
    handleRating,
    courseComments,
    loading,
    loadingComments,
    teacherState,
    AddFavorite,
    AddLike,
    AddDisike,
    rate,
    AddDislikeForCourse,
    handleDislike,
    AddLikeForCourse,
    handleLike,
    AddFavCourse,
    handleReserve,
    handleAddFavorite,
    refetchDataAndComments,
    commentEndpoints,
    teacher,
  } = useCourseDetails();

  if (loading)
    return (
      <div className="text-center py-10">در حال بارگذاری اطلاعات دوره...</div>
    );
  if (!courseData)
    return <div className="text-center py-10">اطلاعات دوره یافت نشد.</div>;
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow rtl">
        <div className="container mx-auto px-4 py-8">
          {/* Course Header */}
          <CourseHeader />

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
