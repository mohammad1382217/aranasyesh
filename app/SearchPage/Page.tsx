import React, { lazy, useEffect } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import CardComponent from "../components/Card";
import axiosInstance from "../api/apiConfig";
import axios, { CancelTokenSource } from "axios";
import type { categoryItems } from "../api/Slices/HomeSlice/Home";

const BreadcrumbsWithIcon = React.lazy(() => import("../components/BreadcrumbsWithIcon"));

const LineSpace = lazy(() => import("../components/lineSpace"));

interface Company {
  id: number;
  company_name: string;
  discount: number;
  max_discount: number;
  rate: number;
  company_image1: string;
}
const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const Search = searchParams.get("q");
  console.log("search : ",Search)
  const [searchData, setSearchData] = React.useState<categoryItems[]>([])

  useEffect(()=> {
    let cancelTokenSource: CancelTokenSource | null = null;

    try {
      cancelTokenSource = axios.CancelToken.source();
    } catch (error) {
      // Handle error if cancel token creation fails
      console.error("Failed to create cancel token:", error);
    }
    const searchData = async () => {
      if (!cancelTokenSource) return; // Exit if cancel token is null
      const response = await axiosInstance.post("company/search/", {
        company_name: Search,
      },{
        cancelToken: cancelTokenSource.token,
      });
      setSearchData(response.data)
    }

    searchData();
    return () => {
      if (cancelTokenSource) {
        cancelTokenSource.cancel("Request canceled by cleanup");
      }
    }
  })
  
  return (
    <>
      <section className="w-full py-10 bg-[#F5F5F5] flex flex-col justify-start items-center">
        <div className="container gap-4 mx-auto w-11/12 md:w-10/12 min-h-screen">
          <div>
            <div className="w-full flex items-start justify-start rounded-2xl">
              <BreadcrumbsWithIcon
                Address={[
                  {
                    lable: 'جستجو',
                    link: "#",
                  },
                ]}
              />
            </div>
            <LineSpace
              ClassName={"!justify-start -mr-2 my-10"}
              color={`#4A4A4A`}
              text={Search!}
              icon={<svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5778 22.7503C18.3163 22.7503 22.9682 18.1426 22.9682 12.4587C22.9682 6.77473 18.3163 2.16699 12.5778 2.16699C6.83942 2.16699 2.1875 6.77473 2.1875 12.4587C2.1875 18.1426 6.83942 22.7503 12.5778 22.7503Z" stroke="#8754AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M24.0612 23.8337L21.874 21.667" stroke="#8754AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              }
              showMore={false}
              link={""}
            />
          </div>
          {searchData.length > 0 ? (
            <>
              <div className="space-y-10 justify-center justify-items-center items-center content-center grid-cols-1 sm:gap-4 sm:space-y-0 grid grid-flow-row sm:grid-cols-2 lg:gap-8 lg:grid-cols-3 2xl:gap-10 2xl:grid-cols-4">
                {searchData.map(
                  (item: Company, index: number) => (
                    <CardComponent
                    Id={item.id}
                      key={index}
                      text={item.company_name}
                      rate={item.rate}
                      offer={[item.discount, item.max_discount]}
                      img={`https://api.aranasayesh.ir/${item.company_image1}`}
                    />
                  )
                )}
              </div>
            </>
          ) : (
            <div className="h-72"></div>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchPage;