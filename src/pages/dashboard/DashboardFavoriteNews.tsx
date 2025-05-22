import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

import { useToast } from "@/hooks/use-toast";
import {
  DeleteFavoriteNews,
  GetBlogsById,
  GetMyFavoriteNews,
} from "@/services/api/blog/blogServices";
import { makeDatePersian } from "@/utils/persianDates";
import { Eye, Heart, HeartOff } from "lucide-react";

const DashboardFavoriteNews: React.FC = () => {
  const { toast } = useToast();
  const [favoriteNews, setFavoriteNews] = useState([]);

  async function FavNews() {
    const callApi = await GetMyFavoriteNews();

    setFavoriteNews(callApi?.data?.myFavoriteNews);

    const fetchDetail = callApi?.data?.myFavoriteNews.map(
      async (item) =>
        await GetBlogsById(item?.newsId).then(
          (res) => res?.data?.detailsNewsDto
        )
    );

    const list = await Promise.all(fetchDetail);

    console.log(list);

    setFavoriteNews(list);
  }

  async function handleDeleteNews(newsFavId: string) {
    const data = {
      deleteEntityId: newsFavId,
    };

    try {
      const callApi = await DeleteFavoriteNews(data);
      toast({ title: ` حذف دوره ${callApi?.data?.message}` });
      if (callApi?.data?.success) {
        const filteredData = favoriteNews.filter(
          (e) => e.favoriteId !== newsFavId
        );
        setFavoriteNews(filteredData);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    FavNews();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6"> اخبار مورد علاقه</h1>
      {favoriteNews.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right"> عنوان</TableHead>
                <TableHead className="text-right">نویسنده </TableHead>
                <TableHead className="text-right">دسته بندی</TableHead>
                {/* <TableHead className="text-right">قیمت (تومان)</TableHead> */}
                <TableHead className="text-right"> زمان انتشار</TableHead>
                <TableHead className="text-right">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {favoriteNews.map((news) => (
                <TableRow key={news.id}>
                  <TableCell>{news.title}</TableCell>
                  <TableCell>{news.addUserFullName}</TableCell>
                  <TableCell>{news.newsCatregoryName}</TableCell>
                  {/* <TableCell>{course.cost}</TableCell> */}
                  <TableCell>{makeDatePersian(news.insertDate)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2 space-x-reverse">
                      <Link
                        to={`/blog/${news.id}`}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <Eye className="h-5 w-5" />
                      </Link>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteNews(news?.favoriteId)}
                      >
                        {news.isFavorite ? (
                          <Heart className="h-5 w-5 fill-current" />
                        ) : (
                          <HeartOff className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-10">
          <Heart className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-4 text-lg text-gray-600">
            شما هنوز خبری را به علاقه‌مندی‌ها اضافه نکرده‌اید.
          </p>
          <Link
            to="/blog"
            className="mt-6 inline-block bg-luko-teal text-white px-4 py-2 rounded-lg"
          >
            مشاهده خبرها
          </Link>
        </div>
      )}
    </div>
  );
};

export default DashboardFavoriteNews;
