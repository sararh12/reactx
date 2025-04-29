
import React from 'react';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
}

const BlogSection: React.FC = () => {
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'چگونه در کمتر از ۶ ماه برنامه نویس وب شویم',
      excerpt: 'در این مقاله به روش‌های یادگیری سریع و اصولی برنامه‌نویسی وب می‌پردازیم...',
      image: '/lovable-uploads/82dd1df8-b7a7-496e-9840-a14f27e64ff2.png',
      date: '۱۴۰۲/۰۱/۱۲'
    },
    {
      id: '2',
      title: 'بهترین زبان‌های برنامه‌نویسی برای شروع',
      excerpt: 'مقایسه زبان‌های برنامه‌نویسی مختلف برای افراد مبتدی و توصیه‌های کاربردی...',
      image: '/lovable-uploads/377853b9-dd72-4149-81cf-c45224f7c8aa.png',
      date: '۱۴۰۲/۰۱/۰۸'
    },
    {
      id: '3',
      title: 'آینده هوش مصنوعی در دنیای برنامه‌نویسی',
      excerpt: 'بررسی تاثیر هوش مصنوعی بر حرفه برنامه‌نویسی و مهارت‌های مورد نیاز آینده...',
      image: '/lovable-uploads/ea12bd82-7267-4a00-879f-d94b901d6405.png', 
      date: '۱۴۰۲/۰۱/۰۵'
    }
  ];

  return (
    <section className="py-16 rtl">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">اخبار و مقالات</h2>
        <div className="w-24 h-1 bg-luko-teal mx-auto mb-12"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <Link to={`/blog/${post.id}`}>
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-48 object-cover"
                />
              </Link>
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">{post.date}</div>
                <Link to={`/blog/${post.id}`}>
                  <h3 className="text-xl font-bold mb-3 hover:text-luko-teal transition-colors duration-300">{post.title}</h3>
                </Link>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link to={`/blog/${post.id}`} className="text-luko-teal hover:underline font-medium inline-flex items-center">
                  مطالعه بیشتر
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/blog" className="bg-white border-2 border-luko-teal text-luko-teal hover:bg-luko-teal hover:text-white transition-colors duration-300 font-medium rounded-lg px-8 py-3">
            مشاهده تمام مقالات
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
