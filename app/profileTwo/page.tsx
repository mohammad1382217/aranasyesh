import React from "react";
import { useNavigate } from "react-router-dom";
import { List } from "../ProfileOne/page";
import { deleteCookie } from "../api/apiConfig";
import { useAuth } from "../api/authContext";

const BreadcrumbsWithIcon = React.lazy(() => import("../components/BreadcrumbsWithIcon"));
const CardProfile = React.lazy(() => import("../components/CardProfile"));
const FlowbiteListGroup = React.lazy(() => import("../components/ListGroup"));

const ProfileTwo: React.FC = () => {
  const { profile, dispatch } = useAuth();
  const navigate = useNavigate();
  const semiLengthCard = Math.ceil(profile!.discounts.length / 2);

  const handleLogout = () => {
    dispatch({ type: 'SET_LOGGED_IN', payload: false});
    deleteCookie("accessToken");
    dispatch({ type: "SET_ACCOUNT", payload: null});
    navigate("/");
  };

  const List: List[] = [
    { title: "اطلاعات حساب", link: "/ProfileOne" },
    { title: "تاریخچه تخفیف", link: "/ProfileTwo" },
    { title: "خروج از حساب", link: "/", click: () => handleLogout() },
  ];

  return (
    <>
      <section className="bg-[#F5F5F5] w-full flex flex-col justify-center py-8">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="w-full flex items-center justify-start rounded-2xl">
            <BreadcrumbsWithIcon
              Address={[
                { lable: "پروفایل کاربری", link: "/ProfileOne" },
                { lable: "تاریخچه تخفیف", link: "#" },
              ]}
            />
          </div>
        </div>
      </section>
      <section className="bg-[#F5F5F5] w-full flex flex-col justify-start py-8 min-h-screen h-full">
        <div className="flex flex-col lg:flex-row container mx-auto px-6 lg:px-8 gap-8">
          <section className="flex justify-center">
            <FlowbiteListGroup List={List} />
          </section>
          <section className="w-full flex rounded-2xl sm:flex-col items-center justify-between gap-5">
            <div className="w-full flex flex-col xl:flex-row justify-between items-start gap-4">
              {profile!.discounts.length !== 0 ? (
                <>
                  <div className="w-full xl:w-[calc(50%-20px)] flex flex-col gap-4">
                    {profile!.discounts?.slice(0, semiLengthCard).map(
                      (discount) => (
                        <CardProfile
                          name={discount.company}
                          created={discount.created}
                          original_price={discount.original_price}
                          discount_price={discount.discount_price}
                          percent={discount.discount}
                        />
                      )
                    )}
                  </div>
                  <div className="w-full xl:w-[calc(50%-20px)] flex flex-col gap-4">
                    {profile!.discounts?.slice(
                      semiLengthCard,
                      profile!.discounts.length
                    ).map((discount) => (
                      <CardProfile
                        name={discount.company}
                        created={discount.created}
                        original_price={discount.original_price}
                        discount_price={discount.discount_price}
                        percent={discount.discount}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="w-full flex items-center justify-center bg-white p-5 rounded-xl h-32">
                  <h2 className="text-center text-[#7F38B7] text-3xl">
                    موردی برای نمایش وجود ندارد
                  </h2>
                </div>
              )}
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default ProfileTwo;
