import { Outlet, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  Home,
  Bookmark,
  MessageSquare,
  Settings,
  LogOut,
  Heart,
  X,
  Menu,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Logo from "../../Logo";
import { GetMyProfile } from "@/services/api/profileInfoService/profileInfoService";

const PanelLayout = ({ activeTab = "/panel/dashboard" }) => {
  const [profileInfo, setProfileInfo] = useState();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { path: "dashboard", icon: Home, label: "داشبورد" },
    { path: "profile", icon: Home, label: "اطلاعات کاربری" },
    { path: "courses", icon: Bookmark, label: "دوره های من" },
    { path: "reserved", icon: Bookmark, label: "دوره های رزرو شده" },
    { path: "favorites", icon: Heart, label: "دوره های مورد علاقه" },
    { path: "favoriteNews", icon: Heart, label: "اخبار مورد علاقه" },
    { path: "comments", icon: MessageSquare, label: "دیدگاه های من" },
    { path: "security", icon: Settings, label: "تنظیمات امنیتی" },
  ];

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      try {
        const res = await GetMyProfile();
        if (isMounted) setProfileInfo(res?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const renderMenuLinks = (isMobile = false) =>
    menuItems.map((item) => {
      // مسیر درست بساز
      const path =
        item.path === "profile" ? "/panel/profile" : `/panel/${item.path}`;

      return (
        <Link
          key={item.path}
          to={path}
          className={`flex items-center py-3 px-4 rounded-md mb-2 ${
            activeTab.endsWith(item.path)
              ? "bg-white text-[#00D0B9]"
              : "text-white hover:bg-white/10"
          }`}
          onClick={() => isMobile && setMobileMenuOpen(false)}
        >
          <item.icon className="ml-3 h-5 w-5" />
          <span>{item.label}</span>
        </Link>
      );
    });


  return (
    <div className="min-h-screen bg-gray-50 flex rtl">
      {/* Sidebar دسکتاپ */}
      <div className="hidden md:flex fixed h-full bg-[#00D0B9] text-white flex-col w-72">
        <div className="p-4 flex flex-col items-center">
          <Avatar className="w-24 h-24 border-4 border-white">
            <AvatarImage
              src={profileInfo?.currentPictureAddress}
              alt="profile image"
            />
            <AvatarFallback>{profileInfo?.fName?.[0] || "U"}</AvatarFallback>
          </Avatar>
        </div>
        <nav className="flex-1 px-4 mt-6">{renderMenuLinks()}</nav>
        <div className="mt-auto border-t border-white/20 pt-4 mb-8">
          <Link
            to="/panel/logout"
            className="flex items-center py-3 px-4 rounded-md text-white hover:bg-white/10"
          >
            <LogOut className="ml-3 h-5 w-5" />
            <span>خروج از حساب</span>
          </Link>
        </div>
      </div>

      {/* Overlay موبایل */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar موبایل */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-[#00D0B9] text-white flex flex-col z-20 transform transition-transform duration-300 md:hidden overflow-y-auto ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex flex-col items-center">
          <Avatar className="w-24 h-24 border-4 border-white">
            <AvatarImage
              src={profileInfo?.currentPictureAddress}
              alt="profile image"
            />
            <AvatarFallback>{profileInfo?.fName?.[0] || "U"}</AvatarFallback>
          </Avatar>
        </div>
        <nav className="flex-1 px-4 mt-6">{renderMenuLinks(true)}</nav>
        <div className="mt-auto border-t border-white/20 pt-4 mb-8">
          <Link
            to="/panel/logout"
            className="flex items-center py-3 px-4 rounded-md text-white hover:bg-white/10"
            onClick={() => setMobileMenuOpen(false)}
          >
            <LogOut className="ml-3 h-5 w-5" />
            <span>خروج از حساب</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:mr-72">
        <header className="bg-white p-4 shadow-sm flex justify-between items-center">
          <div className="flex items-center">
            <button
              className="md:hidden mr-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            <Link to="/">
              <Logo />
            </Link>
          </div>
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
