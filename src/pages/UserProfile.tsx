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
  GetMyProfile,
  getUserProfile,
  UpdateProfileInfo,
} from "@/services/api/profileInfoService/profileInfoService";
import { makeDatePersian } from "@/utils/persianDates";
import { Formik, Form, Field } from 'formik';
import OnSetFormData from "@/utils/form-data";

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
        const {data} = await GetMyProfile();
        if (!data) {
          setLoading(false);
          throw new Error("User profile not found");
        }
        setUser(data);
        setFormData(data);
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

    const formData= OnSetFormData(e)
    try{
      const result=await UpdateProfileInfo(formData)
      if(result.data.success){
        toast({title:result.data.message})
      }
      console.log(result.data);
    }
    catch(error){
      console.log(error);
    }
    

   

  }

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
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b">
              <h1 className="text-2xl font-bold">اطلاعات کاربری</h1>
            </div>

            <div className="p-6">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 lg:w-1/4 mb-6 md:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="relative group cursor-pointer">
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
                          {user?.fName	} {user?.lName	}
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
                        <div className="font-bold">{user?.nationalCode	}</div>
                      </div>

                      <div className="mb-4">
                        <div className="text-gray-500 mb-1">جنسیت :</div>
                        <div className="font-bold">
                          {user?.Gender === undefined
                            ? ""
                            : String(user.gender)}
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="text-gray-500 mb-1">تاریخ تولد :</div>
                        <div className="font-bold">{makeDatePersian(user?.birthDay)	}</div>
                      </div>
                    </div>

                    <div>
                      <div className="mb-4">
                        <div className="text-gray-500 mb-1">آدرس :</div>
                        <div className="font-bold">{user?.homeAdderess}</div>
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
                      {user?.userAbout	}
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
          <Formik
          initialValues={
            {
              FName:user?.fName,
              LName:user?.lName,
              phoneNumber:user?.phoneNumber,
              email:user?.email,
              LinkdinProfile:user?.linkdinProfile,
              TelegramLink:user?.telegramLink,
              NationalCode:user?.nationalCode,
              Gender:user?.gender,
              BirthDay:user?.birthDay,
              Latitude:user?.latitude,
              Longitude:user?.longitude,
              HomeAdderess:user?.homeAdderess,
              UserAbout:user?.userAbout,

            }
          }
          onSubmit={(value)=>{handleSubmit(value)}}
          >
          <Form >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="col-span-1">
                <Label htmlFor="FName" className="mb-2 block">
                  نام
                </Label>
                <Field
                  id="FName"
                  name="FName"
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="LName" className="mb-2 block">
                  نام خانوادگی
                </Label>
                <Field
                  id="LName"
                  name="LName"
                  className="w-full"
                />
              </div>

              <div className="col-span-1">
                <Label htmlFor="phoneNumber" className="mb-2 block">
                  شماره همراه
                </Label>
                <Field
                  id="phoneNumber"
                  name="phoneNumber"
                  className="w-full"
                />
              </div>

              <div className="col-span-1">
                <Label htmlFor="email" className="mb-2 block">
                  ایمیل
                </Label>
                <Field
                  id="email"
                  name="email"
                  className="w-full"
                />
              </div>
              <div className="col-span-1">
                <Label htmlFor="LinkdinProfile" className="mb-2 block">
                  پروفایل لینکدین
                </Label>
                <Field
                  id="LinkdinProfile"
                  name="LinkdinProfile"
                  className="w-full"
                />
              </div>
              <div className="col-span-1">
                <Label htmlFor="TelegramLink" className="mb-2 block">
                  پروفایل تلگرام
                </Label>
                <Field
                  id="TelegramLink"
                  name="TelegramLink"
                  className="w-full"
                />
              </div>

              <div className="col-span-1">
                <Label htmlFor="NationalCode" className="mb-2 block">
                  کد ملی
                </Label>
                <Field
                  id="NationalCode"
                  name="NationalCode"
                  className="w-full"
                />
              </div>

              <div className="col-span-1">
                <Label htmlFor="Gender" className="mb-2 block">
                  جنسیت
                </Label>
                <Field
                  id="Gender"
                  name="Gender"
                 
                  className="w-full"
                  placeholder="true یا false"
                />
              </div>

              <div className="col-span-1">
                <Label htmlFor="BirthDay" className="mb-2 block">
                  تاریخ تولد
                </Label>
                <Field
                  id="BirthDay"
                  name="BirthDay"
                  className="w-full"
                  placeholder="YYYY-MM-DD"
                />
              </div>
              <div className="col-span-1">
                <Label htmlFor="Latitude" className="mb-2 block">
                  عرض جغرافیایی
                </Label>
                <Field
                  id="Latitude"
                  name="Latitude"
                  className="w-full"
                />
              </div>
              <div className="col-span-1">
                <Label htmlFor="Longitude" className="mb-2 block">
                  طول جغرافیایی
                </Label>
                <Field
                  id="Longitude"
                  name="Longitude"
                  className="w-full"
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="HomeAdderess" className="mb-2 block">
                  آدرس
                </Label>
                <Field
                  id="HomeAdderess"
                  name="HomeAdderess"
                  className="w-full"
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="userAbout" className="mb-2 block">
                  درباره من
                </Label>
                <Field
                  id="UserAbout"
                  name="UserAbout"
                  className="w-full"
                  rows={4}
                  as="textarea"
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
              <Button
                type="submit"
                className="bg-luko-teal hover:bg-luko-teal/90"
              >
                ذخیره تغییرات
              </Button>
            </DialogFooter>
          </Form>
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserProfile;
