
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import CoursesTable from '@/components/dashboard/CoursesTable';

const DashboardCourses: React.FC = () => {
  return (
    <DashboardLayout activeTab="courses">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">دوره های من</h1>
        <CoursesTable />
      </div>
    </DashboardLayout>
  );
};

export default DashboardCourses;
