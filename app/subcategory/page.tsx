import React, { lazy, Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardComponent from "../components/Card";
import axiosInstance from "../api/apiConfig";
const LineSpace = lazy(() => import("../components/lineSpace"));
const LazyImage = React.lazy(() => import("../components/LazyImage"));
const BreadcrumbsWithIcon = React.lazy(
  () => import("../components/BreadcrumbsWithIcon")
);

const SubCategory: React.FC = () => {
  const [category, setCategory] = useState<Category>({
    id: 0,
    name: "",
    category_detail: {
      id: 0,
      show_name: "",
      icon: "",
      name: "",
    },
    companies: [
      {
        id: 0,
        company_name: "",
        discount: 0,
        max_discount: 0,
        rate: 0,
        company_image1: "",
      },
    ],
  });

  const { Name, sub_categories_name } = useParams();

  useEffect(() => {
    const fetchSubCategory = async () => {
      const response = await axiosInstance.get(
        `category/${Name}/sub_category/`
      );
      const filtredSubcategory = response.data.filter(
        (item: SubCategory) => item.name === sub_categories_name
      );
      const subcategory_id =
        filtredSubcategory.length > 0 ? filtredSubcategory[0].id : null;
      const responseSubCategory = await axiosInstance.get(
        `category/${Name}/sub_category/${subcategory_id}/`
      );
      setCategory(responseSubCategory.data);
    };
    fetchSubCategory();
  }, [Name, sub_categories_name]);

  return (
    <section className="w-full py-10 bg-[#F5F5F5] flex flex-col justify-start items-center">
      <div className="container gap-4 mx-auto w-11/12 md:w-10/12 min-h-screen">
        <div>
          <div className="w-full flex items-start justify-start rounded-2xl">
            <BreadcrumbsWithIcon
              Address={[
                {
                  lable: category.category_detail.show_name,
                  link: `/Categories/${Name}/1`,
                },
                {
                  lable: sub_categories_name!,
                  link: `#`,
                },
              ]}
            />
          </div>
          <Suspense fallback={<div>loading...</div>}>
            <LineSpace
              ClassName={"!justify-start -mr-2"}
              color={`#4A4A4A`}
              text={sub_categories_name!}
              icon={
                <LazyImage
                  className="!w-7 !h-7 my-10"
                  src={category.category_detail.icon}
                  alt={sub_categories_name!}
                  width={28}
                  height={28}
                />
              }
              showMore={false}
              link={""}
            />
          </Suspense>
        </div>
        {category.companies.length > 0 ? (
          <>
            <div className="space-y-10 justify-center justify-items-ceneter items-center content-center grid-cols-1 sm:gap-4 sm:space-y-0 grid grid-flow-row sm:grid-cols-1 md:grid-cols-2 lg:gap-8 lg:grid-cols-3 2xl:gap-10 2xl:grid-cols-4 px-6 lg:px-3 xl:px-4">
              {category.companies.map((item: Company, index: number) => (
                <CardComponent
                  key={index}
                  Id={item.id}
                  text={item.company_name}
                  rate={item.rate}
                  offer={[item.discount, item.max_discount]}
                  img={item.company_image1}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="h-72"></div>
        )}
      </div>
    </section>
  );
};

export default SubCategory;

// Types
interface SubCategory {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  category_detail: {
    id: number;
    show_name: string;
    icon: string;
    name: string;
  };
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
