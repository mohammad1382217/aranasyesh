import React, { useContext, useEffect, useReducer } from "react";
import CardProfile from "../components/CardProfile";
import { BreadcrumbsWithIcon } from "../components/BreadcrumbsWithIcon";
import FlowbiteListGroup from "../components/ListGroup";
import { useNavigate } from "react-router-dom";
import { List } from "../ProfileOne/page";
import { UserContext, UserContextType } from "../api/Slices/UserSlice/userProvider";
import userReducer, { initialUser } from "../api/Slices/UserSlice/userReducer";
import { fetchProfile } from "../api/fetchProfile";

const ProfileTwo: React.FC = () => {
  const User = useContext(UserContext);
  const { account, setAccount, setIsLoggedIn } = User as UserContextType;
  const [UserState, dispatchUser] = useReducer(userReducer, initialUser);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if account data is loaded and the id is valid
    if (account!?.results.length > 0 && account!?.results[0]?.id !== 0) {
      const cleanupProfile = fetchProfile(
        dispatchUser,
        account!?.results[0]?.id
      );
      return cleanupProfile;
    }
  }, [account!?.results[0]?.id]);

  const semiLengthCard = Math.ceil(UserState.profile!.discounts.length / 2);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setAccount({
      previous: null,
      page: 1,
      next: null,
      results: [],
    });
    setIsLoggedIn(false);
    navigate("/Home");
  };

  const List: List[] = [
    { title: "اطلاعات حساب", link: "/ProfileOne" },
    { title: "تاریخچه تخفیف", link: "/ProfileTwo" },
    { title: "خروج از حساب", link: "/", click: () => handleLogout() },
  ];

  return (
    <>
      <section className="bg-[#F5F5F5] w-full flex flex-col justify-center py-8">
        <div className="container mx-auto px-4 lg:px-8">
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
        <div className="flex flex-col lg:flex-row container mx-auto px-4 lg:px-8 gap-8">
          <section className="flex justify-center">
            <FlowbiteListGroup List={List} />
          </section>
          <section className="w-full flex rounded-2xl sm:flex-col items-center justify-between gap-5">
            <div className="w-full flex flex-col xl:flex-row justify-between items-start">
              {UserState.profile!.discounts.length !== 0 ? (
                <>
                  <div className="w-full xl:w-[calc(50%-20px)] flex flex-col gap-4">
                    {UserState.profile!.discounts?.slice(0, semiLengthCard).map(
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
                    {UserState.profile!.discounts?.slice(
                      semiLengthCard,
                      UserState.profile!.discounts.length
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
