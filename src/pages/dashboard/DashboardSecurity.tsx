
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Changepassword, EditSecurity } from '@/services/api/profileInfoService/profileInfoService';
import { Formik, Form, Field } from 'formik';
import { LiaSave } from "react-icons/lia";
import { userInfo } from 'os';
import { Value } from '@radix-ui/react-select';


const DashboardSecurity: React.FC = () => {

  const [passChange, setPassChange] = useState([]);
 

  async function handleSubmit(values) {

    const callApi = await EditSecurity (values);
    
    console.log(values);
  }

  async function ChangePass(oldPassword:string,newPassword:string) {
    const callApi = await Changepassword(oldPassword,newPassword);

    console.log(callApi?.data);

    setPassChange(callApi?.data);
  }


  return (
    <div className="p-6">
      <h1 className="text-2xl mb-8 flex justify-center items-center text-[#9D9D9D] font-[400]">
        تنظیمات امنیتی
      </h1>

      <div className="space-y-8 ">
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
              alert("رمز عبور با موفقیت تغییر یافت!");
            } catch (error) {
              console.error("خطا در تغییر رمز عبور:", error);
              alert("خطا در تغییر رمز عبور!");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          <Form>
            <div className="space-y-6">
              <h3 className="text-lg text-[#9D9D9D] font-[400] mb-4 ">
                تغییر رمز عبور
              </h3>
              <div className="flex flex-wrap gap-5 justify-center items-center ">
                <div className="space-y-2">
                  <label className="block text-sm font-[400] text-[#979797] mb-1">
                    رمز عبور فعلی
                  </label>
                  <div className="relative " style={{ width: "220px" }}>
                    <i className="fi fi-rr-password absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <Field
                      type="password"
                      name="oldPassword"
                      placeholder="رمز عبور فعلی"
                      iconClass="fi fi-rr-password"
                      className="w-full pl-10 pr-3 py-2 border rounded-[5px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-[0_1px_3px_0_#00000033]"
                      style={{ height: "39px" }}
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-[400] text-[#979797] mb-1">
                    رمز عبور جدید
                  </label>
                  <div className="relative" style={{ width: "220px" }}>
                    <i className="fi fi-rr-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <Field
                      type="password"
                      name="newPassword"
                      placeholder="رمز عبور جدید"
                      iconClass="fi fi-rr-lock"
                      style={{ height: "39px" }}
                      className="w-full pl-10 pr-3 py-2 border  rounded-[5px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-[0_1px_3px_0_#00000033]"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm text-[#979797] font-[400] mb-1">
                    تکرار رمز عبور
                  </label>
                  <div className="relative" style={{ width: "220px" }}>
                    <i className="fi fi-rr-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <Field
                      type="password"
                      name="confirmPassword"
                      placeholder="تکرار رمز عبور جدید"
                      iconClass="fi fi-rr-lock"
                      className="w-full pl-10 pr-3 py-2 border  rounded-[5px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-[0_1px_3px_0_#00000033]"
                      dir="ltr"
                    />
                  </div>
                </div>
              </div>
              <div className="pt-4 flex justify-center">
                <button
                  className="flex gap-2 items-center px-5 py-2 bg-[#00E0DB] text-[#003B39] rounded-[25px] text-[13px] hover:bg-[#4fcdc9] transition-colors focus:outline-none focus:ring-2 focus:ring-[#007D79] font-[400]"
                  style={{ height: "39px" }}
                  type="submit"
                >
                  تغییر رمزعبور
                  <LiaSave className="size-4" />
                </button>
              </div>
            </div>
          </Form>
        </Formik>

        {/* Two-Factor Authentication */}
        <Formik
          initialValues={{
            twoStepAuth: false,
            recoveryEmail: "",
            baseUrl: "http://localhost:8080/",
          }}
          onSubmit={(value) => handleSubmit(value)}
        >
          {({ values }) => (
            <Form className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-[400] text-[#9D9D9D] ">
                  تایید ورود دو مرحله ای
                </h3>
                <div className="flex items-center space-x-4 justify-center gap-2">
                  <label htmlFor="2fa" className="text-[15px] text-[#00504E]">
                    مایل به ورود دو مرحله ای هستم
                  </label>
                  <Field
                    type="checkbox"
                    name="twoStepAuth"
                    id="2fa"
                    className="w-4 h-4 text-[#00D0B9] shadow-[0_1px_3px_0_#00000040] border-none rounded-[3px]"
                  />
                </div>
              </div>

              {/* Email Section */}
              <h3 className="text-lg font-[400] text-[#9D9D9D]">
                ایمیل بازیابی
              </h3>
              <div className="space-y-4 flex justify-center items-center">
                <div className="max-w-md ">
                  <Field
                    type="email"
                    as={Input}
                    name="recoveryEmail"
                    placeholder="example@gmail.com"
                    className="w-[285px] rtl shadow-[0_1px_3px_0_#00000033] "
                    dir="ltr"
                  />
                </div>
              </div>
              <div className="flex justify-center items-center">
                <button
                  className="flex gap-2 items-center ju px-5 py-2 bg-[#00E0DB] text-[#003B39] rounded-[25px] text-[13px] hover:bg-[#4fcdc9] transition-colors focus:outline-none focus:ring-2 focus:ring-[#007D79] font-[400]"
                  style={{ height: "39px" }}
                  type="submit"
                >
                  ذخیره تغییرات
                  <LiaSave className="size-4" />
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default DashboardSecurity;
