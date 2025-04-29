
import React from 'react';
import { Link } from 'react-router-dom';

const CtaSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-mint rtl relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-luko-yellow opacity-20 rounded-full"></div>
      <div className="absolute bottom-10 right-20 w-32 h-32 bg-luko-teal opacity-10 rounded-full"></div>
      
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-xl relative">
          <div className="absolute -top-4 -right-4 bg-luko-orange text-white px-6 py-1 rounded-md font-bold transform rotate-12">
            تخفیف ویژه
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">مهارت خود را ارتقا دهید</h2>
          <p className="text-gray-600 mb-8 text-center">
            همین امروز به جمع هزاران دانشجوی لوکو بپیوندید و با استفاده از تخفیف ویژه ثبت نام، مسیر موفقیت خود را هموار کنید.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6 md:space-x-reverse">
            <Link 
              to="/courses" 
              className="bg-luko-teal hover:bg-luko-teal/90 text-white font-bold px-8 py-3 rounded-lg transition-colors duration-300 w-full md:w-auto text-center"
            >
              مشاهده دوره ها
            </Link>
            <Link 
              to="/auth/register" 
              className="border-2 border-luko-teal text-luko-teal hover:bg-luko-teal/10 font-bold px-8 py-3 rounded-lg transition-colors duration-300 w-full md:w-auto text-center"
            >
              ثبت نام رایگان
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
