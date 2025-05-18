
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Changepassword } from '@/services/api/profileInfoService/profileInfoService';
import { Formik, Form, Field } from 'formik';

const DashboardSecurity: React.FC = () => {

  const [passChange, setPassChange] = useState([]);

  async function ChangePass(oldPassword:string,newPassword:string) {
    const callApi = await Changepassword(oldPassword,newPassword);

    console.log(callApi?.data);

    setPassChange(callApi?.data);
  }




  return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-8">تنظیمات امنیتی</h1>
        
        <div className="space-y-8">
          {/* Password Change Section */}
         <Formik
          initialValues={{
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              await ChangePass(values.oldPassword, values.newPassword);
              resetForm();
              alert('رمز عبور با موفقیت تغییر یافت!');
            } catch (error) {
              console.error('خطا در تغییر رمز عبور:', error);
              alert('خطا در تغییر رمز عبور!');
            } finally {
              setSubmitting(false);
            }
          }}
         >
          <Form>
             <div className="space-y-4">
             <h3 className="text-lg font-semibold">تغییر رمز عبور</h3>
             <div className="max-w-md space-y-4">
             <div>
            <label className="block text-sm text-gray-600 mb-1">
              رمز عبور فعلی
            </label>
            <Field
             type="password"
             name="oldPassword"
             placeholder="رمز عبور فعلی"
             iconClass="fi fi-rr-password"
             className="w-full rtl"
              dir="ltr"
            />
            </div>

            <div>
            <label className="block text-sm text-gray-600 mb-1">
              رمز عبور جدید
            </label>
            <Field
              type="password"
              name="newPassword"
              placeholder="رمز عبور جدید"
              iconClass="fi fi-rr-lock"
              className="w-full rtl"
              dir="ltr"
            />
            </div>

            <div>
            <label className="block text-sm text-gray-600 mb-1">
              تکرار رمز عبور
            </label>
            <Field
              type="password"
              name="confirmPassword"
              placeholder="تکرار رمز عبور جدید"
              iconClass="fi fi-rr-lock"
              className="w-full rtl"
              dir="ltr"
            />
             </div>
        </div>
      </div>

            
          </Form>

         </Formik>
          
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

          <Button
           className="bg-[#00D0B9] hover:bg-[#00D0B9]/90"
           type="submit"
           >
            ذخیره تغییرات
          </Button>
        </div>
      </div>

  );
};

export default DashboardSecurity;
