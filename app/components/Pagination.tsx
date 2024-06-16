import React, { useEffect, useReducer } from "react";
import CardComponentBlog from "./CardBlog";
import {
  BlogReducer,
  CardBlog,
  initialBlog,
} from "../api/Slices/BlogSlice/blog";
import { fetchBlogs } from "../api/fetchBlogs";

interface Props {
  itemsPerPage: number;
}

const Pagination: React.FC<Props> = () => {
  const [Blogs, dispatchBlogs] = useReducer(BlogReducer, initialBlog);
  useEffect(() => {
    const cleanupBanner = fetchBlogs(dispatchBlogs, "");
    return cleanupBanner;
  }, []);
  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="space-y-10 justify-center justify-items-center items-center content-center grid-cols-1 sm:gap-4 sm:space-y-0 grid grid-flow-row sm:grid-cols-2 lg:gap-8 lg:grid-cols-3 2xl:grid-cols-4">
        {Blogs.blogs.results.map((item: CardBlog) => (
          <CardComponentBlog
            key={item.id}
            id={item.id}
            title={item.title}
            date={item.created}
            text={item.body}
            img={item.cover}
          />
        ))}
      </div>
      {/* Pagination buttons */}
      <div className="w-full flex justify-center items-center mt-5">
        {/* Button for previous page */}
        <button
          onClick={() => {
            fetchBlogs(dispatchBlogs, `?p=${Blogs.blogs.previous}`);
            scrollToTop();
          }}
          disabled={Blogs.blogs.previous === null}
          className={`py-2 px-4 rounded border-none ${
            Blogs.blogs.previous === null
              ? "text-[#C8C8C8] cursor-not-allowed"
              : "text-blue-gray-600 hover:text-blue-500"
          }`}
        >
          قبلی
        </button>
        {Blogs.blogs.previous !== null ? (
          <button
            className={`py-2 px-4 rounded border-none text-[#717171]`}
            onClick={() => {
              fetchBlogs(dispatchBlogs, `?p=${Blogs.blogs.previous}`);
              scrollToTop();
            }}
          >
            {Blogs.blogs.previous}
          </button>
        ) : null}

        <button
          className={`py-2 px-4 rounded border-none text-purple-500`}
          onClick={() => fetchBlogs(dispatchBlogs, `?p=${Blogs.blogs.page}`)}
        >
          {Blogs.blogs.page}
        </button>
        {Blogs.blogs.next !== null ? (
          <button
            className={`py-2 px-4 rounded border-none text-[#717171]`}
            onClick={() => {
              fetchBlogs(dispatchBlogs, `?p=${Blogs.blogs.next}`);
              scrollToTop();
            }}
          >
            {Blogs.blogs.next}
          </button>
        ) : null}
        {/* Button for next page */}
        <button
          onClick={() => {
            fetchBlogs(dispatchBlogs, `?p=${Blogs.blogs.next}`);
            scrollToTop();
          }}
          disabled={Blogs.blogs.next === null}
          className={`py-2 px-4 rounded border-none ${
            Blogs.blogs.next === null
              ? "text-[#C8C8C8] cursor-not-allowed"
              : "text-blue-gray-600 hover:text-blue-500"
          }`}
        >
          بعدی
        </button>
      </div>
    </>
  );
};

export default Pagination;
