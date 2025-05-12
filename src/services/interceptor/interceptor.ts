import axios from "axios";
import { getItem, removeItem } from "../common/storage.service";
import toast from "react-hot-toast";

const baseURL = import.meta.env.VITE_BASE_URL;
const notifyError = (err: any) => toast.error(err);
const instance = axios.create({
  baseURL: baseURL,
});

const onSuccess = (response: any) => {
  return response.data;
};

const onError = (err: any) => {
  console.log(err);
  if (err.status === 401) {
    removeItem("token");
    toast.error("First Logged in into your account!");
  }

  if (
    err.response.status >= 400 &&
    err.response.status < 500 &&
    err.response.status != 401
  ) {
    {
      err.response.data.ErrorMessage[0]
        ? notifyError(err.response.data.ErrorMessage[0])
        : notifyError(err.message);
    }
  }
  return Promise.reject(err);
};

instance.interceptors.response.use(onSuccess, onError);

instance.interceptors.request.use((opt) => {
  const token = getItem("token");
  if (token) opt.headers.Authorization = "Bearer " + token;
  return opt;
});

export default instance;
