import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import CategorySection from '@/components/CategorySection';
import CourseSection from '@/components/CourseSection';
import TeacherSection from '@/components/TeacherSection';
import ServicesSection from '@/components/ServicesSection';
import BlogSection from '@/components/BlogSection';
import CtaSection from '@/components/CtaSection';

const Index = () => {
  const [fetchedData, setFetchedData] = useState<any>(null);
  const [blogData, setBlogData] = useState<any>(null);

  useEffect(() => {
    const fetchCourses = fetch("https://classapi.sepehracademy.ir/api/Home/GetCoursesTop?Count=5")
      .then(res => res.json())
      .then(data => setFetchedData(data));

    const fetchBlogs = fetch("https://classapi.sepehracademy.ir/api/News")
      .then(res => res.json())
      .then(data => {
        const fiveBlogData = data.slice(0, 5);
        setBlogData(fiveBlogData);
      });

    Promise.all([fetchCourses, fetchBlogs]);
  }, []); 

  if (!fetchedData || !blogData) {
    return <div className="text-center py-10">در حال بارگذاری...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <HeroSection 
          title="عنوان آموزشگاه"
          subtitle="بزرگترین مرکز آموزش برنامه نویسی و توسعه مهارت های دیجیتال با بیش از ۱۰۰ دوره آموزشی به روز و کاربردی"
          imageUrl="/lovable-uploads/landing.png"
        />

        <CategorySection />

        <CourseSection fetchedData={fetchedData} />

        <TeacherSection 
          name="برترین اساتید"
          title="با استادها همراه شوید"
          description="اساتید مجرب و کارآزموده در زمینه‌های مختلف برنامه‌نویسی و طراحی وب در لوکو گرد هم آمده‌اند تا تجربیات و دانش خود را با شما به اشتراک بگذارند. همه اساتید ما دارای سابقه کاری قابل توجه در صنعت و پروژه‌های واقعی هستند."
          imageUrl="/lovable-uploads/ostad.png"
        />

        <ServicesSection />

        <BlogSection blogData={blogData} />

        <CtaSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;

