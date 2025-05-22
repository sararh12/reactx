import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { GetMyComments, GetNewsComments } from "@/services/api/comment/commentService";
import { makeDatePersian } from "@/utils/persianDates";

const DashboardComments: React.FC = () => {
  const { toast } = useToast();
  const [GetComment, SetGetComment] = useState([]);
  const [GetCommentBlog, SetGetCommentBlog] = useState([]);
  

  async function GetMyNewsComments() {

    const callApi=await GetNewsComments();

    console.log(callApi);

    SetGetCommentBlog(callApi?.data?.myNewsCommetDtos)
    
  }

  async function GetComments() {
    const callApi = await GetMyComments();

    console.log(callApi);

    SetGetComment(callApi?.data?.myCommentsDtos);
  }

  useEffect(() => {
    GetComments();
    GetMyNewsComments()
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">دیدگاه های دوره</h1>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">نام دوره</TableHead>
              <TableHead className="text-right">دیدگاه</TableHead>
              <TableHead className="text-right">تاریخ ثبت</TableHead>
              <TableHead className="text-right">وضعیت</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {GetComment.map((comment) => (
              <TableRow key={comment.commentId}>
                <TableCell>{comment.courseTitle}</TableCell>
                <TableCell>
                  <div className="max-w-xs truncate">{comment.title}</div>
                </TableCell>
                <TableCell>{makeDatePersian(comment.insertDate)}</TableCell>
                <TableCell>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      comment.accept
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {comment.accept ? "تایید شده" : "درانتظار تایید"}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* blog commwnt */}

      <h1 className="text-2xl font-bold mb-6 mt-10">دیدگاه های اخبار</h1>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">نام دوره</TableHead>
              <TableHead className="text-right">دیدگاه</TableHead>
              <TableHead className="text-right">تاریخ ثبت</TableHead>
              <TableHead className="text-right">وضعیت</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {GetCommentBlog.map((comment) => (
              <TableRow key={comment.commentId}>
                <TableCell>{comment.courseTitle}</TableCell>
                <TableCell>
                  <div className="max-w-xs truncate">{comment.title}</div>
                </TableCell>
                <TableCell>{makeDatePersian(comment.insertDate)}</TableCell>
                <TableCell>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      comment.accept
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {comment.accept ? "تایید شده" : "درانتظار تایید"}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DashboardComments;
