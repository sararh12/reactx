import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { UserPen } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import Logo from '@/components/Logo';

const UserProfile: React.FC = () => {
  const [user, setUser] = useState({
    name: 'فلان فلانی',
    fullName: 'فلان فلانی زاده فلان آبادی',
    avatar: 'lovable-uploads/ostad.png',
    email: 'folani99@gmail.com',
    phone: '09123456789',
    birthDate: '1380/05/11',
    gender: 'مرد',
    address: 'مازندران - ساری - خیابان فرح آباد - خیابان دانشجویان - ساختمان مرجان 10 - واحد 15',
    nationalCode: '---',
    about: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد'
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(formData);
    setIsDialogOpen(false);
    toast({
      title: "پروفایل با موفقیت بروزرسانی شد",
      description: "تغییرات شما با موفقیت ذخیره شد",
    });
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        avatar: imageUrl
      }));
      
      toast({
        title: "عکس پروفایل آپلود شد",
        description: "عکس جدید با موفقیت آپلود شد",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex rtl">
      <div className="bg-luko-teal text-white w-80 py-6 hidden lg:block">
        <div className="p-6 flex flex-col items-center">
          <img 
            src={user.avatar}
            alt={user.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-white"
          />
          <h2 className="text-xl font-bold mt-4">{user.name} خوش آمدید</h2>
        </div>
        
        <nav className="p-6 space-y-2">
          <div className="flex items-center py-3 px-4 bg-white text-luko-teal rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>اطلاعات کاربری</span>
          </div>
          <Link to="/my-courses" className="flex items-center py-3 px-4 hover:bg-luko-teal/20 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>دوره های من</span>
          </Link>
          <Link to="/purchased-courses" className="flex items-center py-3 px-4 hover:bg-luko-teal/20 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>دوره های رزرو شده</span>
          </Link>
          <Link to="/comments" className="flex items-center py-3 px-4 hover:bg-luko-teal/20 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            <span>دیدگاه های من</span>
          </Link>
          <Link to="/favorites" className="flex items-center py-3 px-4 hover:bg-luko-teal/20 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>علاقه مندی ها</span>
          </Link>
          <Link to="/security" className="flex items-center py-3 px-4 hover:bg-luko-teal/20 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h10M12 15l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span>تنظیمات امنیتی</span>
          </Link>
          <div className="border-t border-luko-teal/20 pt-2 mt-2">
            <Link to="/logout" className="flex items-center py-3 px-4 hover:bg-luko-teal/20 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span>خروج از حساب</span>
            </Link>
          </div>
        </nav>
      </div>
      
      <div className="flex-1 flex flex-col">
        <header className="bg-white p-4 shadow-sm flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="block">
              <Logo />
            </Link>
          </div>
          
          <div className="flex items-center space-x-4 space-x-reverse">
            <Link to="/notifications" className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </Link>
            
            <Link to="/cart" className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute top-0 right-0 h-4 w-4 bg-orange-500 rounded-full text-xs text-white flex items-center justify-center">
                1
              </span>
            </Link>
            
            <Link to="/dashboard" className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </Link>
            
            <Link to="/" className="text-luko-teal">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </Link>
          </div>
        </header>
        
        <main className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b">
              <h1 className="text-2xl font-bold">اطلاعات کاربری</h1>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 lg:w-1/4 mb-6 md:mb-0">
                  <div className="flex flex-col items-center">
                    <div 
                      className="relative group cursor-pointer"
                      onClick={handlePhotoClick}
                    >
                      <img 
                        src={formData.avatar}
                        alt={user.name}
                        className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 transition-opacity group-hover:opacity-75"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-black bg-opacity-50 rounded-full p-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <Button 
                      variant="outline" 
                      className="mt-4 text-luko-teal border-luko-teal hover:bg-luko-teal/10"
                      onClick={() => setIsDialogOpen(true)}
                    >
                      <UserPen className="ml-2 h-4 w-4" />
                      ویرایش
                    </Button>
                  </div>
                </div>
                
                <div className="md:w-2/3 lg:w-3/4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="mb-4">
                        <div className="text-gray-500 mb-1">نام و نام خانوادگی :</div>
                        <div className="font-bold text-orange-500">{user.fullName}</div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-gray-500 mb-1">شماره همراه :</div>
                        <div className="font-bold">{user.phone}</div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-gray-500 mb-1">ایمیل :</div>
                        <div className="font-bold">{user.email}</div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-gray-500 mb-1">کد ملی :</div>
                        <div className="font-bold">{user.nationalCode}</div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-gray-500 mb-1">جنسیت :</div>
                        <div className="font-bold">{user.gender}</div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-gray-500 mb-1">تاریخ تولد :</div>
                        <div className="font-bold">{user.birthDate}</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="mb-4">
                        <div className="text-gray-500 mb-1">آدرس :</div>
                        <div className="font-bold">{user.address}</div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-gray-500 mb-1">طول جغرافیایی :</div>
                        <div className="font-bold">--</div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-gray-500 mb-1">عرض جغرافیایی :</div>
                        <div className="font-bold">--</div>
                      </div>
                      
                      <div className="border rounded-lg p-2 mb-4">
                        <div className="bg-gray-200 h-32 rounded-lg flex items-center justify-center">
                          <img 
                            src="lovable-uploads/ad3a9984-7970-4325-a9f0-a4a2a8f9033a.png"
                            alt="Map location"
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="text-gray-500 mb-1">درباره من :</div>
                    <div className="text-gray-700 border p-4 rounded-lg">
                      {user.about}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-left">
                <Button 
                  className="bg-luko-teal hover:bg-luko-teal/90"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <UserPen className="ml-2 h-4 w-4" />
                  ویرایش
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] rtl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">ویرایش اطلاعات شخصی</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="col-span-1">
                <Label htmlFor="fullName" className="mb-2 block">نام و نام خانوادگی</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>
              
              <div className="col-span-1">
                <Label htmlFor="phone" className="mb-2 block">شماره همراه</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>
              
              <div className="col-span-1">
                <Label htmlFor="email" className="mb-2 block">ایمیل</Label>
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>
              
              <div className="col-span-1">
                <Label htmlFor="nationalCode" className="mb-2 block">کد ملی</Label>
                <Input
                  id="nationalCode"
                  name="nationalCode"
                  value={formData.nationalCode}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>
              
              <div className="col-span-1">
                <Label htmlFor="gender" className="mb-2 block">جنسیت</Label>
                <Input
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>
              
              <div className="col-span-1">
                <Label htmlFor="birthDate" className="mb-2 block">تاریخ تولد</Label>
                <Input
                  id="birthDate"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>
              
              <div className="col-span-2">
                <Label htmlFor="address" className="mb-2 block">آدرس</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>
              
              <div className="col-span-2">
                <Label htmlFor="about" className="mb-2 block">درباره من</Label>
                <Textarea
                  id="about"
                  name="about"
                  value={formData.about}
                  onChange={handleInputChange}
                  className="w-full"
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
                className="ml-2"
              >
                انصراف
              </Button>
              <Button type="submit" className="bg-luko-teal hover:bg-luko-teal/90">
                ذخیره تغییرات
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserProfile;
