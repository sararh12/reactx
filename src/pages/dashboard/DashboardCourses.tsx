
import React from 'react';
import CoursesTable from '@/components/dashboard/CoursesTable';

const DashboardCourses: React.FC = () => {
  return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">دوره های من</h1>
        <CoursesTable />
      </div>

  );
};

export default DashboardCourses;
