
import React from 'react';
import { Link } from 'react-router-dom';
import CourseCard from './CourseCard';

// interface Course {
//   id: string;
//   title: string;
//   instructor: string;
//   rating: number;
//   students: number;
//   price: number;
//   discountPrice?: number;
//   image: string;


// }

const CourseSection: React.FC<{fetchedData:any}> = ({fetchedData})=> {

  if(fetchedData===null){
    return<div>Loading...</div>
  }

  const courses = fetchedData.map((courses:any)=>{
    return <CourseCard
      key={courses.courseId}
      id={courses.courseId}
      title={courses.classRoomName}
      instructor={courses.teacherName}
      rating={courses.rating}
      students={courses.students}
      price={courses.cost}
      discountPrice={courses.discountPrice}
      image={courses.image}


    />
  })
   

  return (
    <section className="py-16 rtl">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">دوره های آموزشی</h2>
        <div className="w-24 h-1 bg-luko-teal mx-auto mb-12"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {courses}
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
