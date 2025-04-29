
import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center no-underline">
      <div className="relative">
        <div className="text-3xl font-bold flex items-center">
          <div className="bg-luko-teal text-white px-2 py-1 rounded">لــ</div>
          <span className="text-black mr-1">وکو</span>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
