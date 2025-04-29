
import React from 'react';
import { Search } from 'lucide-react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  imageUrl: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle, imageUrl }) => {
  return (
    <section className="bg-gradient-mint py-12 md:py-20 rtl">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 gradient-text">{title}</h1>
            <p className="text-lg mb-8 text-gray-700">{subtitle}</p>
            
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-luko-teal focus:border-luko-teal"
                placeholder="جستجو در دوره ها..."
              />
              <button
                type="submit"
                className="absolute left-2.5 bottom-2.5 bg-luko-teal hover:bg-luko-teal/90 text-white font-medium rounded-lg text-sm px-4 py-2"
              >
                جستجو
              </button>
            </div>

            <div className="flex items-center mt-6 space-x-4 space-x-reverse">
              <div className="flex items-center">
                <div className="bg-amber-400 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="mr-2 text-gray-700">۷۵۰۰۰ دانشجو</span>
              </div>
              <div className="flex items-center">
                <div className="bg-blue-400 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <span className="mr-2 text-gray-700">۱۲۰ دوره آموزشی</span>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 md:pl-12">
            <div className="relative">
              <img
                src={imageUrl}
                alt="Student learning"
                className="rounded-lg shadow-xl z-10 relative"
              />
              <div className="absolute -top-4 -right-4 h-20 w-20 bg-luko-orange rounded-full flex items-center justify-center text-white font-bold text-xl z-20">
                ٪۳۰
                <br />
                تخفیف
              </div>
              <div className="absolute -z-10 top-6 right-6 w-full h-full rounded-lg bg-luko-teal opacity-20"></div>
              
              {/* Floating elements */}
              <div className="absolute -top-10 -left-10 w-16 h-16 bg-luko-yellow rounded-full opacity-60"></div>
              <div className="absolute bottom-20 -left-8 w-12 h-12 bg-luko-teal rounded-full opacity-60"></div>
              <div className="absolute -bottom-6 right-20 w-10 h-10 bg-luko-orange rounded-full opacity-60"></div>
              
              {/* Curved line */}
              <svg className="absolute top-0 left-0 w-full h-full -z-20" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" stroke="#0EB4A2" strokeWidth="2" d="M 0,50 C 50,0 150,0 200,50 S 150,150 100,150 S 0,150 0,100 Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
