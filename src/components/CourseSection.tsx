
import React from 'react';
import { Link } from 'react-router-dom';
import CourseCard from './CourseCard';

interface Course {
  id: string;
  title: string;
  instructor: string;
  rating: number;
  students: number;
  price: number;
  discountPrice?: number;
  image: string;
}

const CourseSection: React.FC = () => {
  const courses: Course[] = [
    {
      id: '1',
      title: 'دوره پیشرفته جاوااسکریپت',
      instructor: 'علی محمدی',
      rating: 4.8,
      students: 1250,
      price: 1950000,
      discountPrice: 1450000,
      image: '/course1.jpg'
    },
    {
      id: '2',
      title: 'دوره پیشرفته پایتون',
      instructor: 'محمد حسینی',
      rating: 4.7,
      students: 980,
      price: 1850000,
      discountPrice: 1450000,
      image: '/course2.jpg'
    },
    {
      id: '3',
      title: 'دوره پیشرفته ریکت',
      instructor: 'سارا کریمی',
      rating: 4.9,
      students: 1540,
      price: 2100000,
      discountPrice: 1650000,
      image: '/course3.jpg'
    },
    {
      id: '4',
      title: 'دوره پیشرفته فلاتر',
      instructor: 'امیر رضایی',
      rating: 4.6,
      students: 870,
      price: 1950000,
      discountPrice: 1450000,
      image: '/course4.jpg'
    }
  ];

  return (
    <section className="py-16 rtl">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">دوره های آموزشی</h2>
        <div className="w-24 h-1 bg-luko-teal mx-auto mb-12"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              instructor={course.instructor}
              rating={course.rating}
              students={course.students}
              price={course.price}
              discountPrice={course.discountPrice}
              image={course.image}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/courses" className="bg-luko-teal hover:bg-luko-teal/90 text-white font-medium rounded-lg px-8 py-3 transition-colors duration-300">
            مشاهده تمام دوره ها
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CourseSection;
