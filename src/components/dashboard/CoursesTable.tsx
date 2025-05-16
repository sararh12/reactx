
import React, { useState,useEffect } from 'react';
import { Eye } from 'lucide-react';
import { GetAllMyCourses } from '@/services/api/course/courseService';


const CoursesTable: React.FC = () => {
  
const [MyCourses, setMyCourses] = useState([]);

async function MyCourse(){
  const callApi = await GetAllMyCourses();

  console.log(callApi?.data);

  setMyCourses(callApi?.data);
}

useEffect(() => {
  
  MyCourse()
}, []);

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-right py-4 px-6">نام دوره</th>
            <th className="text-right py-4 px-6">مدرس دوره</th>
            <th className="text-right py-4 px-6">تاریخ شروع</th>
            <th className="text-right py-4 px-6">قیمت (تومان)</th>
            {/* <th className="text-right py-4 px-6">وضعیت</th> */}
            <th className="text-right py-4 px-6"></th>
          </tr>
        </thead>
        <tbody>
          {MyCourses.map((course) => (
            <tr key={course.courseId} className="border-b hover:bg-gray-50">
              <td className="py-4 px-6">{course.title}</td>
              <td className="py-4 px-6">{course.teacherName}</td>
              <td className="py-4 px-6">{course.startTime}</td>
              <td className="py-4 px-6">{course.cost}</td>
              {/* <td className="py-4 px-6">
                <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
                  {course.status}
                </span>
              </td> */}
              <td className="py-4 px-6">
                <button className="text-gray-600 hover:text-gray-900">
                  <Eye className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoursesTable;
