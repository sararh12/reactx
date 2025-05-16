import axios from "axios";
import http from "../../interceptor/interceptor";

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

export async function updateUserProfile(profileData: UpdateUserProfileData) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authentication token not found. Please log in.");
    }

    const formData = new FormData();
    Object.entries(profileData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    const response = await axios.put(
      `${API_BASE_URL}/SharePanel/UpdateProfileInfo`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error(
          "Unauthorized: Session may have expired. Please log in again."
        );
      }
      throw new Error(
        error.response?.data?.message || "Failed to update user profile."
      );
    }
    throw new Error(
      "An unexpected error occurred while updating user profile."
    );
  }
}

// get current profile info

export async function GetMyProfile() {
  const res = await http.get(`/SharePanel/GetProfileInfo`);

  return res;
}
