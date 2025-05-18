import React, { useState, useEffect } from "react";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Eye } from "lucide-react";
import { GetMyCoursesReserve } from "@/services/api/course/courseService";
import { useNavigate } from "react-router-dom";

const DashboardReserved: React.FC = () => {
  const navigate = useNavigate();
  const [ReservedCourses, setReservedCourses] = useState([]);

  async function ReservedCourse() {
    const callApi = await GetMyCoursesReserve();

    console.log(callApi?.data);

    setReservedCourses(callApi?.data);
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
                <TableCell>{course?.courseName}</TableCell>
                <TableCell>{course.teacherName}</TableCell>
                <TableCell>{course?.reserverDate}</TableCell>
                <TableCell>{course.cost}</TableCell>
                <TableCell>
                  <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                    {course?.accept ? "تایید شده" : "در انتظار تایید"}
                  </span>
                </TableCell>
                <TableCell>
                  <button
                    className="text-gray-600 hover:text-gray-900"
                    onClick={() => navigate(`/courses/${course?.courseId}`)}
                  >
                    <Eye className="h-5 w-5" />
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
