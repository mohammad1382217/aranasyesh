import React, { Suspense } from "react";
const Pagination = React.lazy(() => import("../components/Pagination"));
const BreadcrumbsWithIcon = React.lazy(
  () => import("../components/BreadcrumbsWithIcon")
);

const Blog: React.FC = () => {
  return (
    <section className="w-full py-10 bg-[#F5F5F5] flex flex-col justify-center items-center h-full">
      <div className="container gap-4 mx-auto w-11/12 md:w-10/12 min-h-screen">
        <div className="w-full flex items-center justify-start rounded-2xl">
          <Suspense fallback={<div>Loading...</div>}>
            <BreadcrumbsWithIcon Address={[{ lable: "وبلاگ", link: "#" }]} />
          </Suspense>
        </div>
        <div className="w-full flex justify-center lg:justify-start items-start my-3 lg:mb-4 p-2 lg:mt-10">
          <h1 className="text-[#7F38B7] text-3xl sm:text-4xl font-semibold  ">
            بلاگ‌ها و مقالات
          </h1>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <Pagination itemsPerPage={16} />
        </Suspense>
      </div>
    </section>
  );
};

export default Blog;
