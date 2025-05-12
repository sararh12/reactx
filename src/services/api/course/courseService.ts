import axios from "axios";

export async function getTopCourse(Count: string) {
  const result = await axios.get(
    `https://classapi.sepehracademy.ir/api/Home/GetCoursesTop?Count=${Count}`
  );

  return result;
}

// get course with id

export async function GetCourseWithId(courseId: string) {
  const res = await axios.get(
    `https://classapi.sepehracademy.ir/api/Home/GetCourseDetails?CourseId=${courseId}`
  );

  return res;
}
