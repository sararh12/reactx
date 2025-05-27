import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search } from 'lucide-react';
import axios from 'axios';

const BlogPage: React.FC =  () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`https://classapi.sepehracademy.ir/api/News`);
        console.log(response.data);
        setArticles(response.data.news);  
      
      } catch (err) {
        setError('خطا در بارگیری اخبار');
      } finally {
        setLoading(false);
      }
    };
  
    fetchArticles();
  }, []);

  
  
  
  
  const recommendedPosts = [
    {
      id: '101',
      title: 'چگونه در مصاحبه React موفق شویم؟',
      image: '/lovable-uploads/01258e8d-775b-4627-9c29-60c74aff1682.png',
      link: '/blog/101'
    },
    {
      id: '102',
      title: 'مقایسه دوره مدیر پروژه تخصصی',
      image: '/lovable-uploads/01258e8d-775b-4627-9c29-60c74aff1682.png',
      link: '/blog/102'
    },
    {
      id: '103',
      title: 'حرکت خلاقانه در Next.js',
      image: '/lovable-uploads/01258e8d-775b-4627-9c29-60c74aff1682.png',
      link: '/blog/103'
    },
  ];
  
  const tags = [
    { id: '1', name: 'شبکه معنایی وب', count: 24, icon: '/lovable-uploads/6bf14711-f68d-471e-836c-44429cf7e00f.png' },
    { id: '2', name: 'جاوااسکریپت', count: 18, icon: '/lovable-uploads/6bf14711-f68d-471e-836c-44429cf7e00f.png' },
    { id: '3', name: 'ری اکت', count: 32, icon: '/lovable-uploads/6bf14711-f68d-471e-836c-44429cf7e00f.png' }
  ];
  
  const popularCourses = [
    { id: '1', title: 'دوره جامع Angular', link: '/courses/1', image: '/lovable-uploads/04f05962-568c-44ad-a091-a60a681fa24c.png' },
    { id: '2', title: 'دوره جامع React', link: '/courses/2', image: '/lovable-uploads/04f05962-568c-44ad-a091-a60a681fa24c.png' },
    { id: '3', title: 'دوره جامع Next.js', link: '/courses/3', image: '/lovable-uploads/04f05962-568c-44ad-a091-a60a681fa24c.png' }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <section className="bg-gradient-mint py-12 rtl">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h1 className="text-3xl font-bold">اخبار و مقالات</h1>
                <p className="text-gray-700 mt-2">با ما به روز بمانید</p>
              </div>

              <div className="w-full md:w-auto">
                <div className="relative">
                  <Search className="absolute top-3 right-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="جستجو در مقالات..."
                    className="w-full md:w-80 pr-10 py-2 border border-gray-300 rounded-md"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 rtl">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-3/4 lg:ml-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold">جدیدترین اخبار و مقالات</h2>
                  <div className="flex items-center">
                    <span className="ml-2 text-gray-600">مرتب‌سازی:</span>
                    <select className="border border-gray-300 rounded-md p-1 text-sm">
                      <option>جدیدترین</option>
                      <option>پربازدیدترین</option>
                      <option>محبوب‌ترین</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.map((article) => (
                    <div
                      key={article.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                      <Link to={`/blog/${article.id}`}>
                        <img
                          src={
                            article?.pictureAddress ||
                            "./lovable-uploads/news.png"
                          }
                          alt={article.title}
                          className="w-full h-48 object-cover"
                        />
                      </Link>
                      <div className="p-4">
                        <Link to={`/blog/${article.id}`}>
                          <h3 className="font-bold text-lg mb-2 hover:text-luko-teal transition-colors">
                            {article.title}
                          </h3>
                        </Link>
                        <p className="text-gray-600 text-sm mb-4">
                          {article.excerpt}
                        </p>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <div className="flex items-center">
                            <span>{article.inserDate}</span>
                          </div>
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 ml-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                            <span>{article.views}</span>
                          </div>
                        </div>
                        <Link
                          to={`/blog/${article.id}`}
                          className="block text-luko-teal text-sm mt-4 hover:underline"
                        >
                          مطالعه بیشتر
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-center">
                  <div className="flex space-x-1 space-x-reverse">
                    <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-md bg-luko-teal text-white">
                      1
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300">
                      2
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300">
                      3
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300">
                      ...
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300">
                      7
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/4 mt-8 lg:mt-0">
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                  <h3 className="font-bold mb-4">مطالب پیشنهادی</h3>
                  <div className="space-y-4">
                    {recommendedPosts.map((post) => (
                      <div key={post.id} className="flex border-b pb-4">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="mr-3">
                          <Link
                            to={post.link}
                            className="font-bold text-sm hover:text-luko-teal"
                          >
                            {post.title}
                          </Link>
                          <Link
                            to={post.link}
                            className="block text-xs text-luko-teal mt-2"
                          >
                            مطالعه مقاله
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                  <h3 className="font-bold mb-4">برچسب ها</h3>
                  <div className="space-y-3">
                    {tags.map((tag) => (
                      <Link
                        key={tag.id}
                        to={`/tag/${tag.id}`}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100"
                      >
                        <div className="flex items-center">
                          <img
                            src={tag.icon}
                            alt={tag.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span className="text-sm mr-2">{tag.name}</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {tag.count}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="font-bold mb-4">محبوب ترین دوره ها</h3>
                  <div className="space-y-4">
                    {popularCourses.map((course) => (
                      <Link
                        key={course.id}
                        to={course.link}
                        className="flex items-center border-b pb-4"
                      >
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md flex items-center justify-center">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-8 h-8 rounded-full bg-black p-1"
                          />
                        </div>
                        <span className="mr-3 text-sm font-medium">
                          {course.title}
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-luko-teal mr-auto"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    ))}
                    <Link
                      to="/courses"
                      className="block text-center text-sm text-luko-teal hover:underline"
                    >
                      مشاهده همه دوره ها
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
