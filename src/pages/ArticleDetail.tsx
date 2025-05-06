
import React, { useState,useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import axios from "axios";

interface NewsDetailData{
  newsId:string;
  inserDate:number;
  title:string;
  describe:string;
  autor:string;
  pictureAddress: string | null;
  tags: ['ری اکت', 'جاوااسکریپت', 'فرانت اند'];
  comments: [
    { id: '1', author: 'محمد حسینی', date: '۱۴۰۲/۰۲/۱۶', content: 'مقاله بسیار مفیدی بود. ممنون از اشتراک گذاری این اطلاعات ارزشمند.', avatar: '/lovable-uploads/dab28740-378c-4bde-a459-8122ce2f6957.png', likes: 12 },
    { id: '2', author: 'سارا کریمی', date: '۱۴۰۲/۰۲/۱۵', content: 'من تازه می‌خوام یادگیری ری‌اکت رو شروع کنم و این مقاله خیلی کمکم کرد. ممنون.', avatar: '/lovable-uploads/dab28740-378c-4bde-a459-8122ce2f6957.png', likes: 8 },
  ],
  relatedCourses: [
    { id: '1', title: 'دوره جامع React.js', image: '/lovable-uploads/news.png' },
    { id: '2', title: 'آموزش پیشرفته React.js', image: '/lovable-uploads/news.png' },
    { id: '3', title: 'React Native برای همه', image: '/lovable-uploads/news.png' },
    { id: '4', title: 'جاوااسکریپت پیشرفته', image: '/lovable-uploads/news.png' },
  ],
  relatedArticles: [
    { id: '101', title: 'آموزش کامل و جامع Redux', date: '۱۴۰۲/۰۲/۱۰', image: '/lovable-uploads/pic.png' },
    { id: '102', title: 'معرفی هوک‌های جدید React', date: '۱۴۰۲/۰۲/۰۵', image: '/lovable-uploads/pic.png' },
    { id: '103', title: 'مقایسه React و Vue', date: '۱۴۰۲/۰۲/۰۱', image: '/lovable-uploads/pic.png' },
  ],
  sections: [
    {
      id: 'section1',
      title: 'معرفی React.js',
      lessons: 5,
      duration: '45 دقیقه',
      content: [
        'تاریخچه React.js',
        'مفاهیم اصلی React',
        'مقایسه با دیگر فریمورک‌ها',
        'نصب و راه‌اندازی React',
        'اولین کامپوننت React'
      ]
    },
    {
      id: 'section2',
      title: 'کامپوننت‌ها و Props',
      lessons: 4,
      duration: '35 دقیقه',
      content: [
        'ساختار کامپوننت‌ها',
        'Props و انتقال داده',
        'کامپوننت‌های کلاس و فانکشنال',
        'Conditional Rendering'
      ]
    },
    {
      id: 'section3',
      title: 'State و Lifecycle',
      lessons: 6,
      duration: '55 دقیقه',
      content: [
        'مدیریت State',
        'چرخه حیات کامپوننت',
        'Hook های اصلی',
        'useState و useEffect',
        'useContext و useReducer',
        'Custom Hooks'
      ]
    }
  ]
}

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{id: string}>();
  const { toast } = useToast();
  const [showAllContent, setShowAllContent] = useState(false);
  const [activeTab, setActiveTab] = useState('content');
  const [articleLiked, setArticleLiked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = React.useState(true);
  const [articleData, setArticleData] = React.useState<NewsDetailData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get<NewsDetailData>(`https://classapi.sepehracademy.ir/api/News/${id}`);
        setArticleData(response.data);
      } catch (err) {
        setError("خطا در دریافت اطلاعات مقاله.");
        console.error(err);
      }
    };

    fetchArticle();
  }, [id]);

  if (error) {
    return <div className="text-red-500 text-center py-10">{error}</div>;
  }

  if (!articleData) {
    return <div className="text-center py-10 text-gray-500">در حال بارگذاری مقاله...</div>;
  }

  

  
  const handleArticleLike = () => {
    setArticleLiked(!articleLiked);
    toast({
      title: articleLiked ? "از لیست علاقه‌مندی‌ها حذف شد" : "به لیست علاقه‌مندی‌ها اضافه شد",
      description: articleLiked ? "این مقاله از لیست علاقه‌مندی‌های شما حذف شد" : "این مقاله به لیست علاقه‌مندی‌های شما اضافه شد",
    });
  };

  const handleCommentLike = (commentId: string) => {
    setLikedComments(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
    toast({
      title: likedComments[commentId] ? "پسندیدن لغو شد" : "نظر پسندیده شد",
      description: likedComments[commentId] ? "پسندیدن این نظر لغو شد" : "این نظر به لیست پسندیده‌های شما اضافه شد",
    });
  };

  const handleSaveArticle = () => {
    toast({
      title: "مقاله ذخیره شد",
      description: "این مقاله در لیست ذخیره‌های شما قرار گرفت",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "لینک کپی شد",
      description: "لینک مقاله در کلیپ‌بورد ذخیره شد",
    });
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      toast({
        title: "نظر شما ثبت شد",
        description: "نظر شما پس از تایید نمایش داده خواهد شد",
      });
      setCommentText('');
    } else {
      toast({
        title: "خطا",
        description: "لطفا نظر خود را وارد کنید",
        variant: "destructive",
      });
    }
  };

  const handleReply = (commentId: string) => {
    toast({
      title: "پاسخ به نظر",
      description: "در حال حاضر امکان پاسخ به نظرات فعال نیست",
    });
  };

  const handleViewProfile = () => {
    toast({
      title: "پروفایل مدرس",
      description: "در حال انتقال به صفحه پروفایل مدرس",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow rtl">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <img 
                  src={articleData.pictureAddress} 
                  alt={articleData.title}
                  className="w-full h-64 object-cover"
                />
                
                <div className="p-6">
                  <div className="flex flex-wrap items-center text-sm text-gray-600 mb-4">
                    <div className="ml-4 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{articleData.inserDate}</span>
                    </div>
                    <div className="ml-4 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>{articleData.autor}</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>20</span>
                    </div>
                  </div>
                  
                  <h1 className="text-2xl md:text-3xl font-bold mb-6">{articleData.title}</h1>
                  
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="w-full bg-gray-100 p-0 h-12">
                      <TabsTrigger value="content" className="flex-1 h-full">محتوا</TabsTrigger>
                      <TabsTrigger value="sections" className="flex-1 h-full">سرفصل‌ها</TabsTrigger>
                      <TabsTrigger value="comments" className="flex-1 h-full">نظرات</TabsTrigger>
                    </TabsList>
                    <TabsContent value="content">
                      <div className="prose max-w-none mt-4" dangerouslySetInnerHTML={{ __html: articleData.describe }} />
                      
                      <div className="flex flex-wrap gap-2 mt-6">
                        {articleData.tags.map((tag, index) => (
                          <Link 
                            key={index} 
                            to={`/tag/${tag}`} 
                            className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-sm hover:bg-luko-teal hover:text-white transition-colors"
                          >
                            #{tag}
                          </Link>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="sections">
                      <div className="mt-4">
                        {articleData.sections.map((section) => (
                          <div key={section.id} className="border-b py-4">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-bold text-lg">{section.title}</h3>
                              <div className="text-sm text-gray-500">{section.lessons} جلسه - {section.duration}</div>
                            </div>
                            <ul className="space-y-2 text-gray-700">
                              {section.content?.map((item, index) => (
                                <li key={index} className="flex items-center">
                                  <span className="ml-2 text-luko-teal">•</span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        <div className="mt-4 text-center">
                          <Button 
                            onClick={() => setShowAllContent(!showAllContent)}
                            className="bg-luko-teal hover:bg-luko-teal/90"
                          >
                            {showAllContent ? "بستن سرفصل‌ها" : "نمایش تمام سرفصل‌ها"}
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="comments">
                      <div className="mt-4">
                        <h2 className="text-xl font-bold mb-4">نظرات ({articleData.comments.length})</h2>
                        
                        {articleData.comments.map((comment) => (
                          <div key={comment.id} className="border-b pb-6 mb-6">
                            <div className="flex items-start">
                              <img 
                                src={comment.avatar} 
                                alt={comment.author} 
                                className="w-12 h-12 rounded-full object-cover"
                              />
                              <div className="mr-4 flex-1">
                                <div className="flex justify-between items-center mb-2">
                                  <h4 className="font-bold">{comment.author}</h4>
                                  <div className="text-xs text-gray-500">{comment.date}</div>
                                </div>
                                <p className="text-gray-700">
                                  {comment.content}
                                </p>
                                <div className="flex mt-3 text-gray-400 text-sm">
                                  <button 
                                    className="flex items-center ml-4"
                                    onClick={() => handleCommentLike(comment.id)}
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                         className={`h-4 w-4 ml-1 ${likedComments[comment.id] ? 'text-luko-teal' : ''}`} 
                                         fill={likedComments[comment.id] ? "currentColor" : "none"} 
                                         viewBox="0 0 24 24" 
                                         stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                    </svg>
                                    {comment.likes}
                                  </button>
                                  <button 
                                    className="flex items-center"
                                    onClick={() => handleReply(comment.id)}
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                    </svg>
                                    پاسخ
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        <div>
                          <h3 className="font-bold mb-4">ارسال نظر</h3>
                          <form onSubmit={handleSubmitComment}>
                            <textarea 
                              placeholder="نظر خود را بنویسید..." 
                              className="w-full border border-gray-300 rounded-md p-3 mb-4"
                              rows={4}
                              value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                            ></textarea>
                            <Button 
                              type="submit"
                              className="bg-luko-teal hover:bg-luko-teal/90"
                            >
                              ارسال نظر
                            </Button>
                          </form>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="border-t mt-8 pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-4 space-x-reverse">
                        <Button 
                          variant="ghost" 
                          className={`text-gray-500 hover:text-luko-teal ${articleLiked ? 'text-luko-teal' : ''}`}
                          onClick={handleArticleLike}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill={articleLiked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                          </svg>
                          پسندیدم
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="text-gray-500 hover:text-luko-teal"
                          onClick={handleShare}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                          </svg>
                          اشتراک گذاری
                        </Button>
                      </div>
                      <Button 
                        variant="ghost" 
                        className="text-gray-500 hover:text-luko-teal"
                        onClick={handleSaveArticle}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        ذخیره
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-6">مقالات مرتبط</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {articleData.relatedArticles.map((relatedArticle) => (
                    <Link 
                      key={relatedArticle.id}
                      to={`/blog/${relatedArticle.id}`} 
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <img 
                        src={relatedArticle.image} 
                        alt={relatedArticle.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <div className="text-xs text-gray-500 mb-2">{relatedArticle.date}</div>
                        <h3 className="font-bold hover:text-luko-teal transition-colors">
                          {relatedArticle.title}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="md:w-1/3">
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <div className="flex items-center mb-4">
                  <img 
                    src="/lovable-uploads/36442ea6-4bc0-445a-9514-5882fa052e96.png" 
                    alt={articleData.autor}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="mr-4">
                    <h3 className="font-bold">{articleData.autor}</h3>
                    <p className="text-sm text-gray-600">مدرس و برنامه‌نویس ارشد</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  مهدی محمدی با بیش از 10 سال تجربه در زمینه توسعه وب و برنامه‌نویسی، مدرس دوره‌های متعدد در زمینه ری‌اکت، جاوااسکریپت و توسعه فرانت‌اند است.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full text-luko-teal border-luko-teal hover:bg-luko-teal/10"
                  onClick={handleViewProfile}
                >
                  مشاهده پروفایل مدرس
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="font-bold mb-4">دوره‌های مرتبط</h3>
                <div className="space-y-4">
                  {articleData.relatedCourses.map((course) => (
                    <Link 
                      key={course.id}
                      to={`/courses/${course.id}`} 
                      className="flex items-center pb-3 border-b last:border-0 hover:bg-gray-50 p-2 rounded-md transition-colors"
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md flex items-center justify-center">
                        <img 
                          src={course.image}
                          alt={course.title}
                          className="w-6 h-6 rounded-full bg-black p-0.5"
                        />
                      </div>
                      <span className="mr-3 text-sm">{course.title}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-luko-teal mr-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>
                <div className="mt-4">
                  <Link to="/courses">
                    <Button className="w-full bg-luko-teal hover:bg-luko-teal/90">
                      مشاهده همه دوره ها
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-bold mb-4">برچسب ها</h3>
                <div className="flex flex-wrap gap-2">
                  {articleData.tags.map((tag, index) => (
                    <Link 
                      key={index} 
                      to={`/tag/${tag}`} 
                      className="bg-gray-100 text-gray-800 px-3 py-2 rounded-md text-sm hover:bg-luko-teal hover:text-white transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                  <Link 
                    to="/tags" 
                    className="bg-gray-100 text-gray-800 px-3 py-2 rounded-md text-sm hover:bg-luko-teal hover:text-white transition-colors"
                  >
                    #فرانت‌اند
                  </Link>
                  <Link 
                    to="/tags" 
                    className="bg-gray-100 text-gray-800 px-3 py-2 rounded-md text-sm hover:bg-luko-teal hover:text-white transition-colors"
                  >
                    #وب
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ArticleDetail;
