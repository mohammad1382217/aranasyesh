import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import React, { useEffect, useReducer } from "react";
import { fetchBlogPost } from "../api/fetchblogPost";
import { BlogReducer, initialBlog } from "../api/Slices/BlogSlice/blog";
const LazyImage = React.lazy(() => import("../components/LazyImage"));
const BreadcrumbsWithIcon = React.lazy(() => import("../components/BreadcrumbsWithIcon"));

const BlogPost: React.FC = () => {
  const { id } = useParams();
  const [Blogs, dispatchBlogs] = useReducer(BlogReducer, initialBlog);
  useEffect(() => {
    const cleanupBanner = fetchBlogPost(dispatchBlogs, id);
    return cleanupBanner;
  }, []);

  function convertDate(dateString: string) {
    const parts = dateString.split("-");
    if (parts.length === 3) {
      return `${parts[0]}/${parts[1]}/${parts[2]}`;
    }
    return dateString;
  }

  return (
    <>
      <Helmet>
        <title>{Blogs.blogPost.meta_title}</title>
        <meta name="description" content={Blogs.blogPost.meta_description} />
      </Helmet>
      <section className="w-full py-10 bg-[#F5F5F5] flex flex-col justify-center items-center">
        <div className="container gap-4 mx-auto w-11/12 md:w-10/12 min-h-screen">
          <div className="w-full flex items-center justify-start rounded-2xl">
            <BreadcrumbsWithIcon
              Address={[
                { lable: "وبلاگ", link: "/blog" },
                { lable: Blogs.blogPost.title, link: "#" },
              ]}
            />
          </div>
          <div className="w-full px-5 md:px-10 flex flex-col py-10 bg-[#FFFFFF] rounded-2xl gap-4 justify-center lg:justify-start items-start my-4 lg:my-2 lg:mt-10">
            <h2 className="text-[#7F38B7] md:px-2 md:mr-4 text-3xl sm:text-4xl font-semibold">
              {Blogs.blogPost.title}
            </h2>
            <span className="text-lg md:px-2 md:mr-4 font-light text-[#C8C8C8]">
              تاریخ انتشار:
              <span className="text-start">
                {convertDate(Blogs.blogPost.created)}
              </span>
            </span>

            <div className="space-y-3 md:px-2">
              <LazyImage
                src={Blogs.blogPost.cover}
                className="w-[100vw] rounded-md"
                alt={Blogs.blogPost.title}
                width={283}
                height={176}
              />
              <div dangerouslySetInnerHTML={{ __html: Blogs.blogPost.body }} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPost;
