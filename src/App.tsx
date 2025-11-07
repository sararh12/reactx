import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CoursesPage from "./pages/CoursesPage";
import CourseDetail from "./pages/CourseDetail";
import BlogPage from "./pages/BlogPage";
import ArticleDetail from "./pages/ArticleDetail";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";
import DashboardCourses from "./pages/dashboard/DashboardCourses";
import DashboardReserved from "./pages/dashboard/DashboardReserved";
import DashboardComments from "./pages/dashboard/DashboardComments";
import DashboardSecurity from "./pages/dashboard/DashboardSecurity";
import DashboardFavorites from "./pages/dashboard/DashboardFavorites";
import DashboardFavoriteNews from "./pages/dashboard/DashboardFavoriteNews";
import PanelLayout from "./components/layout/dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<ArticleDetail />} />
          <Route path="/panel" element={<PanelLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="courses" element={<DashboardCourses />} />
            <Route path="reserved" element={<DashboardReserved />} />
            <Route path="comments" element={<DashboardComments />} />
            <Route path="security" element={<DashboardSecurity />} />
            <Route
              path="favorites"
              element={<DashboardFavorites />}
            />
             <Route
              path="favoriteNews"
              element={<DashboardFavoriteNews />}
            />
            <Route path="profile" element={<UserProfile />} />
          </Route>

          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
