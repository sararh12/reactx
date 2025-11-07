import React, { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import http from "@/services/interceptor/interceptor";
import { Field, Form, Formik } from "formik";
import pic from "../../public/lovable-uploads/khabar.png";
import { Link } from "react-router-dom";

/**
 * Improved LandingSearch component
 * - Debounced search
 * - Click-outside to close
 * - Keeps existing colors (luko-teal) and overall layout
 * - Better keyboard & accessibility basics
 * - Cleaner, card-like results with hover + transitions
 */

const LandingSearch: React.FC = () => {
  const [isModalShow, setIsModalShow] = useState(false);
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const debounceRef = useRef<number | null>(null);

  const closeModal = () => setIsModalShow(false);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setTimeout(() => setIsModalShow(false), 120);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async (value: string) => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current);

    debounceRef.current = window.setTimeout(async () => {
      if (!value || String(value).trim().length === 0) {
        setList([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data } = await http.get(
          `/Home/GetCoursesWithPagination?PageNumber=1&RowsOfPage=10&SortingCol=Active&SortType=DESC&Query=${encodeURIComponent(
            value
          )}&TechCount=0`
        );

        setList(data?.courseFilterDtos || []);
      } catch (err) {
        console.error("Search error:", err);
        setList([]);
      } finally {
        setLoading(false);
      }
    }, 350);
  };

  // helper: small card for search result
  const ResultCard = ({ item }: { item: any }) => (
    <Link
      to={`/courses/${item?.courseId}`}
      className="block hover:bg-gray-50 transition-colors rounded-md"
      key={item?.courseId}
      onClick={() => setIsModalShow(false)}
    >
      <div className="flex items-center gap-4 p-3">
        <img
          src={item?.tumbImageAddress || pic}
          alt={item?.title}
          className="w-14 h-14 rounded-md object-cover flex-shrink-0 shadow-sm"
        />
        <div className="flex-1">
          <div className="text-sm font-semibold text-[#005250] line-clamp-2">
            {item?.title}
          </div>
          <div className="text-xs text-gray-500 mt-1">{item?.teacherName}</div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="relative max-w-md" ref={containerRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>

        <Formik
          initialValues={{ query: "" }}
          onSubmit={(values) => handleSearch(values.query)}
        >
          {({ values }) => (
            <Form autoComplete="off" className="relative">
              <Field
                innerRef={inputRef}
                name="query"
                type="search"
                onFocus={() => setIsModalShow(true)}
                onBlur={() => {
                  /* keep a short delay so clicking an item doesn't immediately close */
                  setTimeout(() => {
                    if (document.activeElement !== inputRef.current)
                      setIsModalShow(false);
                  }, 120);
                }}
                onKeyUp={(e: any) => handleSearch(e.target.value)}
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-luko-teal focus:border-luko-teal outline-none"
                placeholder="جستجو در دوره ها..."
                aria-label="جستجو در دوره‌ها"
                autoComplete="off"
              />

              <button
                type="submit"
                className="absolute left-2.5 bottom-2.5 bg-luko-teal hover:bg-luko-teal/90 text-white font-medium rounded-lg text-sm px-4 py-2"
                aria-label="اجرای جستجو"
              >
                جستجو
              </button>
            </Form>
          )}
        </Formik>
      </div>

      {/* Dropdown modal */}
      {isModalShow && (
        <div className="mt-3 rounded-md absolute left-0 w-full bg-white border border-gray-200 shadow-lg z-50">
          <div className="p-3">
            {loading ? (
              <div className="text-sm text-gray-500">در حال جستجو...</div>
            ) : list?.length > 0 ? (
              <div className="flex flex-col divide-y divide-gray-100">
                {list.map((item) => (
                  <ResultCard key={item.courseId} item={item} />
                ))}
                <Link
                  to={`/courses?query=${encodeURIComponent("")}`}
                  className="block text-center text-sm text-luko-teal py-2 hover:underline"
                >
                  مشاهده همه دوره‌ها
                </Link>
              </div>
            ) : (
              <div className="text-sm text-gray-500">موردی یافت نشد ...</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingSearch;
