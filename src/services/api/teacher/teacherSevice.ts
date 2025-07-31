import axios from "axios";
// import http from "../../interceptor/interceptor";

export async function getTeacherDetail(teacherId: number) {
  const result = await axios.get(
    `https://sepehracademy.liara.run/Home/GetTeacherDetails?TeacherId=${teacherId}`
  );
  return result?.data;
}
