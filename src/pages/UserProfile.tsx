import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { UserPen } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import Logo from "@/components/Logo";
import {
  getUserProfile,
  updateUserProfile,
} from "@/services/api/profileInfoService/profileInfoService";

interface UserProfileData {
  LName: string;
  FName: string;
  UserAbout: string;
  LinkdinProfile: string;
  TelegramLink: string;
  ReceiveMessageEvent?: boolean;
  HomeAdderess: string;
  NationalCode: string;
  Gender?: boolean; 
  BirthDay: string;
  Latitude: string;
  Longitude: string;
  userImage?: string;
  email: string;
  phoneNumber: string;
  name?: string;
  avatar?: string;

}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<UserProfileData | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const userProfile = await getUserProfile();
        if (!userProfile) {
          setLoading(false);
          throw new Error("User profile not found");
        }
        setUser(userProfile);
        setFormData(userProfile);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast({
          title: "خطا",
          description: "مشکلی در بارگذاری اطلاعات پروفایل پیش آمد",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (!prev) return null; 
      let processedValue: string | boolean = value;
      if (name === "Gender") {
        const lowerValue = value.toLowerCase();
        if (lowerValue === "true") {
          processedValue = true;
        } else if (lowerValue === "false") {
          processedValue = false;
        } else {
          processedValue = undefined;
        }
      }
      return {
        ...prev,
        [name]: processedValue,
      };
    });
  };

  const handleSwitchChange = (
    name: keyof UserProfileData,
    checked: boolean
  ) => {
    setFormData((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [name]: checked,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) {
      toast({
        title: "خطا",
        description: "اطلاعات فرم موجود نیست",
        variant: "destructive",
      });
      return;
    }

    console.log("Form submitted:", formData);
    setLoading(true);

    try {
      const profileUpdateData = {
        LName: formData.LName,
        FName: formData.FName,
        UserAbout: formData.UserAbout,
        LinkdinProfile: formData.LinkdinProfile,
        TelegramLink: formData.TelegramLink,
        ...(formData.ReceiveMessageEvent !== undefined && {
          ReceiveMessageEvent: formData.ReceiveMessageEvent,
        }),
        HomeAdderess: formData.HomeAdderess,
        NationalCode: formData.NationalCode,
        Gender: formData.Gender,
        BirthDay: formData.BirthDay,
        Latitude: formData.Latitude,
        Longitude: formData.Longitude,
      };

      const response = await updateUserProfile(profileUpdateData);
      console.log("Response:", response);

      const updatedUser = {
        ...user,
        ...formData,
        ...profileUpdateData,
      } as UserProfileData;
      setUser(updatedUser);
      setFormData(updatedUser);

      setIsDialogOpen(false);
      toast({
        title: "پروفایل با موفقیت بروزرسانی شد",
        description: "تغییرات شما با موفقیت ذخیره شد",
      });
    } catch (error) {
      console.error("Error updating user profile:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "مشکلی در بروزرسانی پروفایل پیش آمد";
      toast({
        title: "خطا",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false); 
    }
  };



  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        avatar: imageUrl,
      }));

      toast({
        title: "عکس پروفایل آپلود شد",
        description: "عکس جدید با موفقیت آپلود شد",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader">loading...</div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 flex rtl">
      <div className="bg-luko-teal text-white w-80 py-6 hidden lg:block">
        <div className="p-6 flex flex-col items-center">
          <img
            src={
              user?.userImage ||
              "lovable-uploads/ad3a9984-7970-4325-a9f0-a4a2a8f9033a.png"
            }
            alt={user?.FName || user?.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-white"
          />
          <h2 className="text-xl font-bold mt-4">{user?.FName} خوش آمدید</h2>
        </div>

        <nav className="p-6 space-y-2">
          <div className="flex items-center py-3 px-4 bg-white text-luko-teal rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>اطلاعات کاربری</span>
          </div>
          <Link
            to="/my-courses"
            className="flex items-center py-3 px-4 hover:bg-luko-teal/20 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <span>دوره های من</span>
          </Link>
          <Link
            to="/purchased-courses"
            className="flex items-center py-3 px-4 hover:bg-luko-teal/20 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span>دوره های رزرو شده</span>
          </Link>
          <Link
            to="/comments"
            className="flex items-center py-3 px-4 hover:bg-luko-teal/20 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            <span>دیدگاه های من</span>
          </Link>
          <Link
            to="/favorites"
            className="flex items-center py-3 px-4 hover:bg-luko-teal/20 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span>علاقه مندی ها</span>
          </Link>
          <Link
            to="/security"
            className="flex items-center py-3 px-4 hover:bg-luko-teal/20 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h10M12 15l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span>تنظیمات امنیتی</span>
          </Link>
          <div className="border-t border-luko-teal/20 pt-2 mt-2">
            <Link
              to="/logout"
              className="flex items-center py-3 px-4 hover:bg-luko-teal/20 rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </Link>

            <Link to="/cart" className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="absolute top-0 right-0 h-4 w-4 bg-orange-500 rounded-full text-xs text-white flex items-center justify-center">
                1
              </span>
            </Link>

            <Link to="/dashboard" className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </Link>

            <Link to="/" className="text-luko-teal">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
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
                    >
                      <img
                        src={
                          formData?.avatar ||
                          formData?.userImage ||
                          "lovable-uploads/ad3a9984-7970-4325-a9f0-a4a2a8f9033a.png"
                        }
                        alt={user?.FName || user?.name}
                        className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 transition-opacity group-hover:opacity-75"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-black bg-opacity-50 rounded-full p-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    {/* <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    /> */}
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
                        <div className="text-gray-500 mb-1">
                          نام و نام خانوادگی :
                        </div>
                        <div className="font-bold text-orange-500">
                          {user?.FName} {user?.LName}
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="text-gray-500 mb-1">شماره همراه :</div>
                        <div className="font-bold">{user?.phoneNumber}</div>
                      </div>

                      <div className="mb-4">
                        <div className="text-gray-500 mb-1">ایمیل :</div>
                        <div className="font-bold">{user?.email}</div>
                      </div>

                      <div className="mb-4">
                        <div className="text-gray-500 mb-1">کد ملی :</div>
                        <div className="font-bold">{user?.NationalCode}</div>
                      </div>

                      <div className="mb-4">
                        <div className="text-gray-500 mb-1">جنسیت :</div>
                        <div className="font-bold">
                          {user?.Gender === undefined
                            ? ""
                            : String(user.Gender)}
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="text-gray-500 mb-1">تاریخ تولد :</div>
                        <div className="font-bold">{user?.BirthDay}</div>
                      </div>
                    </div>

                    <div>
                      <div className="mb-4">
                        <div className="text-gray-500 mb-1">آدرس :</div>
                        <div className="font-bold">{user?.HomeAdderess}</div>
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
                      {user?.UserAbout}
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
            <DialogTitle className="text-lg font-bold">
              ویرایش اطلاعات شخصی
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="col-span-1">
                <Label htmlFor="FName" className="mb-2 block">
                  نام
                </Label>
                <Input
                  id="FName"
                  name="FName"
                  value={formData?.FName || ""}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="LName" className="mb-2 block">
                  نام خانوادگی
                </Label>
                <Input
                  id="LName"
                  name="LName"
                  value={formData?.LName || ""}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>

              <div className="col-span-1">
                <Label htmlFor="phoneNumber" className="mb-2 block">
                  شماره همراه
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData?.phoneNumber || ""}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>

              <div className="col-span-1">
                <Label htmlFor="email" className="mb-2 block">
                  ایمیل
                </Label>
                <Input
                  id="email"
                  name="email"
                  value={formData?.email || ""}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>
              <div className="col-span-1">
                <Label htmlFor="LinkdinProfile" className="mb-2 block">
                  پروفایل لینکدین
                </Label>
                <Input
                  id="LinkdinProfile"
                  name="LinkdinProfile"
                  value={formData?.LinkdinProfile || ""}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>
              <div className="col-span-1">
                <Label htmlFor="TelegramLink" className="mb-2 block">
                  پروفایل تلگرام
                </Label>
                <Input
                  id="TelegramLink"
                  name="TelegramLink"
                  value={formData?.TelegramLink || ""}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>

              <div className="col-span-1">
                <Label htmlFor="NationalCode" className="mb-2 block">
                  کد ملی
                </Label>
                <Input
                  id="NationalCode"
                  name="NationalCode"
                  value={formData?.NationalCode || ""}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>

              <div className="col-span-1">
                <Label htmlFor="Gender" className="mb-2 block">
                  جنسیت
                </Label>
                <Input
                  id="Gender"
                  name="Gender"
                  value={
                    formData?.Gender === undefined
                      ? ""
                      : formData.Gender === true
                      ? "true"
                      : "false"
                  }
                  onChange={handleInputChange}
                  className="w-full"
                  placeholder="true یا false" 
                />
              </div>

              <div className="col-span-1">
                <Label htmlFor="BirthDay" className="mb-2 block">
                  تاریخ تولد
                </Label>
                <Input
                  id="BirthDay"
                  name="BirthDay"
                  value={formData?.BirthDay || ""}
                  onChange={handleInputChange}
                  className="w-full"
                  placeholder="YYYY-MM-DD"
                />
              </div>
              <div className="col-span-1">
                <Label htmlFor="Latitude" className="mb-2 block">
                  عرض جغرافیایی
                </Label>
                <Input
                  id="Latitude"
                  name="Latitude"
                  value={formData?.Latitude || ""}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>
              <div className="col-span-1">
                <Label htmlFor="Longitude" className="mb-2 block">
                  طول جغرافیایی
                </Label>
                <Input
                  id="Longitude"
                  name="Longitude"
                  value={formData?.Longitude || ""}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="HomeAdderess" className="mb-2 block">
                  آدرس
                </Label>
                <Input
                  id="HomeAdderess"
                  name="HomeAdderess"
                  value={formData?.HomeAdderess || ""}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="userAbout" className="mb-2 block">
                  درباره من
                </Label>
                <Textarea
                  id="UserAbout"
                  name="UserAbout"
                  value={formData?.UserAbout || ""}
                  onChange={handleInputChange}
                  className="w-full"
                  rows={4}
                />
              </div>

              <div className="col-span-2 flex items-center space-x-2 rtl:space-x-reverse">
                <Switch
                  id="ReceiveMessageEvent"
                  name="ReceiveMessageEvent"
                  checked={formData?.ReceiveMessageEvent || false}
                  onCheckedChange={(checked) =>
                    handleSwitchChange("ReceiveMessageEvent", checked)
                  }
                />
                <Label htmlFor="ReceiveMessageEvent" className="mb-0">
                  دریافت پیام رویدادها
                </Label>
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
              <Button
                type="submit"
                className="bg-luko-teal hover:bg-luko-teal/90"
              >
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
