
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CourseCard from '@/components/CourseCard';
import { Search } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import axios from 'axios';

export interface Course {
  course: {
    courseId: string;
    title: string;
    describe: string;
    cost: number;
    courseRate: number;
    levelName: string;
    statusName: string;
    teacherName: string;
    classRoomName: string;
    technologyList: string;
    likeCount: number;
    dissLikeCount: number;
    currentRegistrants: number;
    tumbImageAddress: string | null;
    lastUpdate: string;
    userFavorite: boolean;
  };
}

interface Technology {
  id: number;
  techName: string;
  parentId: number | null;
  describe: string;
  iconAddress: string;
}

interface CourseType {
  id: number;
  techName: string;
  parentId: number | null;
  describe: string;
  iconAddress: string;
}


const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [courseTypes, setCourseTypes] = useState<CourseType[]>([]);
  const coursesPerPage = 6;
  const [selectedFilters, setSelectedFilters] = useState({
    technologyList: [] as string[],
    statusName: [] as string[],
    courseRate: [] as number[],
    levelName: [] as string[],
    cost: [] as string[],
    priceRange: 3000000,
  });
  
  const fetchCourses = () => {
    const { technologyList, statusName, courseRate, levelName, cost, priceRange } = selectedFilters;

    const filterParams = new URLSearchParams();
    filterParams.append('PageNumber', String(currentPage));
    filterParams.append('RowsOfPage', String(coursesPerPage));

    if (searchTerm) filterParams.append('Query', searchTerm);
    if (technologyList.length > 0) filterParams.append('ListTech', technologyList.join(','));
    if (statusName.length > 0) filterParams.append('Status', statusName.join(','));
    if (courseRate.length > 0) filterParams.append('Rating', courseRate.join(','));
    if (levelName.length > 0) filterParams.append('Level', levelName.join(','));
    if (cost.length > 0) filterParams.append('cost', cost.join(','));
    if (priceRange) filterParams.append('PriceRange', String(priceRange));

    axios.get(`https://classapi.sepehracademy.ir/api/Home/GetCoursesWithPagination?${filterParams.toString()}`)
    .then(response => {
      console.log(response.data);
      if (response.data && Array.isArray(response.data.courseFilterDtos)) {
        setCourses(response.data.courseFilterDtos);  
        setTotalCount(response.data.totalCount); 
      } else {
        console.error("داده‌ها به درستی دریافت نشدند یا ساختار متفاوت است.");
      }
    })
    .catch(error => {
      console.error("خطا در دریافت لیست دوره‌ها:", error);
    });
};

useEffect(() => {
  axios.get('https://classapi.sepehracademy.ir/api/Home/GetTechnologies')
    .then(response => {
      if (Array.isArray(response.data)) {
        setTechnologies(response.data);
      }
    })
    .catch(err => console.error("خطا در دریافت تکنولوژی‌ها", err));
}, []);

useEffect(() => {
  const fetchCourseTypes = async () => {
    try {
      const response = await axios.get(`https://classapi.sepehracademy.ir/api/CourseType/GetCourseTypes`);
      setCourseTypes(response.data);
    } catch (error) {
      console.error('خطا در دریافت نوع دوره‌ها:', error);
    }
  };

  fetchCourseTypes();
}, []);



useEffect(() => {
  fetchCourses();
}, [selectedFilters, currentPage, searchTerm]);


  
  // Get current courses for pagination
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  // Handle filter changes
  const handleFilterChange = (category: string, value: string | number) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      const categoryArray = newFilters[category as keyof typeof selectedFilters] as Array<string | number>;
      
      if (categoryArray.includes(value)) {
        // Remove filter if already selected
        return {
          ...newFilters,
          [category]: categoryArray.filter(item => item !== value)
        };
      } else {
        // Add filter if not selected
        return {
          ...newFilters,
          [category]: [...categoryArray, value]
        };
      }
    });
  };
  
  // Handle price range change
  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFilters(prev => ({
      ...prev,
      priceRange: Number(e.target.value)
    }));
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSelectedFilters({
      technologyList: [],
      statusName: [],
      courseRate: [],
      levelName: [],
      cost: [],
      priceRange: 3000000,
    });
    setSearchTerm('');
    setCurrentPage(1);
  };
  
  // Format price to Persian format
  const formatPrice = (cost: number) => {
    return new Intl.NumberFormat('fa-IR').format(cost);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <section className=" py-12 rtl">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h1 className="text-3xl font-bold">دوره های آموزشی</h1>
                <p className="text-gray-700 mt-2">به روز ترین دوره هایی که میتوانید پیدا کنید</p>
              </div>
              
              <div className="w-full md:w-auto">
                <div className="relative">
                  <Search className="absolute top-3 right-3 h-5 w-5 text-gray-400 direction-reverse" />
                  <input
                    type="text"
                    placeholder="جستجو در دوره ها..."
                    className="w-full md:w-80 pr-10 py-2 border border-gray-300 rounded-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <img 
              src="/lovable-uploads/course.png" 
              alt="Course hero"
              className="mt-8 rounded-lg w-64 mx-auto"
            />
          </div>
        </section>
        
        <section className="py-12 rtl">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row">
              {/* Filters */}
              <div className="lg:w-1/4 mb-8 lg:mb-0">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">فیلتر ها</h3>
                    <button 
                      onClick={resetFilters}
                      className="text-sm text-luko-teal hover:underline"
                    >
                      پاک کردن همه
                    </button>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-medium mb-2 flex justify-between items-center">
                      تکنولوژی
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </h4>
                    <div className="space-y-2">
                    {technologies.map((tech) => {
  const techName = tech.techName;

  return (
    <div key={tech.id} className="flex items-center">
      <Checkbox 
        id={`tech-${techName.toLowerCase().replace(/\s+/g, '-')}`}
        checked={selectedFilters.technologyList.includes(techName)}
        onCheckedChange={() => handleFilterChange('technologyList', techName)}
      />
      <label 
        htmlFor={`tech-${techName.toLowerCase().replace(/\s+/g, '-')}`} 
        className="mr-2 text-sm cursor-pointer"
      >
        {techName}
      </label>
    </div>
  );
})}

                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-medium mb-2 flex justify-between items-center">
                      وضعیت
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Checkbox 
                          id="status-published"
                          checked={selectedFilters.statusName.includes('published')}
                          onCheckedChange={() => handleFilterChange('statusName', 'published')}
                        />
                        <label htmlFor="status-published" className="mr-2 text-sm cursor-pointer">منتشر شده</label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox 
                          id="status-presell"
                          checked={selectedFilters.statusName.includes('presell')}
                          onCheckedChange={() => handleFilterChange('statusName', 'presell')}
                        />
                        <label htmlFor="status-presell" className="mr-2 text-sm cursor-pointer">در حال پیش فروش</label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox 
                          id="status-completing"
                          checked={selectedFilters.statusName.includes('completing')}
                          onCheckedChange={() => handleFilterChange('statusName', 'completing')}
                        />
                        <label htmlFor="status-completing" className="mr-2 text-sm cursor-pointer">در حال تکمیل</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-medium mb-2 flex justify-between items-center">
                      امتیاز
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </h4>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map(courseRate => (
                        <div key={courseRate} className="flex items-center">
                          <Checkbox 
                            id={`rating-${courseRate}`}
                            checked={selectedFilters.courseRate.includes(courseRate)}
                            onCheckedChange={() => handleFilterChange('courseRate', courseRate)}
                          />
                          <label htmlFor={`rating-${courseRate}`} className="mr-2 text-sm flex items-center cursor-pointer">
                            <span className="text-yellow-500">{Array(courseRate).fill('★').join('')}</span>
                            <span className="text-gray-300">{Array(5-courseRate).fill('★').join('')}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-medium mb-2 flex justify-between items-center">
                      سطح
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Checkbox 
                          id="level-beginner" 
                          checked={selectedFilters.levelName.includes('beginner')}
                          onCheckedChange={() => handleFilterChange('levelName', 'beginner')}
                        />
                        <label htmlFor="level-beginner" className="mr-2 text-sm cursor-pointer">مقدماتی</label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox 
                          id="level-inter"
                          checked={selectedFilters.levelName.includes('intermediate')}
                          onCheckedChange={() => handleFilterChange('levelName', 'intermediate')}
                        />
                        <label htmlFor="level-inter" className="mr-2 text-sm cursor-pointer">متوسط</label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox 
                          id="level-advanced"
                          checked={selectedFilters.levelName.includes('advanced')}
                          onCheckedChange={() => handleFilterChange('levelName', 'advanced')}
                        />
                        <label htmlFor="level-advanced" className="mr-2 text-sm cursor-pointer">پیشرفته</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2 flex justify-between items-center">
                      قیمت
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Checkbox 
                          id="price-free"
                          checked={selectedFilters.cost.includes('free')}
                          onCheckedChange={() => handleFilterChange('cost', 'free')}
                        />
                        <label htmlFor="price-free" className="mr-2 text-sm cursor-pointer">رایگان</label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox 
                          id="price-paid"
                          checked={selectedFilters.cost.includes('paid')}
                          onCheckedChange={() => handleFilterChange('cost', 'paid')}
                        />
                        <label htmlFor="price-paid" className="mr-2 text-sm cursor-pointer">غیر رایگان</label>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <input
                        type="range"
                        min="0"
                        max="3000000"
                        step="100000"
                        value={selectedFilters.priceRange}
                        onChange={handlePriceRangeChange}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-2">
                        <span>۰ تومان</span>
                        <span>{formatPrice(selectedFilters.priceRange)} تومان</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Courses */}
              <div className="lg:w-3/4 lg:pr-8">
                <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
                  <div className="flex space-x-4 space-x-reverse">
                    <button className="text-luko-teal flex items-center">
                      <span>جدیدترین</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    <div className="flex">
                      <button className="p-1 bg-white border border-gray-300 rounded-r">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                      </button>
                      <button className="p-1 bg-gray-100 border border-gray-300 rounded-l">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    نمایش {courses.length} دوره از {totalCount} نتیجه
                  </div>
                </div>
                
                {courses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {courses.map((course) => (
                      <CourseCard key={course.courseId} course={course} />
                ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-bold text-gray-700 mb-2">هیچ دوره ای با این مشخصات پیدا نشد</h3>
                    <p className="text-gray-500">لطفا فیلترهای خود را تغییر دهید یا از عبارت جستجوی دیگری استفاده کنید</p>
                    <button 
                      className="mt-4 px-4 py-2 bg-luko-teal text-white rounded-md hover:bg-luko-teal/90"
                      onClick={resetFilters}
                    >
                      پاک کردن فیلترها
                    </button>
                  </div>
                )}
                
                {/* Pagination */}
                <div className="flex justify-center mt-8">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 rounded-l-md"
                  >
                    قبلی
                  </button>
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage * coursesPerPage >= totalCount}
                    className="px-4 py-2 bg-gray-300 rounded-r-md"
                  >
                    بعدی
                  </button>
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

export default CoursesPage;
