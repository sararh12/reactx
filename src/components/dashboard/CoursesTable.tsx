
import React from 'react';
import { Eye } from 'lucide-react';

const CoursesTable: React.FC = () => {
  const courses = [
    {
      id: 1,
      name: 'دوره آموزش جامع ول',
      instructor: 'دکتر محمدحسین بحرالعلومی',
      startDate: '1403/03/18',
      price: '2,500,000',
      status: 'در انتظار تایید'
    },
    // Add more courses as needed
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-right py-4 px-6">نام دوره</th>
            <th className="text-right py-4 px-6">مدرس دوره</th>
            <th className="text-right py-4 px-6">تاریخ شروع</th>
            <th className="text-right py-4 px-6">قیمت (تومان)</th>
            <th className="text-right py-4 px-6">وضعیت</th>
            <th className="text-right py-4 px-6">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id} className="border-b hover:bg-gray-50">
              <td className="py-4 px-6">{course.name}</td>
              <td className="py-4 px-6">{course.instructor}</td>
              <td className="py-4 px-6">{course.startDate}</td>
              <td className="py-4 px-6">{course.price}</td>
              <td className="py-4 px-6">
                <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
                  {course.status}
                </span>
              </td>
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
