
import React from 'react';
import FeatureCard from './FeatureCard';

const CategorySection: React.FC = () => {
  const categories = [
    {
      icon: (
        <div className="bg-blue-100 p-3 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      ),
      title: "طراحی وب",
      description: "آموزش های طراحی وب‌سایت و رابط کاربری",
      bgColor: "bg-white"
    },
    {
      icon: (
        <div className="bg-green-100 p-3 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </div>
      ),
      title: "برنامه نویسی",
      description: "آموزش زبان‌های برنامه‌نویسی و فریمورک‌ها",
      bgColor: "bg-white"
    },
    {
      icon: (
        <div className="bg-purple-100 p-3 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      ),
      title: "مهارت های دیداری",
      description: "آموزش‌های گرافیک، انیمیشن و ویدیو",
      bgColor: "bg-white"
    },
    {
      icon: (
        <div className="bg-yellow-100 p-3 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
      ),
      title: "امنیت سایبری",
      description: "دوره‌های تخصصی امنیت شبکه و وب",
      bgColor: "bg-white"
    }
  ];

  return (
    <section className="py-16 bg-gradient-mint rtl">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 relative inline-block">
          <span className="relative z-10">محبوب ترین دسته بندی ها</span>
          <div className="absolute bottom-0 left-0 w-full h-3 bg-luko-mint opacity-50 -z-10"></div>
        </h2>
        
        <div className="flex flex-wrap justify-center gap-8">
          {categories.map((category, index) => (
            <div key={index} className="transform hover:-translate-y-2 transition-transform duration-300">
              <FeatureCard
                icon={category.icon}
                title={category.title}
                description={category.description}
                bgColor={category.bgColor}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
