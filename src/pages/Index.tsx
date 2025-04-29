
import React from 'react';
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
        
        <CourseSection />
        
        <TeacherSection 
          name="برترین اساتید"
          title="با استادها همراه شوید"
          description="اساتید مجرب و کارآزموده در زمینه‌های مختلف برنامه‌نویسی و طراحی وب در لوکو گرد هم آمده‌اند تا تجربیات و دانش خود را با شما به اشتراک بگذارند. همه اساتید ما دارای سابقه کاری قابل توجه در صنعت و پروژه‌های واقعی هستند."
          imageUrl="/lovable-uploads/ostad.png"
        />
        
        <ServicesSection />
        
        <BlogSection />
        
        <CtaSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
