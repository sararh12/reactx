import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "./use-toast";
import {
  AddCourseDislike,
  AddCourseLike,
  AddCourseReserve,
  AddFavoriteCourses,
  RateCourse,
} from "@/services/api/course/courseService";
import { getTeacherDetail } from "@/services/api/teacher/teacherSevice";
import axios from "axios";
import http from "@/services/interceptor/interceptor";

interface Comment {
  id: string;
  courseId: string;
  parentId?: string | null;
  currentUserLikeId?: string | null;
  inserDate: string;
  title: string;
  describe: string;
  likeCount: number;
  dissLikeCount: number;
  replyCount: number;
  currentUserIsLike: boolean;
  currentUserIsDissLike: boolean;
  autor: string;
  pictureAddress?: string | null;
}

interface Teacher {
  pictureAddress?: string;
  fullName?: string;
  linkdinProfileLink: string;
  courseCounts: number;
  newsCount: number;
  histories: [];
  skills: [];
  teacherId: number;
}

interface CourseDetailData {
  courseId: string;
  title: string;
  subTitle?: string;
  describe: string;
  teacherName: string;
  teacherId: number;
  cost: number;
  capacity: number;
  imageAddress: string | null;
  isUserFavorite: boolean;
  isCourseReseve: number;
  currentUserLike: string;
  currentUserDissLike: string;
  miniDescribe: string;
  sections: {
    id: string;
    title: string;
    lessons: number;
    duration: string;
  }[];

  courseRate?: number;
  currentRegistrants?: number;
  commentsCount?: number;
}
export default function useCourseDetails() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [courseData, setCourseData] = React.useState<CourseDetailData | null>(
    null
  );
  const [courseComments, setCourseComments] = React.useState<Comment[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [loadingComments, setLoadingComments] = React.useState(true);
  const [teacherState, setTeacher] = useState<Teacher>();
  const [AddFavorite, setAddFavorite] = useState(false);
  const [AddLike, setAddLike] = useState(false);
  const [AddDisike, setAddDislike] = useState(false);
  const [rate, setRate] = useState(0);
  console.log(rate);
  console.log(courseData?.imageAddress);

  async function handleRating(value) {
    try {
      const callApi = await RateCourse(id, value);
      if (callApi?.data?.success) toast({ title: `${callApi?.data?.message}` });
    } catch (error) {
      console.log(error);
    }
  }

  async function AddDislikeForCourse(CourseId) {
    const callApi = await AddCourseDislike(courseData?.courseId);

    console.log(callApi?.data);

    setAddDislike(callApi?.data);
  }

  async function handleDislike(courseId: string) {
    try {
      const callApi = await AddCourseDislike(courseId);
      toast({ title: callApi?.data.message });
      console.log(callApi);
    } catch (error) {
      console.log(error);
    }
  }

  async function AddLikeForCourse(CourseId) {
    const callApi = await AddCourseLike(courseData?.courseId);

    console.log(callApi?.data);

    setAddLike(callApi?.data);
  }

  async function handleLike(courseId: string) {
    try {
      const callApi = await AddCourseLike(courseId);
      toast({ title: callApi?.data.message });
      console.log(callApi);
    } catch (error) {
      console.log(error);
    }
  }

  async function AddFavCourse() {
    const callApi = await AddFavoriteCourses(courseData?.courseId);

    console.log(callApi?.data);

    setAddFavorite(callApi?.data);
  }



  async function handleReserve(courseId: string) {
    try {
      const callApi = await AddCourseReserve(courseId);
      toast({ title: callApi?.data.message });
      console.log(callApi);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAddFavorite(courseId: string) {
    try {
      const callApi = await AddFavoriteCourses(courseId);
      toast({ title: callApi?.data.message });
      console.log(callApi);
    } catch (error) {
      console.log(error);
    }
  }

  const teacherDetail = async (teacherId: number) => {
    const callApi = await getTeacherDetail(teacherId);
    setTeacher(callApi);
  };

  const fetchCourseComments = async () => {
    if (!id) return;
    setLoadingComments(true);
    try {
      const response = await axios.get<Comment[]>(
        `https://sepehracademy.liara.run/Course/GetCourseCommnets/${id}`
      );
      setCourseComments(response.data || []);
    } catch (error) {
      console.error("Error fetching course comments:", error);
      setCourseComments([]);
      toast({
        title: "خطا در دریافت نظرات دوره",
        description: "لطفا دوباره تلاش کنید.",
        variant: "destructive",
      });
    } finally {
      setLoadingComments(false);
    }
  };

  const fetchCourseDetails = async () => {
    if (!id) {
      console.error("Course ID is missing");
      setLoading(false);
      setCourseData(null);
      setCourseComments([]);
      return;
    }
    setLoading(true);
    try {
      const response = await http.get(`Home/GetCourseDetails?CourseId=${id}`);
      if (!response.data) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setRate(response?.data?.currentUserRateNumber);
      setCourseData(response.data as CourseDetailData);
      fetchCourseComments();
      console.log(response?.data?.teacherId);
      teacherDetail(response?.data?.teacherId);
    } catch (error) {
      console.error("Error fetching course details:", error);
      setCourseData(null);
      toast({
        title: "خطا در دریافت اطلاعات دوره",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchCourseDetails();
  }, [id]);

  const refetchDataAndComments = async () => {
    if (!id) return;
    setLoading(true);
    setLoadingComments(true);
    try {
      const detailsResponse = await fetch(
        `https://sepehracademy.liara.run/Home/GetCourseDetails?CourseId=${id}`
      );
      if (!detailsResponse.ok) {
        throw new Error(
          `HTTP error fetching details: ${detailsResponse.status}`
        );
      }
      const detailsData = await detailsResponse.json();
      setCourseData(detailsData as CourseDetailData);

      const commentsResponse = await axios.get<Comment[]>(
        `https://sepehracademy.liara.run/Course/GetCourseCommnets/${id}`
      );
      setCourseComments(commentsResponse.data || []);

      toast({ title: "اطلاعات دوره و نظرات به‌روزرسانی شد" });
    } catch (error) {
      console.error("Error refetching course data and comments:", error);
      toast({
        title: "خطا در به‌روزرسانی اطلاعات",
        description: "لطفا دوباره تلاش کنید.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setLoadingComments(false);
    }
  };

  const commentEndpoints = {
    createComment: `https://sepehracademy.liara.run/Course/AddCommentCourse`,
    likeComment: (commentId: string) =>
      `https://sepehracademy.liara.run/Course/AddCourseCommentLike?CourseCommandId=${commentId}`,
    dislikeComment: (commentId: string) =>
      `https://sepehracademy.liara.run/Course/AddCourseCommentDissLike?CourseCommandId=${commentId}`,
    deleteCommentLike: `https://classapi.sepehracademy.ir/api/Course/DeleteCourseCommentLike`,
    getReplies: (commentId: string) =>
      `https://sepehracademy.liara.run/Course/GetRepliesCourseComments?Id=${commentId}`,
    createReplyComment: `https://sepehracademy.liara.run/Course/AddReplyCourseComment`,
  };

  const teacher = courseData?.teacherName;
  return {
    courseData,
    handleRating,
    toast,
    courseComments,
    loading,
    loadingComments,
    teacherState,
    AddFavorite,
    AddLike,
    AddDisike,
    rate,
    AddDislikeForCourse,
    handleDislike,
    AddLikeForCourse,
    handleLike,
    AddFavCourse,
    handleReserve,
    handleAddFavorite,
    refetchDataAndComments,
    commentEndpoints,
    teacher,
  };
}
