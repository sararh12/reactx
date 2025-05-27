import { Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Bookmark,
  MessageSquare,
  Settings,
  LogOut,
  Heart,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Logo from "../../Logo";
import { GetMyProfile } from "@/services/api/profileInfoService/profileInfoService";

const PanelLayout = ({ activeTab = "/panel/dashboard" }) => {
  const [profileInfo, setProfileInfo] = useState();
  async function GetProfileInfo() {
    try {
      const callApi = await GetMyProfile();
      setProfileInfo(callApi?.data);
    } catch (error) {
      console.log(error);
    }

  }

  console.log(profileInfo);

  useEffect(() => {
    GetProfileInfo();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex rtl">
      {/* Sidebar */}
      <div className="w-72 bg-[#00D0B9] text-white flex flex-col fixed h-full">
        <div className="p-4 flex flex-col items-center">
          <Avatar className="w-24 h-24 border-4 border-white">
           <AvatarImage src={profileInfo?.currentPictureAddress} alt="profile image" /> 
            {/* // <AvatarFallback>{user.name[0]}</AvatarFallback>  */}
          </Avatar>
          {/* <h2 className="text-xl font-bold mt-4">{user.name} خوش آمدید</h2> */}
        </div>

        <nav className="flex-1 px-4 mt-6">
          <Link
            to="dashboard"
            className={`flex items-center py-3 px-4 rounded-md mb-2 ${
              activeTab === "dashboard"
                ? "bg-white text-[#00D0B9]"
                : "text-white hover:bg-white/10"
            }`}
          >
            <Home className="ml-3 h-5 w-5" />
            <span>داشبورد</span>
          </Link>

          <Link
            to="/panel/profile"
            className={`flex items-center py-3 px-4 rounded-md mb-2 ${
              activeTab === "profile"
                ? "bg-white text-[#00D0B9]"
                : "text-white hover:bg-white/10"
            }`}
          >
            <Home className="ml-3 h-5 w-5" />
            <span>اطلاعات کاربری</span>
          </Link>

          <Link
            to="/panel/dashboard/courses"
            className={`flex items-center py-3 px-4 rounded-md mb-2 ${
              activeTab === "courses"
                ? "bg-white text-[#00D0B9]"
                : "text-white hover:bg-white/10"
            }`}
          >
            <Bookmark className="ml-3 h-5 w-5" />
            <span>دوره های من</span>
          </Link>

          <Link
            to="/panel/dashboard/reserved"
            className={`flex items-center py-3 px-4 rounded-md mb-2 ${
              activeTab === "reserved"
                ? "bg-white text-[#00D0B9]"
                : "text-white hover:bg-white/10"
            }`}
          >
            <Bookmark className="ml-3 h-5 w-5" />
            <span>دوره های رزرو شده</span>
          </Link>

          <Link
            to="/panel/dashboard/favorites"
            className={`flex items-center py-3 px-4 rounded-md mb-2 ${
              activeTab === "favorites"
                ? "bg-white text-[#00D0B9]"
                : "text-white hover:bg-white/10"
            }`}
          >
            <Heart className="ml-3 h-5 w-5" />
            <span>دوره های مورد علاقه</span>
          </Link>

          <Link
          to="/panel/dashboard/favoriteNews"
          className={`flex items-center py-3 px-4 rounded-md mb-2 ${
            activeTab === "favoriteNews"
              ? "bg-white text-[#00D0B9]"
              : "text-white hover:bg-white/10"
          }`}
          >
          <Heart className="ml-3 h-5 w-5" />
          <span> اخبار مورد علاقه</span>
          </Link>

          <Link
            to="/panel/dashboard/comments"
            className={`flex items-center py-3 px-4 rounded-md mb-2 ${
              activeTab === "comments"
                ? "bg-white text-[#00D0B9]"
                : "text-white hover:bg-white/10"
            }`}
          >
            <MessageSquare className="ml-3 h-5 w-5" />
            <span>دیدگاه های من</span>
          </Link>

          <Link
            to="/panel/dashboard/security"
            className={`flex items-center py-3 px-4 rounded-md mb-2 ${
              activeTab === "security"
                ? "bg-white text-[#00D0B9]"
                : "text-white hover:bg-white/10"
            }`}
          >
            <Settings className="ml-3 h-5 w-5" />
            <span>تنظیمات امنیتی</span>
          </Link>

          <div className="mt-auto border-t border-white/20 pt-4 mb-8">
            <Link
              to="/panel/logout"
              className="flex items-center py-3 px-4 rounded-md text-white hover:bg-white/10"
            >
              <LogOut className="ml-3 h-5 w-5" />
              <span>خروج از حساب</span>
            </Link>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 mr-72">
        <header className="bg-white p-4 shadow-sm flex justify-between items-center">
          <Link to="/">
            <Logo />
          </Link>
          <div>
            <span>
              {profileInfo?.fName} {profileInfo?.lName}
            </span>
          </div>
        </header>

        <main className="p-6">
          <div className="bg-white rounded-lg shadow-sm">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default PanelLayout;
