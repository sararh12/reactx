import axios from "axios";
// import http from "../../interceptor/interceptor";

export async function getTeacherDetail(teacherId: number) {
  const result = await axios.get(
    `https://classapi.sepehracademy.ir/api/Home/GetTeacherDetails?TeacherId=${teacherId}`
  );
  return result?.data;
}
