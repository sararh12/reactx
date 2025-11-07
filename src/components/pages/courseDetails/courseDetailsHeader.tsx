import React from "react";
import { IoPersonOutline, IoCartOutline, IoBookmark } from "react-icons/io5";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";
import { FaMoneyBillWave } from "react-icons/fa"; 
import useCourseDetails from "@/hooks/useCourseDetails";



export const CourseHeader = () => {

    const {
      courseData,
      handleAddFavorite,
      handleLike,
      handleDislike,
      handleReserve,
    } = useCourseDetails();

    if (!courseData) return null;
  return (
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
                <button onClick={() => handleDislike(courseData?.courseId)}>
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
              {courseData.isCourseReseve ? "شرکت شده" : "شرکت در دوره"}
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
  );
};
