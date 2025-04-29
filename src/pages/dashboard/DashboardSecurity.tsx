
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/DashboardLayout';

const DashboardSecurity: React.FC = () => {
  return (
    <DashboardLayout activeTab="security">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-8">تنظیمات امنیتی</h1>
        
        <div className="space-y-8">
          {/* Password Change Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">تغییر رمز عبور</h3>
            <div className="max-w-md space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">رمز عبور فعلی</label>
                <Input type="password" className="w-full rtl" dir="ltr" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">رمز عبور جدید</label>
                <Input type="password" className="w-full rtl" dir="ltr" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">تکرار رمز عبور</label>
                <Input type="password" className="w-full rtl" dir="ltr" />
              </div>
            </div>
          </div>
          
          {/* Two-Factor Authentication */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">تایید ورود دو مرحله ای</h3>
            <div className="flex items-center space-x-4">
              <input type="checkbox" id="2fa" className="w-4 h-4 text-[#00D0B9]" />
              <label htmlFor="2fa" className="text-sm">مایل به ورود دو مرحله ای هستم</label>
            </div>
          </div>
          
          {/* Email Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">ایمیل بازیابی</h3>
            <div className="max-w-md">
              <Input type="email" placeholder="example@gmail.com" className="w-full rtl" dir="ltr" />
            </div>
          </div>

          <Button className="bg-[#00D0B9] hover:bg-[#00D0B9]/90">
            ذخیره تغییرات
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardSecurity;
