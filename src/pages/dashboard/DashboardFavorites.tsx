import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Eye, Heart, HeartOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  DeleteCourseFavorite,
  GetMyFavoriteCourses,
} from "@/services/api/course/courseService";
import OnSetFormData from "@/utils/form-data";
import { title } from "process";

const DashboardFavorites: React.FC = () => {
  const { toast } = useToast();
  const [favoriteCourses, setFavoriteCourses] = useState([]);

  async function FavCourse() {
    const callApi = await GetMyFavoriteCourses();

    console.log(callApi?.data?.favoriteCourseDto);

    setFavoriteCourses(callApi?.data?.favoriteCourseDto);
  }

  async function handleDeleteFav(courseId: string) {
    const data = {
      CourseFavoriteId: courseId,
    };

    const formData = OnSetFormData(data);

    try {
      const callApi = await DeleteCourseFavorite(formData);
      toast({ title: ` حذف دوره ${callApi?.data?.message}` });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    FavCourse();
  }, []);

  const handleViewCourse = (courseId: number) => {
    // In a real application, this would navigate to the course detail page
    console.log(`Viewing course with ID: ${courseId}`);
  };

  const toggleFavorite = (courseId: number) => {
    setFavoriteCourses(
      (prevCourses) =>
        prevCourses
          .map((course) => {
            if (course.id === courseId) {
              const updatedCourse = {
                ...course,
                isFavorite: !course.isFavorite,
              };

              // Show toast notification
              if (!updatedCourse.isFavorite) {
                toast({
                  title: "حذف از علاقه‌مندی‌ها",
                  description: `${course.title} از لیست علاقه‌مندی‌های شما حذف شد.`,
                });
              } else {
                toast({
                  title: "افزودن به علاقه‌مندی‌ها",
                  description: `${course.title} به لیست علاقه‌مندی‌های شما اضافه شد.`,
                });
              }

              return updatedCourse;
            }
            return course;
          })
          .filter((course) => course.isFavorite) // Filter out unfavorited courses
    );
  };

  return (
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
                <TableRow key={course.courseId}>
                  <TableCell>{course.courseTitle}</TableCell>
                  <TableCell>{course.teacheName}</TableCell>
                  <TableCell>{course.levelName}</TableCell>
                  <TableCell>{course.cost}</TableCell>
                  <TableCell>{course.lastUpdate}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2 space-x-reverse">
                      <Link
                        to={`/courses/${course.courseId}`}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <Eye className="h-5 w-5" />
                      </Link>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteFav(course?.courseId)}
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
          <p className="mt-4 text-lg text-gray-600">
            شما هنوز دوره‌ای را به علاقه‌مندی‌ها اضافه نکرده‌اید.
          </p>
          <Link
            to="/courses"
            className="mt-6 inline-block bg-luko-teal text-white px-4 py-2 rounded-lg"
          >
            مشاهده دوره‌ها
          </Link>
        </div>
      )}
    </div>
  );
};

export default DashboardFavorites;
