import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  BannerReducer,
  CardCompany,
  initialBanner,
} from "../api/Slices/BannersSlice/Banners";
import { fetchCategoryCompany } from "../api/fetchCategoryComany";
import Loading from "../components/loading";
import Context, { ContextType } from "../api/context";

const LineSpace = React.lazy(() => import("../components/lineSpace"));
const CardComponent = React.lazy(() => import("../components/Card"));
const LazyImage = React.lazy(() => import("../components/LazyImage"));
const BreadcrumbsWithIcon = React.lazy(() => import("../components/BreadcrumbsWithIcon"));

const Categories: React.FC = () => {
  const { Name, page } = useParams();
  const context = useContext(Context);
  const { categoryData } = context as ContextType;
  const [Banners, dispatchBanners] = useReducer(BannerReducer, initialBanner);
  // const [HomeState, dispatchCategorie] = useReducer(HomeReducer, initialHome);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  console.log(Name, page);

  useEffect(() => {
    setLoading(true);
    const cleanupCategory = fetchCategoryCompany(dispatchBanners, Name, page);
    setLoading(false);
    return cleanupCategory;
  }, [Name, page]);

  const categoryItem = categoryData.filter((e) => e.name === Name);
  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="w-full py-10 bg-[#F5F5F5] flex flex-col justify-start items-center">
          <div className="container gap-4 mx-auto w-11/12 md:w-10/12 min-h-screen">
            {categoryItem.map((item, index) => (
              <div key={index}>
                <div className="w-full flex items-start justify-start rounded-2xl">
                  <BreadcrumbsWithIcon
                    Address={[{ lable: item.show_name, link: "#" }]}
                  />
                </div>
                <LineSpace
                  ClassName={"!justify-start -mr-2"}
                  color={`#4A4A4A`}
                  text={item.show_name}
                  icon={
                    <LazyImage
                      className="!w-7 !h-7 my-10"
                      src={item.icon}
                      alt={item.name}
                      width={28}
                      height={28}
                    />
                  }
                  showMore={false}
                  link={""}
                />
              </div>
            ))}
            <>
              <div className="space-y-10 justify-center justify-items-start items-center content-center grid-cols-1  sm:gap-4 sm:space-y-0 grid grid-flow-row sm:grid-cols-2 lg:gap-8 lg:grid-cols-3 2xl:gap-10 2xl:grid-cols-4 px-6 lg:px-3 xl:px-4">
                {Banners.CategoreyCompany.results.map(
                  (item: CardCompany, index) => (
                    <CardComponent
                      key={index}
                      Id={item.id}
                      text={item.company_name}
                      rate={item.rate}
                      offer={[item.discount, item.max_discount]}
                      img={`https://api.aranasayesh.ir/${item.company_image1}`}
                    />
                  )
                )}
              </div>
              <div className="w-full flex justify-center items-center mt-5">
                {/* Button for previous page */}
                <button
                  onClick={() => {
                    navigate(
                      `/Categories/${Name}/${Banners.CategoreyCompany.previous}`
                    );
                    scrollToTop();
                  }}
                  disabled={Banners.CategoreyCompany.previous === null}
                  className={`py-2 px-4 rounded border-none ${
                    Banners.CategoreyCompany.previous === null
                      ? "text-[#C8C8C8] cursor-not-allowed"
                      : "text-blue-gray-600 hover:text-blue-500"
                  }`}
                >
                  قبلی
                </button>
                {Banners.CategoreyCompany.previous !== null ? (
                  <button
                    className={`py-2 px-4 rounded border-none text-[#717171]`}
                    onClick={() => {
                      navigate(
                        `/Categories/${Name}/${Banners.CategoreyCompany.previous}`
                      );
                      scrollToTop();
                    }}
                  >
                    {Banners.CategoreyCompany.previous}
                  </button>
                ) : null}

                <button
                  className={`py-2 px-4 rounded border-none text-purple-500`}
                  onClick={() =>
                    navigate(
                      `/Categories/${Name}/${Banners.CategoreyCompany.page}`
                    )
                  }
                >
                  {Banners.CategoreyCompany.page}
                </button>
                {Banners.CategoreyCompany.next !== null ? (
                  <button
                    className={`py-2 px-4 rounded border-none text-[#717171]`}
                    onClick={() => {
                      navigate(
                        `/Categories/${Name}/${Banners.CategoreyCompany.next}`
                      );
                      scrollToTop();
                    }}
                  >
                    {Banners.CategoreyCompany.next}
                  </button>
                ) : null}
                {/* Button for next page */}
                <button
                  onClick={() => {
                    navigate(
                      `/Categories/${Name}/${Banners.CategoreyCompany.next}`
                    );
                    scrollToTop();
                  }}
                  disabled={Banners.CategoreyCompany.next === null}
                  className={`py-2 px-4 rounded border-none ${
                    Banners.CategoreyCompany.next === null
                      ? "text-[#C8C8C8] cursor-not-allowed"
                      : "text-blue-gray-600 hover:text-blue-500"
                  }`}
                >
                  بعدی
                </button>
              </div>
            </>
          </div>
        </section>
      )}
    </>
  );
};

export default Categories;