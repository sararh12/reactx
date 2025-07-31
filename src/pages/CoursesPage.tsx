
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CourseCard from '@/components/CourseCard';
import { Search } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import axios from 'axios';

export interface Course {
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

type SelectedFilterKeys =
  | "technologyIds"
  | "statusName"
  | "courseRate"
  | "levelName"
  | "cost"
  | "priceRange";


const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [courseTypes, setCourseTypes] = useState<CourseType[]>([]);
  const coursesPerPage = 6;
  const [selectedFilters, setSelectedFilters] = useState<{
    technologyIds: number[];
    statusName: string[];
    courseRate: number[];
    levelName: string[];
    cost: string[];
    priceRange: number;
  }>({
    technologyIds: [],
    statusName: [],
    courseRate: [],
    levelName: [],
    cost: [],
    priceRange: 3000000,
  });
  
  const fetchCourses = () => {
    const { technologyIds, levelName, priceRange, courseRate, statusName } = selectedFilters;

    const filterParams = new URLSearchParams();
    filterParams.append('PageNumber', String(currentPage));
    filterParams.append('RowsOfPage', String(coursesPerPage));

    if (searchTerm.trim()) {
      filterParams.append("Query", searchTerm.trim());
    }

    if (levelName.length > 0) {
      filterParams.append("courseLevelId", levelName.join(","));
    }

    if (technologyIds.length > 0) {
      filterParams.append("ListTech", technologyIds.join(","));
      filterParams.append("TechCount", String(technologyIds.length));
    }

    filterParams.append("CostDown", "0");
    filterParams.append("CostUp", String(priceRange));


    axios
      .get(
        `https://sepehracademy.liara.run/Home/GetCoursesWithPagination?${filterParams.toString()}`
      )
      .then((response) => {
        if (response.data && Array.isArray(response.data.courseFilterDtos)) {
          setCourses(response.data.courseFilterDtos);
          setTotalCount(response.data.totalCount);
        } else {
          console.error(
            "Invalid data structure received from API:",
            response.data
          );
          setCourses([]);
          setTotalCount(0);
        }
      })
      .catch((error) => {
        console.error("خطا در دریافت لیست دوره‌ها:", error);
        setCourses([]);
        setTotalCount(0);
      });
};

useEffect(() => {
  axios
    .get("https://sepehracademy.liara.run/Home/GetTechnologies")
    .then((response) => {
      if (Array.isArray(response.data)) {
        setTechnologies(response.data);
      } else {
        console.error(
          "Invalid data structure received for technologies:",
          response.data
        );
        setTechnologies([]);
      }
    })
    .catch((err) => console.error("خطا در دریافت تکنولوژی‌ها", err));
}, []);

useEffect(() => {
  const fetchCourseTypes = async () => {
    try {
      const response = await axios.get(
        `https://sepehracademy.liara.run/CourseType/GetCourseTypes`
      );
      if (Array.isArray(response.data)) {
        setCourseTypes(response.data);
      } else {
        console.error(
          "Invalid data structure received for course types:",
          response.data
        );
        setCourseTypes([]);
      }
    } catch (error) {
      console.error("Error fetching course types:", error);
    }
      }

  fetchCourseTypes();
}, []);



useEffect(() => {
  fetchCourses();
}, [selectedFilters, currentPage, searchTerm]);


  
const paginate = (pageNumber: number) => {
  if (
    pageNumber >= 1 &&
    (pageNumber - 1) * coursesPerPage < totalCount
  ) {
    setCurrentPage(pageNumber);
  }
};
  
const handleFilterChange = (
  category: SelectedFilterKeys,
  value: string | number
) => {
  setSelectedFilters((prev) => {
    const newFilters = { ...prev };
    const currentFilterValue = newFilters[category];

    if (Array.isArray(currentFilterValue)) {
      const categoryArray = currentFilterValue as Array<string | number>;
      if (categoryArray.includes(value)) {
        return {
          ...newFilters,
          [category]: categoryArray.filter((item) => item !== value),
        };
      } else {
        return {
          ...newFilters,
          [category]: [...categoryArray, value],
        };
      }
    } else {
      return {
        ...newFilters,
        [category]: value,
      };
    }
  });
  setCurrentPage(1);
};

  
const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSelectedFilters((prev) => ({
    ...prev,
    priceRange: Number(e.target.value),
  }));
  setCurrentPage(1);
};
  
const resetFilters = () => {
  setSelectedFilters({
    technologyIds: [],
    statusName: [],
    courseRate: [],
    levelName: [],
    cost: [],
    priceRange: 3000000,
  });
  setSearchTerm("");
  setCurrentPage(1);
};
  
const formatPrice = (price: number) => {
  if (isNaN(price)) {
    return "۰";
  }
  return new Intl.NumberFormat("fa-IR").format(price);
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
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
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
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {technologies.map((tech) => (
                        <div key={tech.id} className="flex items-center">
                          <Checkbox
                            id={`tech-${tech.id}`}
                            checked={selectedFilters.technologyIds.includes(
                              tech.id
                            )}
                            onCheckedChange={() =>
                              handleFilterChange("technologyIds", tech.id)
                            }
                          />
                          <label
                            htmlFor={`tech-${tech.id}`}
                            className="mr-2 text-sm text-gray-600 hover:text-gray-800 cursor-pointer"
                          >
                            {tech.techName}
                          </label>
                        </div>
                      ))}

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
                    {[
                        { id: "مقدماتی", label: "مقدماتی" },
                        { id: "متوسط", label: "متوسط" },
                        { id: "پیشرفته", label: "پیشرفته" },
                      ].map((level) => (
                        <div key={level.id} className="flex items-center">
                          <Checkbox
                            id={`level-${level.id}`}
                            checked={selectedFilters.levelName.includes(level.id)}
                            onCheckedChange={() =>
                              handleFilterChange("levelName", level.id)
                            }
                          />
                          <label
                            htmlFor={`level-${level.id}`}
                            className="mr-2 text-sm text-gray-600 hover:text-gray-800 cursor-pointer"
                          >
                            {level.label}
                          </label>
                        </div>
                      ))}
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
                 {courses.map((courseData) => (
                      <CourseCard key={courseData.courseId} course={courseData} />
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
                
                {totalCount > coursesPerPage && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    قبلی
                  </button>

                  <span className="text-sm text-gray-500">
                      صفحه {currentPage} از {Math.ceil(totalCount / coursesPerPage)}
                    </span>

                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage * coursesPerPage >= totalCount}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    بعدی
                  </button>
                </div>
                )}
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
