
import React from 'react';
import { Link } from 'react-router-dom';

interface Course {
  courseId: string;
  title: string;
  teacherName: string;
  courseRate: number;
  currentRegistrants: number;
  cost: number;
  discountPrice?: number;
  image: string;
}

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({course}) => {

  if (!course) {
    return <div>در حال بارگذاری...</div>;
  }

  const {
    courseId,
    title,
    teacherName,
    courseRate,
    currentRegistrants,
    cost,
    discountPrice,
    image,
  } = course;

const renderStars = () => {
  const stars = [];
  const fullStars = Math.floor(courseRate.avg);
  const hasHalfStar = courseRate.avg % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <span key={`star-${i}`} className="text-luko-yellow">
        ★
      </span>
    );
  }

  if (hasHalfStar) {
    stars.push(
      <span key="half-star" className="text-luko-yellow">
        ★
      </span>
    );
  }

  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <span key={`empty-star-${i}`} className="text-gray-300">
        ★
      </span>
    );
  }

  return stars;
};

  return (
    <div className="course-card bg-white rounded-lg overflow-hidden shadow-md rtl">
      <div className="relative">
        <Link to={`/courses/${courseId}`}>
          <div className="h-48 w-full rounded-t-lg overflow-hidden">
            <img
              src={image || "./lovable-uploads/news.png"}
              alt={title}
              className="w-full h-48 object-cover"
            />

          </div>
        </Link>
      </div>
      <div className="p-4">
        <Link to={`/courses/${courseId}`} className="block">
          <h3 className="font-bold text-lg mb-2 text-gray-800">{title}</h3>
        </Link>
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
          <span>{teacherName}</span>
        </div>
        <div className="flex items-center mb-2">
          <div className="flex text-lg">{renderStars()}</div>
          <span className="text-sm text-gray-500 mr-1">
            ({courseRate.avg} از {courseRate.count} رأی)
          </span>
        </div>
        <div className="flex items-center text-sm text-gray-600 mb-4">
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
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <span>{currentRegistrants} دانشجو</span>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="ltr">
            {discountPrice ? (
              <div className="flex flex-col items-end">
                <span className="text-gray-500 line-through text-sm">
                  {cost.toLocaleString()} تومان
                </span>
                <span className="text-luko-teal font-bold">
                  {discountPrice.toLocaleString()} تومان
                </span>
              </div>
            ) : (
              <span className="text-luko-teal font-bold">
                {cost.toLocaleString()} تومان
              </span>
            )}
          </div>
          <button className="bg-luko-teal text-white p-2 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
