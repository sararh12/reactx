
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios'

const Register = () => {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [gmail, setGmail] = useState('');
  const [password,setPassword] = useState('');
  const [repeatPassword,setRepeatPassword] = useState('');
  const { toast } = useToast();
  
  
  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);

    try{
      const response=await axios.post("https://classapi.sepehracademy.ir/api/Sign/SendVerifyMessage",{phoneNumber})

      if (response.status !== 200) {
        throw new Error('خطا در ارسال کد تایید');
      }

       toast({
      title: "کد تأیید ارسال شد",
      description: "کد تأیید به شماره موبایل شما ارسال شد.",
      duration: 3000,
    });
    }catch (error) {
      toast({
        title: "خطا",
        description: error.message || 'مشکلی پیش آمد.',
        variant: 'destructive',
      });
    }


   
  };
  
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('https://classapi.sepehracademy.ir/api/Sign/VerifyMessage', {
        phoneNumber,
        verifyCode,
      });
  
      if (response.status !== 200) {
        throw new Error('کد تایید اشتباه است');
      }
  
      toast({
        title: "ثبت نام موفقیت آمیز",
        description: "حساب کاربری شما با موفقیت ایجاد شد.",
        duration: 3000,
      });
  
      setStep(3);
    } catch (error) {
      toast({
        title: "خطا",
        description: error.message || 'مشکلی پیش آمد.',
        variant: 'destructive',
      });
    }
  };

  const handleRegisterFinal = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("https://classapi.sepehracademy.ir/api/Sign/Register", {
        gmail,
        password,
        phoneNumber
      });
  
      if (response.status !== 200) {
        throw new Error('خطا در ثبت‌نام');
      }
  
      toast({
        title: "ثبت‌نام کامل شد",
        description: "اکنون می‌توانید وارد حساب خود شوید.",
        duration: 3000,
      });
  
      window.location.href = '/auth/login';
  
    } catch (error: any) {
      toast({
        title: "خطا",
        description: error.response?.data?.message || error.message || 'مشکلی پیش آمد.',
        variant: 'destructive',
      });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-form py-12">
      <div className="container mx-auto px-6 flex justify-center">
        <div className="w-full max-w-md">
          <div className="flex justify-between mb-8">
            <Link to="/" className="flex items-center text-gray-600 hover:text-gray-800 rtl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              صفحه اصلی
            </Link>
            <div className="flex items-center">
              <Logo />
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg rtl">
            <div className="mb-8">
              <div className="flex justify-center items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-luko-teal text-white' : 'bg-gray-200 text-gray-500'}`}>
                  ۱
                </div>
                <div className={`h-1 w-16 ${step >= 2 ? 'bg-luko-teal' : 'bg-gray-200'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-luko-teal text-white' : 'bg-gray-200 text-gray-500'}`}>
                  ۲
                </div>
                <div className={`h-1 w-16 ${step >= 3 ? 'bg-luko-teal' : 'bg-gray-200'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-luko-teal text-white' : 'bg-gray-200 text-gray-500'}`}>
                  ۳
                </div>
              </div>
            </div>
            
            {step === 1 && (
              <>
                <h2 className="text-2xl font-bold mb-6 text-center">ایجاد حساب کاربری</h2>
                <form onSubmit={handleSendCode}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        شماره همراه
                      </label>
                      <Input
                        id="phoneNumber"
                        type="tel" 
                        placeholder="شماره همراه"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        className="w-full"
                        dir="ltr"
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-luko-teal hover:bg-luko-teal/90">
                      دریافت کد تأیید
                    </Button>
                    
                    <div className="text-center mt-4">
                      <span className="text-sm text-gray-600">
                        قبلا ثبت نام کرده اید؟{' '}
                        <Link to="/auth/login" className="text-luko-teal hover:underline font-medium">
                          وارد شوید
                        </Link>
                      </span>
                    </div>
                  </div>
                </form>
              </>
            )}
            
            {step === 2 && (
              <>
                <h2 className="text-2xl font-bold mb-6 text-center">کد تأیید</h2>
                <p className="text-sm text-gray-600 mb-6 text-center">
                  کد تأیید به شماره {phoneNumber} ارسال شده است. در صورت تمایل، برای ویرایش <button onClick={() => setStep(1)} className="text-luko-teal underline">اینجا</button> کلیک کنید.
                </p>
                
                <form onSubmit={handleVerifyCode}>
                  <div className="space-y-4">
                    <div className="flex justify-center mb-4">
                      <div className="w-full max-w-xs">
                        <Input
                          type="text"
                          placeholder="_ _ _ _ _ "
                          className="text-center text-xl"
                          value={verifyCode}
                          onChange={(e) => setVerifyCode(e.target.value)}
                          required
                          dir="ltr"
                        />
                        <div className="flex justify-between mt-2">
                          <div className="text-xs text-gray-500">1 از 5</div>
                        </div>
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full bg-luko-teal hover:bg-luko-teal/90">
                      ایجاد حساب
                    </Button>
                    
                    <div className="text-center">
                      <button type="button" className="text-sm text-luko-teal hover:underline">
                        ارسال مجدد کد
                      </button>
                    </div>
                  </div>
                </form>
              </>
            )}
            
            {step === 3 && (
              <>
              <div className="text-center">
                {/* <div className="mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div> */}
                <h2 className="text-2xl font-bold mb-6 text-center">ورود به حساب کاربری</h2>
                <form onSubmit={handleRegisterFinal}>
                  <div className='space-y-4'>
                    <div>
                      <label htmlFor='gmail' className="block text-sm font-medium text-gray-700 mb-1">
                        ایمیل
                      </label>
                      <Input
                      id='gmail'
                      type='text'
                      placeholder='ایمیل'
                      value={gmail}
                      onChange={(e) => setGmail(e.target.value)}
                      required
                      className="w-full"
                      />
                    </div>
                    <div>
                    <div className="flex flex-col items-center justify-between mb-1">
                      <label htmlFor='password' className="block text-sm font-medium text-gray-700">
                        رمز عبور
                      </label>
                      <Input
                      id='password'
                      type='password'
                      placeholder='رمز عبور'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className='w-full'
                      />

                    </div>
                    <div className="flex flex-col items-center justify-between mb-1">
                      <label htmlFor='password' className="block text-sm font-medium text-gray-700" >
                        تکرار رمز عبور
                      </label>
                      <Input
                      id='password'
                      type='password'
                      placeholder='تکرار رمز عبور '
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                      required
                      className='w-full'
                      />
                    </div>
                    </div>
                  </div>
                </form>

                
                <Link to="/auth/login">
                  <Button className="w-full bg-luko-teal hover:bg-luko-teal/90">
                    تکمیل ثبت نام
                  </Button>
                </Link>
              </div>
              </>
            )}
          </div>
          
          <div className="mt-8 text-center">
            <div className="flex space-x-4 space-x-reverse justify-center">
              <Link to="mailto:info@luko.ir" className="bg-luko-teal text-white h-8 w-8 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </Link>
              <Link to="#" className="bg-luko-teal text-white h-8 w-8 rounded-full flex items-center justify-center">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </Link>
              <Link to="#" className="bg-luko-teal text-white h-8 w-8 rounded-full flex items-center justify-center">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
