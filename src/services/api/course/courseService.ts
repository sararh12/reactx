import http from "@/services/interceptor/interceptor";

export async function getTopCourse(Count: string) {
  const result = await http.get(`Home/GetCoursesTop?Count=${Count}`);

  return result;
}

// get course with id

export async function GetCourseWithId(courseId: string) {
  const res = await http.get(`Home/GetCourseDetails?CourseId=${courseId}`);

  return res;
}

// dashboard course table

export async function GetAllMyCourses() {
  const res = await http.get(
    `SharePanel/GetMyCourses?PageNumber=1&RowsOfPage=10&SortingCol=DESC&SortType=LastUpdate&Query=`
  );

  return res;
}

// dashboard reserved courses

export async function GetMyCoursesReserve() {
  const res = await http.get(`SharePanel/GetMyCoursesReserve`);

  return res;
}



// dashboard favorite course

export async function GetMyFavoriteCourses() {
  const res = await http.get(`SharePanel/GetMyFavoriteCourses`);

  return res;
}

// add favorite course

export async function AddFavoriteCourses(courseId: string) {
  const res = await http.post(`/Course/AddCourseFavorite`, {
    courseId: courseId,
  });

  return res;
}

// add course like

export async function AddCourseLike(CourseId: string) {
  const res = await http.post(`Course/AddCourseLike?CourseId=${CourseId}`);

  return res;
}
// add to reserve

export async function AddCourseReserve(courseId: string) {
  const res = await http.post(`CourseReserve/ReserveAdd`, {
    courseId: courseId,
  });

  return res;
}

// delete course favorite

export async function DeleteCourseFavorite(value) {
  console.log(value);
  const res = await http.delete(`Course/DeleteCourseFavorite`, { data: value });

  return res;
}

// delete reserved course

export async function DeleteCourseReserve(value) {
  console.log(value);
  const res = await http.delete(`/CourseReserve`, { data: value });

  return res;
}

// add course dislike

export async function AddCourseDislike(CourseId: string) {
  const res = await http.post(`/Course/AddCourseDissLike?CourseId=${CourseId}`);

  return res;
}

// rate

export async function RateCourse(cId, rate) {
  const res = await http.post(
    `/Course/SetCourseRating?CourseId=${cId}&RateNumber=${rate}`
  );

  return res;
}

// course payment

export async function CoursePayment(paymentData) {
  console.log(paymentData);

  const res = await http.post(`/CoursePayment/StudentAddPeyment`, paymentData);

  return res;
}

// course payment picture

export async function PaymentImage(paymentImageData) {

  console.log(paymentImageData);

  const res = await http.post(`/CoursePayment/StudentAddPeymentImage`,paymentImageData);

  return res;
  
}
