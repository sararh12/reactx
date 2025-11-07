import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { toast } from "sonner";
import { getItem, removeItem } from "../common/storage.service";

interface AxiosErrorMessage {
  ErrorMessage: string[];
  status: number;
}

const baseURL: string = import.meta.env.VITE_BASE_URL;

const instance: AxiosInstance = axios.create({
  baseURL,
});

const onSuccess = (response: AxiosResponse) => response;

const onError = (err: AxiosError<AxiosErrorMessage>) => {
  const status = err.response?.status; // اصلاح: وضعیت HTTP واقعی

  if (status === 401) {
    removeItem("token");
    window.location.pathname = "/auth/login";
    toast.error("برای ادامه باید وارد شوید.");
  } else if (err.response?.data?.ErrorMessage) {
    err.response.data.ErrorMessage.forEach((errorMessage) => {
      toast.error(errorMessage);
    });
  } else {
    toast.error("مشکل غیر منتظره ای رخ داد !");
  }

  return Promise.reject(err); // حتما return
};

// اصلاح request interceptor
instance.interceptors.request.use((opt) => {
  const token = getItem("token");
  if (token) {
    if (!opt.headers) opt.headers = {};
    opt.headers.Authorization = "Bearer " + token;
  } else {
    // اگر token نیست، Authorization ارسال نشود
    if (opt.headers && "Authorization" in opt.headers) {
      delete opt.headers.Authorization;
    }
  }
  return opt;
});

instance.interceptors.response.use(onSuccess, onError);

export default instance;
