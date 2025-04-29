
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
          imageUrl="/lovable-uploads/94d03240-2595-43b8-ae00-bc8e40a45284.png"
        />
        
        <CategorySection />
        
        <CourseSection />
        
        <TeacherSection 
          name="برترین اساتید"
          title="با استادها همراه شوید"
          description="اساتید مجرب و کارآزموده در زمینه‌های مختلف برنامه‌نویسی و طراحی وب در لوکو گرد هم آمده‌اند تا تجربیات و دانش خود را با شما به اشتراک بگذارند. همه اساتید ما دارای سابقه کاری قابل توجه در صنعت و پروژه‌های واقعی هستند."
          imageUrl="/lovable-uploads/b503d1c1-fa1f-4719-b95f-c5c53352a55d.png"
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
