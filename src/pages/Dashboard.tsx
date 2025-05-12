import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { getTopCourse } from "@/services/api/course/courseService";
import { getBlogs } from "@/services/api/blog/blogServices";
import { IoPersonOutline } from "react-icons/io5";
const Dashboard: React.FC = () => {
  const [TopCourseData, setTopCourseData] = useState([]);
  const [TopNewsData, setTopNewsData] = useState([]);

  async function topNews() {
    const callApi = await getBlogs(3, 1);

    console.log(callApi?.data?.news);

    setTopNewsData(callApi?.data?.news);
  }
  async function topCourse() {
    const callApi = await getTopCourse("3");

    console.log(callApi?.data);

    setTopCourseData(callApi?.data);
  }
  console.log(TopCourseData);

  useEffect(() => {
    topCourse();
    topNews();
  }, []);
  // Sample user data
  const user = {
    name: "فلان فلانی",
    fullName: "فلان فلانی زاده فلان آبادی",
    avatar: "public/lovable-uploads/ostad.png",
    progress: 60,
    enrolledCourses: 14,
    purchasedCourses: 2,
    email: "folani99@gmail.com",
    phone: "09123456789",
    birthDate: "1380/05/11",
    gender: "مرد",
    address:
      "مازندران - ساری - خیابان فرح آباد - خیابان دانشجویان - ساختمان مرجان 10 - واحد 15",
    nationalCode: "--",
    bio: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد",
  };

  // News and updates
  const news = [
    {
      id: "1",
      title: "دوره آموزش جامع و پیشرفته NextJs منتشر شدند",
      date: "1402/02/30",
      isNew: true,
    },
    {
      id: "2",
      title: "تخفیف ویژه دوره‌های React را از دست ندهید",
      date: "1402/01/25",
    },
    { id: "3", title: "دوره آموزش tailwind به‌روز شد", date: "1402/01/23" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex direction-reverse">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white p-4 shadow-sm flex justify-between items-center rtl">
          <div className="flex items-center">
            <Link to="/" className="block">
              <Logo />
            </Link>
          </div>

          <div className="flex items-center space-x-4 space-x-reverse">
            <Link to="/notifications" className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </Link>

            <Link to="/cart" className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="absolute top-0 right-0 h-4 w-4 bg-orange-500 rounded-full text-xs text-white flex items-center justify-center">
                1
              </span>
            </Link>

            <Link to="/" className="text-luko-teal">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </Link>
          </div>
        </header>

        {/* Main Dashboard */}
        <main className="flex-1 p-6 ">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-6 rtl">
              {/* User Stats */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="relative">
                  <div className="flex justify-between items-center mb-6">
                    <div className="w-20 h-20 text-center mb-14">
                      <div className="relative ">
                        <svg viewBox="0 0 36 36" className="w-full h-full">
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#E5E7EB"
                            strokeWidth="2"
                            strokeDasharray="100, 100"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#F59E0B"
                            strokeWidth="2"
                            strokeDasharray={`${user.progress}, 100`}
                          />
                        </svg>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-orange-500 ">
                          {user.progress}%
                        </div>
                      </div>
                      <div className="text-xs text-gray-600  ">
                        برای شرکت در دوره ها باید حداقل ۸۰٪ پروفایل خود را تکمیل
                        کنید
                      </div>
                    </div>

                    <div className="flex-1 flex justify-center space-x-12 space-x-reverse">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-orange-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                        </div>
                        <div className="mt-2">
                          <div className="font-bold text-xl">
                            {user.purchasedCourses}
                          </div>
                          <div className="text-sm text-gray-600">
                            دوره خرید کرده اید
                          </div>
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-blue-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                          </svg>
                        </div>
                        <div className="mt-2">
                          <div className="font-bold text-xl">
                            {user.enrolledCourses}
                          </div>
                          <div className="text-sm text-gray-600">
                            شرکت کرده اید
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h2 className="text-xl font-bold mb-4">
                    جدید ترین اخبار و مقالات
                  </h2>
                  <div className="space-y-4">
                    {news.map((item) => (
                      <div
                        key={item.id}
                        className={`border-b pb-2 ${
                          item.isNew ? "border-r-2 border-r-red-500 pr-2" : ""
                        }`}
                      >
                        <div
                          className={`flex justify-between items-center ${
                            item.isNew ? "text-red-500" : ""
                          }`}
                        >
                          <Link
                            to={`/blog/${item.id}`}
                            className="hover:text-luko-teal"
                          >
                            {item.title}
                          </Link>
                          <span className="text-xs text-gray-500">
                            {item.date}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Course Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6 ">
                  <h2 className="text-lg font-bold mb-4">دوره های پیشنهادی</h2>
                  <div className="space-y-4">
                    {TopCourseData.map((course: any) => (
                      <div
                        key={course?.courseId}
                        className="max-w-[336px] rounded-[10px] bg-[#F9F9F9] p-5 flex"
                      >
                        <div className="flex flex-col gap-6 p-2">
                          <h3>{course?.title}</h3>
                          <div className="flex justify-between">
                            <div className="text-[#26B4AF] flex gap-2 items-center">
                              <IoPersonOutline className="size-4" />
                              <span>{course?.teacherName}</span>
                            </div>
                            <span>tarikh</span>
                          </div>
                        </div>
                        <div className="p-2">
                          <img
                            src={course?.tumbImageAddress}
                            alt="course img"
                            className="w-[88px] h-[60px] rounded-[6px]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <Link
                      to="/courses"
                      className="text-xs text-luko-teal hover:underline"
                    >
                      مشاهده همه
                    </Link>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-bold mb-4">
                    دوره های در حال برگزاری
                  </h2>
                  <div className="space-y-4">
                    {TopNewsData.map((course) => (
                      <div
                        key={course?.id}
                        className="border rounded-lg overflow-hidden"
                      >
                        <div className="aspect-w-3 aspect-h-2 bg-gradient-to-br from-blue-500 to-purple-400">
                          <div className="p-4 flex justify-center items-center">
                            <img
                              src={course?.currentImageAddressTumb}
                              alt={course?.title}
                              className="w-20 h-20 object-contain bg-black/40 rounded-full p-2"
                            />
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-gray-800 mb-1">
                            {course?.title}
                          </h3>
                          <div className="text-xs text-gray-500 mb-2 flex items-center">
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
                                strokeWidth={1.5}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                            <span>{course?.addUserFullName}</span>
                          </div>
                          <div className="text-gray-500 mb-1 text-sm">
                            {course?.miniDescribe}
                          </div>
                          <Link
                            to={`/courses/${course?.id}`}
                            className="text-xs text-luko-teal hover:underline inline-flex items-center"
                          >
                            <span>ادامه استفاده از دوره</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <Link
                      to="/dashboard/courses"
                      className="text-xs text-luko-teal hover:underline"
                    >
                      مشاهده همه
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="bg-luko-teal text-white rounded-lg shadow-sm overflow-hidden rtl ">
              {/* User Profile */}
              <div className="p-6 flex flex-col items-center">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white"
                />
                <h2 className="text-xl font-bold mt-4">
                  {user.name} خوش آمدید
                </h2>
                <div className="mt-6 w-full">
                  <div className="flex justify-between items-center mb-3">
                    <button className="w-full bg-white text-luko-teal py-2 rounded-lg font-bold">
                      داشبورد
                    </button>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="p-6 space-y-2 border-t border-luko-teal/20 ">
                <Link
                  to="/profile"
                  className="flex items-center py-3 px-4 hover:bg-luko-teal/20 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>اطلاعات کاربری</span>
                </Link>
                <Link
                  to="/dashboard/courses"
                  className="flex items-center py-3 px-4 hover:bg-luko-teal/20 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  <span>دوره های من</span>
                </Link>
                <Link
                  to="/dashboard/reserved"
                  className="flex items-center py-3 px-4 hover:bg-luko-teal/20 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span>دوره های رزرو شده</span>
                </Link>
                <Link
                  to="/dashboard/comments"
                  className="flex items-center py-3 px-4 hover:bg-luko-teal/20 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                  <span>دیدگاه های من</span>
                </Link>
                <Link
                  to="/dashboard/favorites"
                  className="flex items-center py-3 px-4 hover:bg-luko-teal/20 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span>علاقه مندی ها</span>
                </Link>
                <Link
                  to="/dashboard/security"
                  className="flex items-center py-3 px-4 hover:bg-luko-teal/20 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span>تنظیمات امنیتی</span>
                </Link>
                <div className="border-t border-luko-teal/20 pt-2 mt-2">
                  <Link
                    to="/logout"
                    className="flex items-center py-3 px-4 hover:bg-luko-teal/20 rounded-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span>خروج از حساب</span>
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
