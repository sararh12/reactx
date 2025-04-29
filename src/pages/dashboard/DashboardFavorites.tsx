
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Eye, Heart, HeartOff } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const DashboardFavorites: React.FC = () => {
  const { toast } = useToast();
  const [favoriteCourses, setFavoriteCourses] = useState([
    {
      id: 1,
      name: 'دوره جامع React.js',
      instructor: 'دکتر مهدی احمدی',
      category: 'برنامه نویسی وب',
      price: '1,950,000',
      date: '1402/11/15',
      isFavorite: true
    },
    {
      id: 2,
      name: 'آموزش پیشرفته AI و یادگیری ماشین',
      instructor: 'مهندس سارا محمدی',
      category: 'هوش مصنوعی',
      price: '2,300,000',
      date: '1402/12/05',
      isFavorite: true
    }
  ]);

  const handleViewCourse = (courseId: number) => {
    // In a real application, this would navigate to the course detail page
    console.log(`Viewing course with ID: ${courseId}`);
  };

  const toggleFavorite = (courseId: number) => {
    setFavoriteCourses(prevCourses => 
      prevCourses.map(course => {
        if (course.id === courseId) {
          const updatedCourse = { ...course, isFavorite: !course.isFavorite };
          
          // Show toast notification
          if (!updatedCourse.isFavorite) {
            toast({
              title: "حذف از علاقه‌مندی‌ها",
              description: `${course.name} از لیست علاقه‌مندی‌های شما حذف شد.`,
            });
          } else {
            toast({
              title: "افزودن به علاقه‌مندی‌ها",
              description: `${course.name} به لیست علاقه‌مندی‌های شما اضافه شد.`,
            });
          }
          
          return updatedCourse;
        }
        return course;
      }).filter(course => course.isFavorite) // Filter out unfavorited courses
    );
  };

  return (
    <DashboardLayout activeTab="favorites">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">دوره های مورد علاقه</h1>
        {favoriteCourses.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">نام دوره</TableHead>
                  <TableHead className="text-right">مدرس دوره</TableHead>
                  <TableHead className="text-right">دسته بندی</TableHead>
                  <TableHead className="text-right">قیمت (تومان)</TableHead>
                  <TableHead className="text-right">تاریخ افزودن</TableHead>
                  <TableHead className="text-right">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {favoriteCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>{course.name}</TableCell>
                    <TableCell>{course.instructor}</TableCell>
                    <TableCell>{course.category}</TableCell>
                    <TableCell>{course.price}</TableCell>
                    <TableCell>{course.date}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2 space-x-reverse">
                        <Link to={`/courses/${course.id}`} className="text-gray-600 hover:text-gray-900">
                          <Eye className="h-5 w-5" />
                        </Link>
                        <button 
                          className="text-red-500 hover:text-red-700"
                          onClick={() => toggleFavorite(course.id)}
                        >
                          {course.isFavorite ? (
                            <Heart className="h-5 w-5 fill-current" />
                          ) : (
                            <HeartOff className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-10">
            <Heart className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-4 text-lg text-gray-600">شما هنوز دوره‌ای را به علاقه‌مندی‌ها اضافه نکرده‌اید.</p>
            <Link to="/courses" className="mt-6 inline-block bg-luko-teal text-white px-4 py-2 rounded-lg">
              مشاهده دوره‌ها
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardFavorites;
