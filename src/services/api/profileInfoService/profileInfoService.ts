import axios from "axios";
import http from "../../interceptor/interceptor";
import OnSetFormData from "@/utils/form-data";
import { Value } from "@radix-ui/react-select";

const API_BASE_URL = "https://classapi.sepehracademy.ir/api";

export async function getUserProfile() {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Authentication token not found in localStorage.");
      throw new Error("Authentication token not found. Please log in.");
    }

    const response = await axios.get(
      `${API_BASE_URL}/SharePanel/GetProfileInfo`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error(
          "Unauthorized: Session may have expired. Please log in again."
        );
      }
      throw new Error(
        error.response?.data?.message || "Failed to fetch user profile data."
      );
    }
    throw new Error(
      "An unexpected error occurred while fetching user profile."
    );
  }
}

interface UpdateUserProfileData {
  LName?: string;
  FName?: string;
  UserAbout?: string;
  LinkdinProfile?: string;
  TelegramLink?: string;
  ReceiveMessageEvent?: boolean;
  HomeAdderess?: string;
  NationalCode?: string;
  Gender?: boolean;
  BirthDay?: string;
  Latitude?: string;
  Longitude?: string;
}


// get current profile info

export async function GetMyProfile() {
  const res = await http.get(`/SharePanel/GetProfileInfo`);

  return res;
}


// change password

export async function Changepassword(oldPassword:string,newPassword:string) {

  const res=await http.post(`/SharePanel/ChangePassword`,
  {oldPassword:oldPassword,newPassword:newPassword}
  );

  return res;
  
}

//EditSecurity

export async function EditSecurity(
  value
) {
  const res = await http.put(`/SharePanel/EditSecurity`, value);

  return res;
}

// update profile info

export async function UpdateProfileInfo(value) {

  const res=await http.put(`/SharePanel/UpdateProfileInfo`,
  value
  )

  return res;

}

// add profile pic

export async function AddProfileImage(value: File) {
  const formData = OnSetFormData({
    formFile: value,
  });

  const res = await http.post(`/SharePanel/AddProfileImage`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res;
}


// delete profile pic

export async function DeleteProfileImage(imageId: string) {
  const formData = OnSetFormData({
    DeleteEntityId: imageId,
  });

  const res = await http.delete(`SharePanel/DeleteProfileImage`, {
    data: formData, 
    headers: {
      "Content-Type": "multipart/form-data", 
    },
  });

  return res;
}

// select profile pic

export async function SelectProfileImage(formData: FormData) {


  const res = await http.post(`/SharePanel/SelectProfileImage`, formData);

  return res;
}