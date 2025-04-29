
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

const DashboardComments: React.FC = () => {
  const comments = [
    {
      id: 1,
      courseName: 'دوره آموزش جامع وب',
      comment: 'این دوره بسیار کاربردی و مفید بود. ممنون از استاد عزیز برای ارائه مطالب کاربردی.',
      date: '1403/02/15',
      status: 'تایید شده'
    },
    {
      id: 2,
      courseName: 'دوره پایتون پیشرفته',
      comment: 'مطالب دوره بروز و کاربردی هستند. پیشنهاد می‌کنم بخش مربوط به فریمورک جنگو بیشتر توضیح داده شود.',
      date: '1403/03/05',
      status: 'در انتظار تایید'
    }
  ];

  return (
    <DashboardLayout activeTab="comments">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">دیدگاه های من</h1>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">نام دوره</TableHead>
                <TableHead className="text-right">دیدگاه</TableHead>
                <TableHead className="text-right">تاریخ ثبت</TableHead>
                <TableHead className="text-right">وضعیت</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comments.map((comment) => (
                <TableRow key={comment.id}>
                  <TableCell>{comment.courseName}</TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate">{comment.comment}</div>
                  </TableCell>
                  <TableCell>{comment.date}</TableCell>
                  <TableCell>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      comment.status === 'تایید شده' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {comment.status}
                    </span>
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

export default DashboardComments;
