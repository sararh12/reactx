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
