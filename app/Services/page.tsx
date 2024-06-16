import React, { lazy, useEffect, useReducer, useState } from "react";
const LineSpace = lazy(() => import("../components/lineSpace"));
import eitaa from "../assets/svg/eitaa.svg";
import telegram from "../assets/svg/telegram.svg";
import Chip from "@material-tailwind/react/components/Chip";
import presentage from "../assets/svg/percentage_purple.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  BannerReducer,
  initialBanner,
} from "../api/Slices/BannersSlice/Banners";
import axiosInstance, { getCookie } from "../api/apiConfig";
import defaultImage from "../assets/images/default-placeholder.webp";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import StarRating from "../components/Star";
import { fetchSpecial } from "../api/fetchSpecial";
import SubmitButton from "../components/submitButton";
import Loading from "../components/loading";
import Video from "../components/video";

const LazyImage = React.lazy(() => import("../components/LazyImage"));
const CardComponent = React.lazy(() => import("../components/Card"));
const TextArea = React.lazy(() => import("../components/TextArea"));
const BreadcrumbsWithIcon = React.lazy(
  () => import("../components/BreadcrumbsWithIcon")
);

const Services = () => {
  const [company, setCompany] = useState<company>({
    id: 1,
    company_name: "",
    discount: 0,
    max_discount: 0,
    category_name: "",
    company_image1: "",
    company_image2: "",
    company_image3: "",
    company_image4: "",
    company_image5: "",
    video: "",
    rate: 0,
    description: "",
    address: "",
    call_number: "",
    meta_title: "",
    meta_description: "",
    eita: "",
    instagram: "",
    telegram: "",
    user_status: {
      rate: 0,
      is_valid: false,
    },
    sub_category: "",
    category_show_name: "",
    sub_category_id: 0,
    category_id: 0,
  });

  const [Banners, dispatchBanners] = useReducer(BannerReducer, initialBanner);
  const [loading, setLoading] = useState(true);
  const [loadingOpinion, setLoadingOpinion] = useState(false);
  const [isValidOpinion, setIsValidOpinion] = useState(false);
  const [showCross, setshowCross] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#8754AF");
  const [buttonText, setButtonText] = useState("ثبت نظر");

  const showToastErrorMessage = () => {
    toast.error("برای ثبت نظر ابتدا وارد شوید", {
      position: "top-center",
    });
  };

  const [images, setImages] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState(images[0]); // تصویر بزرگ اصلی

  const { Id } = useParams<string>();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`company/${Id}/`);
        const data = response.data;
        setCompany(response.data);
        setMainImage(data.company_image1 as string);
        setImages([
          data.company_image1,
          data.company_image2,
          data.company_image3,
          data.company_image4,
          data.company_image5,
        ]);
      } catch (error) {
        console.log(error);
      }
    };

    Promise.allSettled([fetchSpecial(dispatchBanners), fetchData()]);

    setLoading(false);
  }, [Id]);

  const navigate = useNavigate();
  const [description, setDescription] = useState({ description: "" });
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription({ ...description, description: e.target.value });
  };

  const openInNewTab = (url: string) => {
    // Check if the URL starts with "http://" or "https://"
    const regex = /^https?:\/\//i;
    if (!regex.test(url)) {
      // If not, add "http://" to the beginning of the URL
      url = `http://${url}`;
    }

    // Open the URL in a new tab
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    nextArrow: <div className="hidden"></div>,
    prevArrow: <div className="hidden"></div>,
    slidesToScroll: 1,
    rtl: true,
    autoplay: true,
    className: "sliderServices",
    autoplaySpeed: 5000,
    // cssEase: "linear",
    vertical: true,
    speed: 1000,
    responsive: [
      {
        breakpoint: 1269,
        settings: {
          vertical: true,
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 959,
        settings: {
          vertical: true,
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 719,
        settings: {
          vertical: false,
          slidesToShow: 2,
          centerMode: true,
        },
      },
      {
        breakpoint: 569,
        settings: {
          vertical: false,
          slidesToShow: 2,
          centerMode: true,
        },
      },
      {
        breakpoint: 369,
        settings: {
          vertical: false,
          slidesToShow: 1,
        },
      },
    ],
    verticalSwiping: true,
    beforeChange: (currentSlide: number) => {
      setMainImage(images[currentSlide]);
    },
  };

  return (
    <>
      {loading === true ? (
        <Loading />
      ) : (
        <>
          {" "}
          <section className="bg-[#F5F5F5] w-full flex flex-col justify-center py-8">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="w-full flex items-center justify-center sm:justify-start rounded-2xl">
                <BreadcrumbsWithIcon
                  Address={[
                    {
                      lable: company.category_show_name,
                      link: `/Categories/${company.category_name}/1`,
                    },
                    {
                      lable: company.sub_category,
                      click: async () => {
                        navigate(
                          `/Category/${company.category_name}/SubCategory/${company.sub_category}/`
                        );
                      },
                    },
                    { lable: company.company_name, link: "#" },
                  ]}
                />
              </div>
            </div>
          </section>
          <section className="bg-[#F5F5F5] w-full flex flex-col justify-center py-8 ">
            <div className="flex flex-col lg:flex-row items-start container mx-auto px-4 lg:px-8 gap-8 ">
              <section className="bg-white flex xs:p-4 p-8 rounded-2xl lg:w-8/12 w-full flex-col items-center gap-5 h-full">
                <div className="container flex flex-row justify-center items-center lg:px-3">
                  <div className="w-full flex flex-col xl:flex-row xl:justify-between items-center gap-3">
                    <div className="flex justify-between items-center sm:flex-col gap-3">
                      <div className="flex flex-col xl:flex-row items-center">
                        <div
                          style={{
                            backgroundImage: `url(${""})`,
                          }}
                          className="w-20 h-20 bg-[#424242] lg:ml-3 rounded-2xl"
                        ></div>
                        <div className="flex flex-col items-center md:items-start justify-center gap-3">
                          <span className="lg:text-xl mt-3 mx-auto xl:mx-0 text-2xl font-bold text-[#151515]">
                            {company?.company_name}
                          </span>
                          <div className="flex gap-2 sm:gap-4">
                            <Chip
                              value={`از ${company.discount} تا ${company.max_discount} درصد تخفیف`}
                              className="bg-[#8754AF] rounded-2xl"
                            />
                            <Chip
                              value={company.category_show_name}
                              className="bg-[#8754AF] rounded-2xl"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-center gap-3">
                      <div className="flex mx-auto xl:mx-0">
                        <span className="text-base font-extralight text-[#717171]">
                          امتیاز:
                        </span>
                        <span className="ml-1 mr-1 text-base font-extralight text-[#717171]">
                          {company?.rate}
                        </span>
                        {getCookie("accessToken") ? (
                          <StarRating
                            defaultValue={company?.user_status.rate}
                            onChange={async (value) => {
                              await axiosInstance.post(
                                `company/${company.id}/rating/`,
                                { rate: value }
                              );
                            }}
                            isLoggedIn={true}
                          />
                        ) : (
                          <StarRating
                            defaultValue={company?.user_status.rate}
                            onChange={async () => {}}
                            isLoggedIn={false}
                          />
                        )}
                      </div>
                      {company?.user_status.is_valid ? (
                        <Chip
                          value="تبریک! اشتراک شما شامل این مجموعه میباشد"
                          className="mr-1 text-[#00A040] bg-[#F5F5F5]"
                        />
                      ) : (
                        <Chip
                          value="متاسفانه اشتراک شما شامل این مجموعه نمیباشد"
                          className="mr-1 text-[#C8C8C8] bg-[#F5F5F5]"
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col gap-5">
                  <div className="w-full flex flex-col gap-5">
                    <div className="flex flex-col md:flex-row justify-center gap-5">
                      <div className="flex w-full md:w-3/4 h-44 md:h-[24rem] md:mt-2 xl:h-[22rem]">
                        {mainImage === "/media/img/default.jpg" || null ? (
                          <LazyImage
                            src={defaultImage}
                            className="bg-cover rounded-xl h-[176px] lg:h-[352px] md:h-[24rem] xl:h-[22rem]"
                            alt="Main"
                            width={548}
                            height={176}
                          />
                        ) : (
                          <>
                            <LazyImage
                              src={`https://api.aranasayesh.ir${mainImage}`}
                              className="bg-cover rounded-xl h-[176px] lg:h-[352px] md:h-[24rem] xl:h-[22rem]"
                              alt="Main"
                              width={548}
                              height={176}
                            />
                          </>
                        )}
                      </div>
                      <div className="flex slider-container flex-col w-full h-28 md:!h-72  md:w-1/4 md:gap-4 gap-2 lg:gap-0">
                        <Slider {...settings}>
                          <div>
                            {images[2] === "/media/img/default.jpg" ? (
                              <img
                                src={defaultImage}
                                className="bg-cover object-cover rounded-xl w-full px-1 md:px-0 sm:my-2 md:my-1 md:!w-full h-[5.3rem] xl:h-[4.6rem] 2xl:h-[4.6rem] 2xl:my-[0.5] xl:mt-2"
                                onClick={() => setMainImage(images[2])}
                              />
                            ) : (
                              <img
                                src={`https://api.aranasayesh.ir${images[2]}`}
                                className="bg-cover object-fill rounded-xl w-full px-1 md:px-0 sm:my-2 md:my-1 md:!w-full h-[5.3rem] xl:h-[4.6rem] 2xl:h-[4.6rem] 2xl:my-[0.5] xl:mt-2"
                                alt={`Thumbnail`}
                                onClick={() => setMainImage(images[2])}
                              />
                            )}
                          </div>
                          <div>
                            {images[1] === "/media/img/default.jpg" ? (
                              <img
                                src={defaultImage}
                                className="bg-cover object-cover rounded-xl w-full px-1 md:px-0 sm:my-2 md:my-1 md:!w-full h-[5.3rem] xl:h-[4.6rem] 2xl:h-[4.6rem] 2xl:my-[0.5] xl:mt-2"
                                onClick={() => setMainImage(images[1])}
                              />
                            ) : (
                              <img
                                src={`https://api.aranasayesh.ir${images[1]}`}
                                className="bg-cover object-fill rounded-xl w-full px-1 md:px-0 sm:my-2 md:my-1 md:!w-full h-[5.3rem] xl:h-[4.6rem] 2xl:h-[4.6rem] 2xl:my-[0.5] xl:mt-2"
                                alt={`Thumbnail`}
                                onClick={() => setMainImage(images[1])}
                              />
                            )}
                          </div>
                          <div>
                            {images[0] === "/media/img/default.jpg" ? (
                              <img
                                src={defaultImage}
                                className="bg-cover object-cover rounded-xl w-full px-1 md:px-0 sm:my-2 md:my-1 md:!w-full h-[5.3rem] xl:h-[4.6rem] 2xl:h-[4.6rem] 2xl:my-[0.5] xl:mt-2"
                                onClick={() => setMainImage(images[0])}
                              />
                            ) : (
                              <img
                                src={`https://api.aranasayesh.ir${images[0]}`}
                                className="bg-cover object-fill rounded-xl w-full px-1 md:px-0 sm:my-2 md:my-1 md:!w-full h-[5.3rem] xl:h-[4.6rem] 2xl:h-[4.6rem] 2xl:my-[0.5] xl:mt-2"
                                alt={`Thumbnail`}
                                onClick={() => setMainImage(images[0])}
                              />
                            )}
                          </div>
                          <div>
                            {images[4] === "/media/img/default.jpg" ? (
                              <img
                                src={defaultImage}
                                className="bg-cover object-cover rounded-xl w-full px-1 md:px-0 sm:my-2 md:my-1 md:!w-full h-[5.3rem] xl:h-[4.6rem] 2xl:h-[4.6rem] 2xl:my-[0.5] xl:mt-2"
                                onClick={() => setMainImage(images[4])}
                              />
                            ) : (
                              <img
                                src={`https://api.aranasayesh.ir${images[4]}`}
                                className="bg-cover object-fill rounded-xl w-full px-1 md:px-0 sm:my-2 md:my-1 md:!w-full h-[5.3rem] xl:h-[4.6rem] 2xl:h-[4.6rem] 2xl:my-[0.5] xl:mt-2"
                                alt={`Thumbnail`}
                                onClick={() => setMainImage(images[4])}
                              />
                            )}
                          </div>
                          <div>
                            {images[3] === "/media/img/default.jpg" ? (
                              <img
                                src={defaultImage}
                                className="bg-cover object-cover rounded-xl w-full px-1 md:px-0 sm:my-2 md:my-1 md:!w-full h-[5.3rem] xl:h-[4.6rem] 2xl:h-[4.6rem] 2xl:my-[0.5] xl:mt-2"
                                onClick={() => setMainImage(images[3])}
                              />
                            ) : (
                              <img
                                src={`https://api.aranasayesh.ir${images[3]}`}
                                className="bg-cover object-fill rounded-xl w-full px-1 md:px-0 sm:my-2 md:my-1 md:!w-full h-[5.3rem] xl:h-[4.6rem] 2xl:h-[4.6rem] 2xl:my-[0.5] xl:mt-2"
                                alt={`Thumbnail`}
                                onClick={() => setMainImage(images[3])}
                              />
                            )}
                          </div>
                        </Slider>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="flex text-[#7F38B7] text-2xl font-semibold gap-2">
                      درباره{" "}
                      <div
                        dangerouslySetInnerHTML={{
                          __html: company.company_name,
                        }}
                      />
                    </h3>
                    <p
                      lang="fa"
                      className="text-base font-light text-[#303030] text-justify"
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: company.description,
                        }}
                      />
                    </p>
                  </div>
                  {company.video !== null ? (
                    <div className="flex h-80">
                      <Video
                        src={`https://api.aranasayesh.ir${company.video}`}
                        className="bg-cover rounded-xl w-full"
                        alt={"Services"}
                      />
                    </div>
                  ) : null}
                  <div className="w-full flex justify-between">
                    <h3 className="text-[#7F38B7] self-center md:self-start text-xl sm:text-2xl font-semibold">
                      اطلاعات تماس این مجموعه
                    </h3>
                    <div className="lg:flex gap-4 text-[#7F38B7] justify-center hidden">
                      {company.telegram !== null ? (
                        <LazyImage
                          className="!w-6 !h-6 cursor-pointer"
                          src={telegram}
                          alt="telegram"
                          onClick={() => openInNewTab(company.telegram)}
                          width={24}
                          height={24}
                        />
                      ) : null}
                      {company.instagram !== null ? (
                        <div
                          onClick={() => openInNewTab(company.instagram)}
                          className="opacity-80 transition-opacity hover:opacity-100"
                        >
                          <svg
                            className="!h-6 !w-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      ) : null}
                      {company.eita !== null ? (
                        <div
                          onClick={() => openInNewTab(company.eita)}
                          className="flex !flex-shrink-0 opacity-80 transition-opacity hover:opacity-100 cursor-pointer"
                        >
                          <LazyImage
                            className="!w-6 !h-6"
                            src={eitaa}
                            alt=""
                            width={24}
                            height={24}
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="w-full flex flex-col-reverse lg:flex-col justify-between gap-4">
                    <div className="flex gap-4 text-[#7F38B7] justify-center lg:hidden">
                      {company.telegram !== null ? (
                        <Link to={company.telegram}>
                          <LazyImage
                            className="!w-6 !h-6 cursor-pointer"
                            src={telegram}
                            alt=""
                            width={24}
                            height={24}
                          />
                        </Link>
                      ) : null}
                      {company.instagram !== null ? (
                        <Link to={company.instagram} className="cursor-pointer">
                          <svg
                            className="!h-6 !w-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Link>
                      ) : null}
                      <Link
                        to="#"
                        className="flex !flex-shrink-0 opacity-80 transition-opacity hover:opacity-100 cursor-pointer"
                      >
                        {company.eita !== null ? (
                          <Link to={company.eita}>
                            <LazyImage
                              className="!w-6 !h-6"
                              src={eitaa}
                              alt=""
                              width={24}
                              height={24}
                            />
                          </Link>
                        ) : null}
                      </Link>
                    </div>
                    <div className="w-full flex flex-col justify-between gap-4">
                      <span className="flex text-[#303030] text-lg font-light gap-2">
                        <span className="text-[#7F38B7] text-lg font-semibold flex gap-2">
                          آدرس:
                        </span>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: company.address,
                          }}
                        />
                      </span>
                      <span>
                        <span
                          dir="ltr"
                          className="text-[#7F38B7] text-lg font-semibold"
                        >
                          :شماره تماس
                        </span>{" "}
                        {company.call_number}
                      </span>
                    </div>
                  </div>
                  <div className="w-full flex flex-col justify-between mt-4 gap-5">
                    <h3 className="text-[#7F38B7] text-2xl font-semibold">
                      ثبت نظر درباره این مجموعه
                    </h3>
                    <TextArea
                      Name="description"
                      Value={description.description}
                      TextAreaClass={"h-52 p-5 border-[#C8C8C8] text-[#303030]"}
                      placeholder={"نظرتان را در مورد این مجموعه بنویسید"}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                    <SubmitButton
                      className="h-11 text-base flex items-center shadow-none !bg-[#8754AF] text-gray-700 hover:!bg-[#8754AF] max-sm:!px-4 w-max self-end px-8 py-2.5"
                      loading={loadingOpinion}
                      isValid={isValidOpinion}
                      showCross={showCross}
                      buttonBgColor={backgroundColor}
                      buttonText={buttonText}
                      onClick={async () => {
                        if (getCookie("accessToken")) {
                          setLoadingOpinion(true);
                          setButtonText("در حال ارسال");
                          try {
                            await axiosInstance.post(
                              `company/${Id}/comments/`,
                              description
                            );
                            setTimeout(() => {
                              setButtonText("نظر با موفقیت ثبت شد");
                              setLoadingOpinion(false);
                              setIsValidOpinion(true);
                              setshowCross(false);
                              setBackgroundColor("#5cb85c"); // تغییر رنگ بک‌گراند به سبز برای موفقیت
                            }, 2000);
                            setTimeout(() => {
                              setButtonText("ثبت نظر");
                              setLoadingOpinion(false);
                              setIsValidOpinion(false);
                              setshowCross(false);
                              setBackgroundColor("#8754AF");
                            }, 4000);
                            setDescription({ ...description, description: "" });
                          } catch {
                            setTimeout(() => {
                              setButtonText("نظر ثبت نشد");
                              setLoadingOpinion(false);
                              setIsValidOpinion(false);
                              setshowCross(true);
                              setBackgroundColor("#d9534f"); // تغییر رنگ بک‌گراند به قرمز برای عدم موفقیت
                            }, 2000);
                            setTimeout(() => {
                              setButtonText("ثبت نظر");
                              setLoadingOpinion(false);
                              setIsValidOpinion(false);
                              setshowCross(false);
                              setBackgroundColor("#8754AF");
                            }, 4000);
                          }
                        } else {
                          showToastErrorMessage();
                        }
                      }}
                    />
                  </div>
                </div>
              </section>
              <section className="w-full lg:w-4/12 bg-white flex items-center self-start justify-center xs:p-4 p-8 rounded-2xl">
                <div className="flex flex-wrap mx-auto flex-row lg:flex-col justify-center  gap-4 w-full  ">
                  <LineSpace
                    color={`#8754AF`}
                    text={"پیشنهادهای ویژه"}
                    icon={
                      <LazyImage
                        className="!w-7 !h-7"
                        src={presentage}
                        alt={""}
                        width={28}
                        height={28}
                      />
                    }
                    showMore={false}
                    link={""}
                  />
                  <div className="flex flex-wrap lg:flex-nowrap mx-auto lg:mx-0 flex-row lg:flex-col justify-center columns-2 items-center w-full gap-6 mt-3">
                    {Banners.special.map((item, index) => (
                      <CardComponent
                        Id={item.id}
                        key={index}
                        text={item.company_name}
                        rate={item.rate}
                        offer={[item.discount, item.max_discount]}
                        img={`https://api.aranasayesh.ir/${item.company_image1}`}
                      />
                    ))}
                  </div>
                </div>
              </section>
            </div>
            <ToastContainer rtl={true} />
          </section>
        </>
      )}
    </>
  );
};

export default Services;

// types
interface company {
  category_show_name: string;
  sub_category: string;
  id: number;
  company_name: string;
  discount: number;
  max_discount: number;
  category_name: string;
  rate: number;
  company_image1: string | File;
  company_image2: string | File;
  company_image3: string | File;
  company_image4: string | File;
  company_image5: string | File;
  video: string | null | File;
  description: string;
  address: string;
  call_number: string;
  meta_title: string;
  meta_description: string;
  eita: string;
  instagram: string;
  telegram: string;
  user_status: {
    rate: number;
    is_valid: boolean;
  };
  sub_category_id: number;
  category_id: number;
}
