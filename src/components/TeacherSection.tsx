
import React from 'react';

interface TeacherSectionProps {
  name: string;
  title: string;
  description: string;
  imageUrl: string;
}

const TeacherSection: React.FC<TeacherSectionProps> = ({
  name,
  title,
  description,
  imageUrl,
}) => {
  return (
    <section className="py-16 bg-gradient-mint rtl">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/3 mb-8 md:mb-0">
            <div className="relative">
              <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-luko-teal text-white text-xl font-bold w-16 h-16 rounded-full flex items-center justify-center">
                10+
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3 md:pr-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{name}</h2>
            <p className="text-luko-teal font-semibold mb-4">{title}</p>
            <p className="text-gray-700 leading-relaxed mb-6">{description}</p>
            
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="bg-luko-teal hover:bg-luko-teal/90 text-white px-6 py-3 rounded-lg transition-colors duration-300">
                مشاهده دوره های استاد
              </a>
              <a href="#" className="border border-luko-teal text-luko-teal hover:bg-luko-teal/10 px-6 py-3 rounded-lg transition-colors duration-300">
                درباره بیشتر
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeacherSection;
