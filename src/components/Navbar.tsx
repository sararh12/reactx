
import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { Search, User, Menu, X, ShoppingCart, Bell } from 'lucide-react';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { 
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Badge } from '@/components/ui/badge';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);


  const notificationCount = 3;
  const cartCount = 2;

  const menuItems = [
    { to: "/courses", label: "دوره ها" },
    { to: "/panel/dashboard", label: "صفحه داشبورد" },
    { to: "/blog", label: "اخبار و مقالات" },
    { to: "/instructors", label: "اساتید" },
    { to: "/contact", label: "تماس با ما" },
  ];

  return (
    <header className="bg-white shadow-sm py-4 px-6 md:px-12 rtl">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="flex items-center">
          <Logo />
        </div>

        <nav className="hidden md:flex space-x-8 space-x-reverse">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative px-3 py-2 transition ${
                  isActive
                    ? "text-luko-teal font-bold after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[3px] after:bg-gradient-to-r after:from-orange-400 after:to-orange-600 after:rounded-full after:shadow-md"
                    : "text-gray-700 hover:text-luko-teal"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4 space-x-reverse">
          <NavLink to="/search">
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
          </NavLink>

          <NavLink to="/notifications">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Notifications"
              className="relative"
            >
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500">
                  {notificationCount}
                </Badge>
              )}
            </Button>
          </NavLink>


          <NavLink to="/auth/login">
            <Button className="bg-luko-teal hover:bg-luko-teal/90 text-white">
              <User className="h-4 w-4 mr-2 ml-2" />
              حساب کاربری
            </Button>
          </NavLink>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Drawer direction="right">
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-full p-6 rtl">
              <div className="flex flex-col space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <Logo />
                  <DrawerClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-6 w-6" />
                    </Button>
                  </DrawerClose>
                </div>

                <nav className="flex flex-col space-y-4">
                  {menuItems.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        `relative px-3 py-2 text-lg font-medium transition ${
                          isActive
                            ? "text-luko-teal font-bold after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[3px] after:bg-gradient-to-r after:from-orange-400 after:to-orange-600 after:rounded-full after:shadow-md"
                            : "text-gray-700 hover:text-luko-teal"
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </nav>

                <div className="flex flex-col space-y-4 pt-6">
                  <NavLink to="/search" className="w-full">
                    <Button variant="outline" className="w-full justify-start">
                      <Search className="h-5 w-5 ml-2" />
                      جستجو
                    </Button>
                  </NavLink>

                  <NavLink to="/notifications" className="w-full">
                    <Button variant="outline" className="w-full justify-start">
                      <Bell className="h-5 w-5 ml-2" />
                      اعلان‌ها
                      {notificationCount > 0 && (
                        <Badge className="mr-2 bg-red-500">
                          {notificationCount}
                        </Badge>
                      )}
                    </Button>
                  </NavLink>

                  <NavLink to="/cart" className="w-full">
                    <Button variant="outline" className="w-full justify-start">
                      <ShoppingCart className="h-5 w-5 ml-2" />
                      سبد خرید
                      {cartCount > 0 && (
                        <Badge className="mr-2 bg-orange-500">
                          {cartCount}
                        </Badge>
                      )}
                    </Button>
                  </NavLink>

                  <NavLink to="/auth/login" className="w-full">
                    <Button className="w-full bg-luko-teal hover:bg-luko-teal/90 text-white justify-start">
                      <User className="h-4 w-4 ml-2" />
                      حساب کاربری
                    </Button>
                  </NavLink>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
