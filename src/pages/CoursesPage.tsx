
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CourseCard from '@/components/CourseCard';
import { Search } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import axios from 'axios';


const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;
  const [filteredCourses, setFilteredCourses] = useState(initialCourses);
  const [selectedFilters, setSelectedFilters] = useState({
    technologies: [] as string[],
    status: [] as string[],
    rating: [] as number[],
    level: [] as string[],
    price: [] as string[],
    priceRange: 3000000,
  });
  
  // Filter courses based on search term and filters
  useEffect(() => {
    let result = initialCourses;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        course =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply technology filters
    if (selectedFilters.technologies.length > 0) {
      result = result.filter(course =>
        course.technologies.some(tech => selectedFilters.technologies.includes(tech))
      );
    }
    
    // Apply status filters
    if (selectedFilters.status.length > 0) {
      result = result.filter(course => selectedFilters.status.includes(course.status));
    }
    
    // Apply rating filters
    if (selectedFilters.rating.length > 0) {
      result = result.filter(course =>
        selectedFilters.rating.some(rating => Math.floor(course.rating) === rating)
      );
    }
    
    // Apply level filters
    if (selectedFilters.level.length > 0) {
      result = result.filter(course => selectedFilters.level.includes(course.level));
    }
    
    // Apply price filters
    if (selectedFilters.price.length > 0) {
      const isFreeSelected = selectedFilters.price.includes('free');
      const isPaidSelected = selectedFilters.price.includes('paid');
      
      if (isFreeSelected && !isPaidSelected) {
        result = result.filter(course => course.isFree);
      } else if (!isFreeSelected && isPaidSelected) {
        result = result.filter(course => !course.isFree);
      }
    }
    
    // Apply price range filter
    result = result.filter(course => course.price <= selectedFilters.priceRange);
    
    setFilteredCourses(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, selectedFilters]);
  
  // Get current courses for pagination
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  
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
      technologies: [],
      status: [],
      rating: [],
      level: [],
      price: [],
      priceRange: 3000000,
    });
    setSearchTerm('');
  };
  
  // Format price to Persian format
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price);
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
                      {["Bootstrap", "React", "JavaScript", ".Net Core", "Tailwind"].map((tech) => (
                        <div key={tech} className="flex items-center">
                          <Checkbox 
                            id={`tech-${tech.toLowerCase().replace(/\s+/g, '-')}`}
                            checked={selectedFilters.technologies.includes(tech)}
                            onCheckedChange={() => handleFilterChange('technologies', tech)}
                          />
                          <label 
                            htmlFor={`tech-${tech.toLowerCase().replace(/\s+/g, '-')}`} 
                            className="mr-2 text-sm cursor-pointer"
                          >
                            {tech}
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
                          checked={selectedFilters.status.includes('published')}
                          onCheckedChange={() => handleFilterChange('status', 'published')}
                        />
                        <label htmlFor="status-published" className="mr-2 text-sm cursor-pointer">منتشر شده</label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox 
                          id="status-presell"
                          checked={selectedFilters.status.includes('presell')}
                          onCheckedChange={() => handleFilterChange('status', 'presell')}
                        />
                        <label htmlFor="status-presell" className="mr-2 text-sm cursor-pointer">در حال پیش فروش</label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox 
                          id="status-completing"
                          checked={selectedFilters.status.includes('completing')}
                          onCheckedChange={() => handleFilterChange('status', 'completing')}
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
                      {[5, 4, 3, 2, 1].map(rating => (
                        <div key={rating} className="flex items-center">
                          <Checkbox 
                            id={`rating-${rating}`}
                            checked={selectedFilters.rating.includes(rating)}
                            onCheckedChange={() => handleFilterChange('rating', rating)}
                          />
                          <label htmlFor={`rating-${rating}`} className="mr-2 text-sm flex items-center cursor-pointer">
                            <span className="text-yellow-500">{Array(rating).fill('★').join('')}</span>
                            <span className="text-gray-300">{Array(5-rating).fill('★').join('')}</span>
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
                          checked={selectedFilters.level.includes('beginner')}
                          onCheckedChange={() => handleFilterChange('level', 'beginner')}
                        />
                        <label htmlFor="level-beginner" className="mr-2 text-sm cursor-pointer">مقدماتی</label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox 
                          id="level-inter"
                          checked={selectedFilters.level.includes('intermediate')}
                          onCheckedChange={() => handleFilterChange('level', 'intermediate')}
                        />
                        <label htmlFor="level-inter" className="mr-2 text-sm cursor-pointer">متوسط</label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox 
                          id="level-advanced"
                          checked={selectedFilters.level.includes('advanced')}
                          onCheckedChange={() => handleFilterChange('level', 'advanced')}
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
                          checked={selectedFilters.price.includes('free')}
                          onCheckedChange={() => handleFilterChange('price', 'free')}
                        />
                        <label htmlFor="price-free" className="mr-2 text-sm cursor-pointer">رایگان</label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox 
                          id="price-paid"
                          checked={selectedFilters.price.includes('paid')}
                          onCheckedChange={() => handleFilterChange('price', 'paid')}
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
                    نمایش {currentCourses.length} دوره از {filteredCourses.length} نتیجه
                  </div>
                </div>
                
                {currentCourses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentCourses.map((course) => (
                      <CourseCard
                        key={course.id}
                        id={course.id}
                        title={course.title}
                        instructor={course.instructor}
                        rating={course.rating}
                        students={course.students}
                        price={course.price}
                        discountPrice={course.discountPrice}
                        image={course.image}
                      />
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
                {filteredCourses.length > coursesPerPage && (
                  <div className="mt-10 flex justify-center">
                    <div className="flex space-x-1 space-x-reverse">
                      <button 
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        className="px-3 py-1 bg-white border border-gray-300 rounded-md hover:bg-gray-100"
                        disabled={currentPage === 1}
                      >
                        قبلی
                      </button>
                      
                      {Array.from({ length: Math.ceil(filteredCourses.length / coursesPerPage) }).map((_, index) => (
                        <button
                          key={index}
                          onClick={() => paginate(index + 1)}
                          className={`px-3 py-1 rounded-md ${
                            currentPage === index + 1
                              ? 'bg-luko-teal text-white'
                              : 'bg-white border border-gray-300 hover:bg-gray-100'
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}
                      
                      <button 
                        onClick={() => setCurrentPage(Math.min(Math.ceil(filteredCourses.length / coursesPerPage), currentPage + 1))}
                        className="px-3 py-1 bg-white border border-gray-300 rounded-md hover:bg-gray-100"
                        disabled={currentPage === Math.ceil(filteredCourses.length / coursesPerPage)}
                      >
                        بعدی
                      </button>
                    </div>
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
