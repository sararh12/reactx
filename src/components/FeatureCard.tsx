
import React, { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  bgColor?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, bgColor = 'bg-white' }) => {
  return (
    <div className={`${bgColor} p-6 rounded-lg shadow-md transform hover:-translate-y-2 transition-transform duration-300 w-48 h-48 flex flex-col items-center justify-center rtl`}>
      <div className="text-center w-full">
        <div className="flex justify-center mb-4">
          {icon}
        </div>
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
