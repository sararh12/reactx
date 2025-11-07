import React, { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import { GetAllMyCourses } from "@/services/api/course/courseService";
import { makeDatePersian } from "@/utils/persianDates";
import { IoWalletOutline } from "react-icons/io5";
import pic from "../../../public/lovable-uploads/pic.png";
import { IoIosCloseCircleOutline } from "react-icons/io";
import PaymentModal from "./PaymentModal";
import { useNavigate } from "react-router-dom";

const CoursesTable: React.FC = () => {
  const [MyCourses, setMyCourses] = useState([]);
  const [isModalShow, setisModalShow] = useState(false);
  const [InitialValue, setInitialValue] = useState(null);
   const navigate = useNavigate();

  console.log(InitialValue);

  async function MyCourse() {
    const callApi = await GetAllMyCourses();

    console.log(callApi?.data);

    setMyCourses(callApi?.data?.listOfMyCourses);
  }

  useEffect(() => {
    MyCourse();
  }, []);

  return (
    <div className="overflow-x-auto">
      {isModalShow && (
        <PaymentModal
          setisModalShow={setisModalShow}
          InitialValue={InitialValue}
        />
      )}
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-right py-4 px-6"></th>
            <th className="text-right py-4 px-6">نام دوره</th>
            <th className="text-right py-4 px-6">مدرس دوره</th>
            <th className="text-right py-4 px-6">تاریخ شروع</th>
            <th className="text-right py-4 px-6">قیمت (تومان)</th>
            <th className="text-right py-4 px-6"> وضعیت پرداخت</th>
            <th className="text-right py-4 px-6"></th>
          </tr>
        </thead>
        <tbody>
          {MyCourses.map((course) => (
            <tr key={course.courseId} className="border-b hover:bg-gray-50">
              <td className="py-4 px-6">
                <img
                  src={course.tumbImageAddress || pic}
                  className="w-[30px] h-[30px] rounded-full "
                />
              </td>
              <td className="py-4 px-6">{course.courseTitle}</td>
              <td className="py-4 px-6">{course.groupName}</td>
              <td className="py-4 px-6">
                {makeDatePersian(course.lastUpdate)}
              </td>
              <td className="py-4 px-6">{course.cost}</td>
              <td className="py-4 px-6">{course.paymentStatus}</td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-1">
                  <button
                    className="text-gray-600 hover:text-gray-900 flex items-center p-1"
                    onClick={() => {
                      setisModalShow(true);
                      setInitialValue({
                        courseId: course.courseId,
                        payment: course.cost,
                      });
                    }}
                    aria-label="پرداخت از کیف پول"
                  >
                    <IoWalletOutline className="size-5 text-[#00726F]" />
                  </button>

                  <button
                    className="text-gray-600 hover:text-gray-900 flex items-center p-1"
                    onClick={() => navigate(`/courses/${course?.courseId}`)}
                    aria-label="مشاهده جزئیات"
                  >
                    <Eye className="h-5 w-5 " />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoursesTable;
