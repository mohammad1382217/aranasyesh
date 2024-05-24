import React, { useReducer } from "react";
import LineSpace from "../components/lineSpace";
import { BreadcrumbsWithIcon } from "../components/BreadcrumbsWithIcon";
import { useLocation, useParams } from "react-router-dom";
import CardComponent from "../components/Card";
import {
  BannerReducer,
  initialBanner,
} from "../api/Slices/BannersSlice/Banners";
import { HomeReducer, initialHome } from "../api/Slices/HomeSlice/Home";
interface Category {
  companies: Company[];
}

interface Company {
  id: number;
  company_name: string;
  discount: number;
  max_discount: number;
  rate: number;
  company_image1: string;
}
const SearchPage: React.FC = () => {
  let { Search } = useParams<string>();

  const [Banners, dispatchBanners] = useReducer(BannerReducer, initialBanner);
  const [Categorie, dispatchCategorie] = useReducer(HomeReducer, initialHome);
  const location = useLocation();
  
  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <section className="w-full py-10 bg-[#F5F5F5] flex flex-col justify-start items-center">
        <div className="container gap-4 mx-auto w-11/12 md:w-10/12 min-h-screen">
          {/* {location.state.companies[0]((item:Company,index:number) => ( */}
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
            {/* {location.state.companies.length > 1 ? ( */}
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
          {/* ))} */}
          {location.state.length > 0 ? (
            <>
              <div className="space-y-10 justify-center justify-items-center items-center content-center grid-cols-1 sm:gap-4 sm:space-y-0 grid grid-flow-row sm:grid-cols-2 lg:gap-8 lg:grid-cols-3 2xl:gap-10 2xl:grid-cols-4">
                {location.state.map(
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
