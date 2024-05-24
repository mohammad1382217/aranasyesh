import React, { useReducer } from "react";
import { BreadcrumbsWithIcon } from "../components/BreadcrumbsWithIcon";
import Pagination from "../components/Pagination";
import { BlogReducer, initialBlog } from "../api/Slices/BlogSlice/blog";

const Blog: React.FC = () => {
  return (
    <section className="w-full py-10 bg-[#F5F5F5] flex flex-col justify-center items-center h-full">
      <div className="container gap-4 mx-auto w-11/12 md:w-10/12 min-h-screen">
        <div className="w-full flex items-center justify-start rounded-2xl">
          <BreadcrumbsWithIcon Address={[{ lable: "وبلاگ", link: "#" }]} />
        </div>
        <div className="w-full flex justify-center lg:justify-start items-start my-3 lg:mb-4 p-2 lg:mt-10">
          <h1 className="text-[#7F38B7] text-3xl sm:text-4xl font-semibold  ">
            بلاگ‌ها و مقالات
          </h1>
        </div>
        <Pagination itemsPerPage={16} />
      </div>
    </section>
  );
};

export default Blog;
