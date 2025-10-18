import React, { useState, useEffect } from "react";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Eye, List } from "lucide-react";
import {
  GetMyCoursesReserve,
  DeleteCourseReserve,
  GetCourseWithId,
} from "@/services/api/course/courseService";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { makeDatePersian } from "@/utils/persianDates";
import { IoTrash } from "react-icons/io5";

const DashboardReserved: React.FC = () => {
  const [ReservedCourses, setReservedCourses] = useState([]);

  async function handleDeleteReserve(reserveId: string) {
    const data = {
      id: reserveId,
    };

    try {
      const callApi = await DeleteCourseReserve(data);
      toast({ title: ` حذف دوره ${callApi?.data?.message}` });
      if (callApi?.data?.success) {
        const filteredData = ReservedCourses.filter(
          (e) => e.reserveId !== reserveId
        );
        setReservedCourses(filteredData);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const navigate = useNavigate();

  async function ReservedCourse() {
    const callApi = await GetMyCoursesReserve();

    const fetchDetail = callApi?.data?.map(
      async (item) =>
        await GetCourseWithId(item?.courseId).then((res) => res?.data)
    );


    console.log(callApi);

    const list = await Promise.all(fetchDetail);

    console.log(list);

    setReservedCourses(list);
  }

  useEffect(() => {
    ReservedCourse();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">دوره های رزرو شده</h1>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">نام دوره</TableHead>
              <TableHead className="text-right">مدرس دوره</TableHead>
              <TableHead className="text-right">تاریخ شروع</TableHead>
              <TableHead className="text-right">قیمت (تومان)</TableHead>
              <TableHead className="text-right">وضعیت</TableHead>
              <TableHead className="text-right">عملیات</TableHead>
            </TableRow>
          </TableHeader>
           <TableBody>
            {ReservedCourses.map((course) => (
              <TableRow key={course?.courseId}>
                <TableCell>{course?.title}</TableCell>
                <TableCell>{course.teacherName}</TableCell>
                <TableCell>{makeDatePersian(course?.insertDate)}</TableCell>
                <TableCell>{course.cost}</TableCell>
                <TableCell>
                  <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                    {course?.isCourseUser == 1
                      ? "تایید شده"
                      : "در انتظار تایید"}
                  </span>
                </TableCell>
                <TableCell>
                  <button
                    className="text-gray-600 hover:text-gray-900"
                    onClick={() => navigate(`/courses/${course?.courseId}`)}
                  >
                    <Eye className="h-5 w-5 " />
                  </button>
                  <button
                    onClick={() => handleDeleteReserve(course?.reserveId)}
                  >
                    <IoTrash className="h-5 w-5 " />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody> 
        </Table>
      </div>
    </div>
  );
};

export default DashboardReserved;
