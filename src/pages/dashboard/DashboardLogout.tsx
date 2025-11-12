import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { removeItem } from "@/services/common/storage.service";

const DashboardLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    removeItem("token");
    removeItem("userId");


    navigate("/auth/login", { replace: true });
  }, [navigate]);

  return null; 
};

export default DashboardLogout;
