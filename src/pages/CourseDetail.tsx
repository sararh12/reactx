import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import CourseAccordion from '@/components/CourseAccordion';

interface Teacher {
  imageUrl?: string; 
  teacherName: string;
  title?: string;
  bio?: string;
}

interface CourseDetailData {
  courseId: string; 
  title: string;
  subTitle?: string; 
  description: string;
  teacherName: string; 
  cost: number;
  capacity:number; 
  imageAddress: string | null;
  sections: {
    id: string; 
    title: string;
    lessons: number; 
    duration: string;
  }[];
  
  courseRate?: number;
  currentRegistrants?: number;
}

const CourseDetail: React.FC = () => {
  const { id } = useParams<{id: string}>();
  const [courseData, setCourseData] = React.useState<CourseDetailData | null>(null);
const [loading, setLoading] = React.useState(true);
  
React.useEffect(() => {
  const fetchCourse = async () => {
    try {
      const response = await fetch(`https://classapi.sepehracademy.ir/api/Home/GetCourseDetails?CourseId=${id}`);
      if (!response.ok) {

        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      setCourseData(data as CourseDetailData);
    } catch (error) {
      console.error("Error fetching course details:", error);
      setCourseData(null);
    } finally {
      setLoading(false);
    }
  };

  if (id) {
    fetchCourse();
  } else {
    console.error("Course ID is missing");
    setLoading(false);
    setCourseData(null);
  }
}, [id]);


if (loading) return <div className="text-center py-10">در حال بارگذاری...</div>;
if (!courseData) return <div className="text-center py-10">اطلاعات دوره یافت نشد.</div>;

const teacher = courseData.teacherName;
 
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow rtl">
        <div className="container mx-auto px-4 py-8">
          {/* Course Header */}
          <div className="bg-black rounded-lg overflow-hidden mb-8">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-8">
                <h1 className="text-3xl font-bold text-white mb-2"> {courseData.title} </h1>
                <div className="text-white text-lg mb-6"> {courseData.subTitle}  </div>
                <p className="text-gray-300 mb-4">
                {courseData.description}
                </p>

                
                {courseData.teacherName && (
                  <div className="flex items-center text-white mb-6">
                    <img
                      src={courseData.imageAddress}
                      alt={courseData.teacherName || "مدرس"}
                      className="w-12 h-12 rounded-full object-cover border-2 border-luko-teal"
                    />
                    <div className="mr-3">
                      <div className="font-bold">{courseData.teacherName}</div>
                      <div className="text-sm text-gray-300">{courseData.title}</div>
                    </div>
                  </div>
                )}
                
                <div className="bg-gradient-to-r from-luko-teal to-blue-500 p-6 rounded-lg">
                  <div className="text-white text-2xl font-bold mb-2">{courseData.cost} تومان </div>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-lg h-12">
                    شرکت در دوره
                  </Button>
                </div>
              </div>
              
              <div className="md:w-1/2 bg-gradient-to-r from-blue-900 to-black p-8 flex items-center justify-center">
                <img 
                  src={courseData.imageAddress} 
                  alt={courseData.title} 
                  className="max-w-full h-auto"
                />
              </div>
            </div>
          </div>
          
          {/* Course Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-amber-500 text-2xl font-bold">{courseData.courseRate}</div>
                  <div className="text-sm text-gray-500">امتیاز دوره</div>
                </div>
                <div className="text-amber-500">
                  ★★★★★
                </div>
              </div>
              <div className="mt-4 h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-luko-teal rounded-full w-4/5"></div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                از مجموع ۲۵۰ رای
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex flex-col">
                <div className="text-luko-teal text-2xl font-bold">{courseData.currentRegistrants}</div>
                <div className="text-sm text-gray-500">تعداد دانشجویان</div>
                <div className="flex items-center mt-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                    <div className="w-8 h-8 rounded-full bg-gray-400"></div>
                    <div className="w-8 h-8 rounded-full bg-gray-500"></div>
                  </div>
                  <div className="mr-4 text-xs text-gray-500">و {courseData.capacity} نفر دیگر</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-bold">دسترسی مادام‌العمر</div>
                  <div className="text-sm text-gray-500">بروزرسانی رایگان</div>
                </div>
                <div className="text-xl text-luko-teal">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Course Tabs */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="flex border-b">
              <div className="px-6 py-4 border-b-2 border-luko-teal font-bold text-luko-teal">توضیحات</div>
              <div className="px-6 py-4 text-gray-500">سرفصل‌ها</div>
              <div className="px-6 py-4 text-gray-500">نظرات</div>
            </div>
            
            <div className="p-6">
              <div className="text-gray-700 leading-relaxed">
                <p className="mb-4">
                  فریم‌ورک ReactJS یکی از بهترین فریمورک‌های جاوااسکریپت برای توسعه رابط کاربری وب است. این فریمورک که توسط فیسبوک توسعه یافته است، به شما اجازه می‌دهد تا رابط‌های کاربری پیچیده را به صورت کامپوننت‌های قابل استفاده مجدد بسازید.
                </p>

                <p className="mb-4">
                  در این دوره، شما از صفر تا صد ReactJS را یاد خواهید گرفت. ما با مفاهیم پایه مانند کامپوننت‌ها، props و state شروع می‌کنیم و سپس به موضوعات پیشرفته‌تر مانند هوک‌ها، کانتکست و ردوکس می‌پردازیم.
                </p>

                <p className="mb-4">
                  این دوره شامل بیش از ۹۹ ساعت آموزش تصویری با کیفیت عالی است که توسط مدرس با تجربه تدریس شده است.
                </p>
                
                <div className="mt-6">
                  <Button variant="outline" className="text-luko-teal border-luko-teal hover:bg-luko-teal/10">
                    مطالعه بیشتر
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Course Syllabus */}
          <div className="bg-white rounded-lg shadow-md mb-8">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">سرفصل‌ها</h2>
            </div>
            
            <CourseAccordion sections={courseData.sections || []} />
            
            <div className="p-4 text-center">
              <Button variant="link" className="text-luko-teal">
                نمایش تمام سرفصل‌ها
              </Button>
            </div>
          </div>
          
          {/* Instructor */}
          {teacher && (
          <div className="bg-white rounded-lg shadow-md mb-8 p-6">
            <h2 className="text-xl font-bold mb-4">مدرس</h2>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 mb-4 md:mb-0">
                <img 
                  src={courseData.imageAddress || "/placeholder-avatar.png"}
                  alt={courseData.teacherName || "مدرس دوره"} 
                  className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-luko-teal"
                />
              </div>
              <div className="md:w-3/4 md:pr-6">
                <h3 className="text-lg font-bold mb-2"> {courseData.teacherName}</h3>
                <div className="text-gray-500 mb-4">   {courseData.title} </div>
                <p className="text-gray-700 mb-4">
                {courseData.bio}
                </p>
                <Button variant="outline" className="text-luko-teal border-luko-teal hover:bg-luko-teal/10">
                  مشاهده پروفایل مدرس
                </Button>
              </div>
            </div>
          </div>
          )}
          
          {/* Reviews */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-6">نظرات</h2>
            
            <div className="border-b pb-6 mb-6">
              <div className="flex items-start">
                <img 
                  src="/lovable-uploads/dab28740-378c-4bde-a459-8122ce2f6957.png" 
                  alt="نظر دهنده" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="mr-4 flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold">محمد حسینی</h4>
                    <div className="text-amber-500">★★★★★</div>
                  </div>
                  <div className="text-xs text-gray-500 mb-2">۱۴۰۲/۰۱/۱۵</div>
                  <p className="text-gray-700">
                    دوره بسیار کاملی هست و من خیلی راضی بودم. مطالب به صورت کامل و با جزئیات توضیح داده شده و پروژه‌های عملی خیلی کمک کننده بودند.
                  </p>
                  <div className="flex mt-3 text-gray-400 text-sm">
                    <button className="flex items-center ml-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
                      ۱۲
                    </button>
                    <button className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2" />
                      </svg>
                      ۳
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <Button className="bg-luko-teal hover:bg-luko-teal/90 mx-auto block">
              مشاهده همه نظرات
            </Button>
          </div>
          
          {/* Related Courses */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-6">دوره‌های مرتبط</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-40 bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <img 
                      src={`/lovable-uploads/04f05962-568c-44ad-a091-a60a681fa24c.png`}
                      alt="React course"
                      className="h-16 w-16 rounded-full bg-black p-2"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-2">دوره پیشرفته جاوااسکریپت</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>مهدی محمدی</span>
                    </div>
                    <div className="text-amber-500 mb-2">★★★★★</div>
                    <div className="text-luko-teal font-bold mt-2 text-left">۱,۴۵۰,۰۰۰ تومان</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CourseDetail;
