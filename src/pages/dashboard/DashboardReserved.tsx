
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Eye } from 'lucide-react';

const DashboardReserved: React.FC = () => {
  const reservedCourses = [
    {
      id: 1,
      name: 'دوره آموزش جامع وب',
      instructor: 'دکتر محمدحسین بحرالعلومی',
      startDate: '1403/04/15',
      price: '2,200,000',
      status: 'رزرو شده'
    },
    {
      id: 2,
      name: 'دوره پایتون پیشرفته',
      instructor: 'مهندس رضا محمدی',
      startDate: '1403/05/01',
      price: '1,800,000',
      status: 'رزرو شده'
    }
  ];

  return (
    <DashboardLayout activeTab="reserved">
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
              {reservedCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>{course.name}</TableCell>
                  <TableCell>{course.instructor}</TableCell>
                  <TableCell>{course.startDate}</TableCell>
                  <TableCell>{course.price}</TableCell>
                  <TableCell>
                    <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                      {course.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <button className="text-gray-600 hover:text-gray-900">
                      <Eye className="h-5 w-5" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardReserved;
