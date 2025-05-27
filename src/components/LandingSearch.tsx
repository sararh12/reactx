import { Search } from "lucide-react";
import http from "@/services/interceptor/interceptor";
import { useState } from "react";
import { Field, Form, Formik } from "formik";
import pic from "../../public/lovable-uploads/khabar.png";
import { Link } from "react-router-dom";

const LandingSearch = () => {
  const [isModalShow, setisModalShow] = useState(false);
  const [list, setList] = useState([]);

  const closeModal = () => {
    setTimeout(() => {
      setisModalShow(false);
    }, 700);
  };

  const handleSearch = async (value) => {
    const { data } = await http.get(
      `/Home/GetCoursesWithPagination?PageNumber=1&RowsOfPage=10&SortingCol=Active&SortType=DESC&Query=${value?.query}&TechCount=0`
    );

    setList(data?.courseFilterDtos);
  };

  return (
    <div className="relative max-w-md">
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <Formik
          onSubmit={(value) => handleSearch(value)}
          initialValues={{ query: "" }}
        >
          <Form>
            <Field
              onFocus={() => setisModalShow(true)}
              onBlur={closeModal}
              name="query"
              type="search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-luko-teal focus:border-luko-teal"
              placeholder="جستجو در دوره ها..."
            />
            <button
              type="submit"
              className="absolute left-2.5 bottom-2.5 bg-luko-teal hover:bg-luko-teal/90 text-white font-medium rounded-lg text-sm px-4 py-2"
            >
              جستجو
            </button>
          </Form>
        </Formik>
      </div>
      {isModalShow && (
        <div className="p-2 rounded-md absolute mt-3 bg-white border border-solid border-gray-400 text-slate-700  w-full">
          {list?.length > 0 ? (
            list.map((item) => {
              return (
                <Link to={`/courses/${item?.courseId}`}>
                  <div
                    key={item?.courseId}
                    className="flex gap-5 mb-2 items-center"
                  >
                    <img src={item?.tumbImageAddress || pic} className="w-16" />
                    {item?.title}
                  </div>
                  ;
                </Link>
              );
            })
          ) : (
            <>موردی یافت نشد ...</>
          )}
        </div>
      )}
    </div>
  );
};

export default LandingSearch;
