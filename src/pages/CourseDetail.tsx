import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import CourseAccordion from '@/components/CourseAccordion';
import CommentSection from './commentSection';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';

interface Comment {
  id: string;
  courseId: string;
  parentId?: string | null;
  currentUserLikeId?: string | null;
  inserDate: string;
  title: string;
  describe: string;
  likeCount: number;
  dissLikeCount: number;
  replyCount: number;
  currentUserIsLike: boolean;
  currentUserIsDissLike: boolean;
  autor: string;
  pictureAddress?: string | null;
}

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
  capacity: number;
  imageAddress: string | null;
  sections: {
    id: string;
    title: string;
    lessons: number;
    duration: string;
  }[];

  courseRate?: number;
  currentRegistrants?: number;
  commentsCount?: number;
}

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [courseData, setCourseData] = React.useState<CourseDetailData | null>(null);
  const [courseComments, setCourseComments] = React.useState<Comment[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [loadingComments, setLoadingComments] = React.useState(true);

  const fetchCourseComments = async () => {
    if (!id) return;
    setLoadingComments(true);
    try {
      const response = await axios.get<Comment[]>(
        `https://classapi.sepehracademy.ir/api/Course/GetCourseCommnets/${id}`
      );
      setCourseComments(response.data || []);
    } catch (error) {
      console.error("Error fetching course comments:", error);
      setCourseComments([]);
      toast({
        title: "خطا در دریافت نظرات دوره",
        description: "لطفا دوباره تلاش کنید.",
        variant: "destructive",
      });
    } finally {
      setLoadingComments(false);
    }
  };

  React.useEffect(() => {
    const fetchCourseDetails = async () => {
      if (!id) {
        console.error("Course ID is missing");
        setLoading(false);
        setCourseData(null);
        setCourseComments([]);
        return;
      }
      setLoading(true);
      try {
        const response = await fetch(`https://classapi.sepehracademy.ir/api/Home/GetCourseDetails?CourseId=${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCourseData(data as CourseDetailData);
        fetchCourseComments();
      } catch (error) {
        console.error("Error fetching course details:", error);
        setCourseData(null);
        toast({
          title: "خطا در دریافت اطلاعات دوره",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchCourseDetails();
  }, [id]);

  const refetchDataAndComments = async () => {
    if (!id) return;
    setLoading(true);
    setLoadingComments(true);
    try {
      const detailsResponse = await fetch(`https://classapi.sepehracademy.ir/api/Home/GetCourseDetails?CourseId=${id}`);
      if (!detailsResponse.ok) {
        throw new Error(`HTTP error fetching details: ${detailsResponse.status}`);
      }
      const detailsData = await detailsResponse.json();
      setCourseData(detailsData as CourseDetailData);

      const commentsResponse = await axios.get<Comment[]>(
        `https://classapi.sepehracademy.ir/api/Course/GetCourseCommnets/${id}`
      );
      setCourseComments(commentsResponse.data || []);

      toast({ title: "اطلاعات دوره و نظرات به‌روزرسانی شد" });
    } catch (error) {
      console.error("Error refetching course data and comments:", error);
      toast({
        title: "خطا در به‌روزرسانی اطلاعات",
        description: "لطفا دوباره تلاش کنید.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setLoadingComments(false);
    }
  };

  const commentEndpoints = {
    createComment: `https://classapi.sepehracademy.ir/api/Course/AddCommentCourse`,
    likeComment: (commentId: string) =>
      `https://classapi.sepehracademy.ir/api/Course/AddCourseCommentLike?CourseCommandId=${commentId}`,
    dislikeComment: (commentId: string) =>
      `https://classapi.sepehracademy.ir/api/Course/AddCourseCommentDissLike?CourseCommandId=${commentId}`,
    deleteCommentLike: `https://classapi.sepehracademy.ir/api/Course/DeleteCourseCommentLike`,
    getReplies: (commentId: string) =>
      `https://classapi.sepehracademy.ir/api/Course/GetRepliesCourseComments?Id=${commentId}`,
    createReplyComment: `https://classapi.sepehracademy.ir/api/Course/AddReplyCourseComment`
  };

  if (loading) return <div className="text-center py-10">در حال بارگذاری اطلاعات دوره...</div>;
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
                      src={courseData.imageAddress || undefined}
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
                  <div className="text-white text-2xl font-bold mb-2">{courseData.cost.toLocaleString()} تومان </div>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-lg h-12">
                    شرکت در دوره
                  </Button>
                </div>
              </div>

              <div className="md:w-1/2 bg-gradient-to-r from-blue-900 to-black p-8 flex items-center justify-center">
                <img
                  src={courseData.imageAddress || undefined}
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
                  <div className="text-amber-500 text-2xl font-bold">{courseData.courseRate || 'N/A'}</div>
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
                <div className="text-luko-teal text-2xl font-bold">{courseData.currentRegistrants || 0}</div>
                <div className="text-sm text-gray-500">تعداد دانشجویان</div>
                <div className="flex items-center mt-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                    <div className="w-8 h-8 rounded-full bg-gray-400"></div>
                    <div className="w-8 h-8 rounded-full bg-gray-500"></div>
                  </div>
                  <div className="mr-4 text-xs text-gray-500">و {courseData.capacity || 0} نفر دیگر</div>
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
              <div className="px-6 py-4 text-gray-500">نظرات ({courseComments.length || 0})</div>
            </div>

            <div className="p-6">
              <div className="text-gray-700 leading-relaxed">
                <p className="mb-4">
                  {courseData.description}
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
                  <div className="text-gray-500 mb-4">   مدرس دوره </div>
                  <p className="text-gray-700 mb-4">
                    استاد برجسته در زمینه برنامه‌نویسی و توسعه وب با بیش از ۱۰ سال سابقه تدریس.
                  </p>
                  <Button variant="outline" className="text-luko-teal border-luko-teal hover:bg-luko-teal/10">
                    مشاهده پروفایل مدرس
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Comments Section */}
          {loadingComments ? (
            <div className="text-center py-10">در حال بارگذاری نظرات...</div>
          ) : (
            <CommentSection
              comments={courseComments}
              refetchData={refetchDataAndComments}
              endpoints={commentEndpoints}
              contentId={courseData.courseId}
              contentType="course"
              totalCommentsCount={courseData.commentsCount !== undefined ? courseData.commentsCount : courseComments.length}
            />
          )}

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
