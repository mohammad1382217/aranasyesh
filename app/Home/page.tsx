import Styles from "./Home.module.scss";
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";
import presentage from "../assets/svg/percentage-square.svg";
import art from "../assets/images/art.webp";
import beauty from "../assets/images/beauty.webp";
import restaurant from "../assets/images/restaurant.webp";
import services from "../assets/images/services.webp";
import sport from "../assets/images/sport.webp";
import treatment from "../assets/images/treatment.webp";
import app_phone from "../assets/images/appmobileHome.webp";
import bazar from "../assets/svg/bazar.svg";
import defaultImg from "../assets/images/default-placeholder.webp";
import React, {
  lazy,
  Suspense,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import {
  BannerReducer,
  initialBanner,
} from "../api/Slices/BannersSlice/Banners";
import fetchBanner from "../api/fetchBanner";
import fetchSide from "../api/fetchSide";
import fetchSpecial from "../api/fetchSpecial";
import Skeleton from "react-loading-skeleton";
import Context, { ContextType } from "../api/context";
import CardSkeleton from "../components/CardSkeleton";
import CardSkeletonProposal from "../components/CardSkeletonProposal";
import { Link } from "react-router-dom/dist";

const Slider = React.lazy(() => import("react-slick"));
const LineSpace = React.lazy(() => import("../components/lineSpace"));
const CategoryItems = React.lazy(() => import("../components/CategoryItems"));
const HiDownload = React.lazy(() => import("../components/icons/Hidownload"));
const CardProposal = lazy(() => import("../components/CardProposal"));
const LazyImage = lazy(() => import("../components/LazyImage"));

const SampleNextArrow = ({
  className,
  style,
  onClick,
}: {
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div
      className={className}
      style={{ ...style, display: "block", left: "18px", scale: "1.5" }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = ({
  className,
  style,
  onClick,
}: {
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        right: "18px",
        zIndex: 4,
        scale: "1.5",
      }}
      onClick={onClick}
    />
  );
};

const Home: React.FC = () => {
  const context = useContext(Context);
  const { isCategoryLoading } = context as ContextType;
  const [Banners, dispatchBanners] = useReducer(BannerReducer, initialBanner);
  const [dragStartX, setDragStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1320) {
      if (containerRef.current) {
        setDragStartX(e.clientX);
        console.log(scrollLeft, dragStartX);
        containerRef.current.style.cursor = "grabbing";
      }
    }
  };

  const handleDragMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1320) {
      if (dragStartX !== 0 && containerRef.current) {
        const distance: number = e.clientX - dragStartX;
        containerRef.current.scrollLeft = scrollLeft - distance;
      }
    }
  };

  const handleDragEnd = () => {
    if (window.innerWidth < 1320) {
      if (containerRef.current) {
        setScrollLeft(containerRef.current.scrollLeft);
        setDragStartX(0);
        containerRef.current.style.cursor = "grab";
      }
    }
  };
  if (containerRef.current) {
    if (window.innerWidth > 1320) {
      containerRef.current.style.cursor = "context-menu";
    }
  }
  useEffect(() => {
    const promises = [
      fetchBanner(dispatchBanners),
      fetchSide(dispatchBanners),
      fetchSpecial(dispatchBanners),
    ];
    Promise.allSettled(promises).then(() => {
      if (containerRef.current) {
        containerRef.current.scrollLeft = 0;
      }
    });
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const settingsSide = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
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

  return (
    <div className="w-full">
      <section className="flex flex-col justify-center items-center py-6">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="w-full flex flex-col py-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full h-full">
              <div className="flex w-full flex-col sm:w-8/12 gap-3 h-full">
                <Suspense fallback={<Skeleton className="w-full h-full" />}>
                  <Slider
                    {...settings}
                    className="overflow-hidden aspect-video rounded-2xl"
                  >
                    {Banners.loading.main
                      ? Array(Banners.main).map((_, index) => (
                          <Suspense
                            key={index}
                            fallback={<div>loading...</div>}
                          >
                            <div className="rounded-2xl w-full sm:h-2/3">
                              <LazyImage
                                key={index}
                                src={defaultImg}
                                alt={`${index}`}
                                width={843}
                                height={480}
                              />
                            </div>
                          </Suspense>
                        ))
                      : null}
                    {Banners.main.map((img, index) => (
                      <Suspense key={index} fallback={<div>loading...</div>}>
                        <div className="rounded-2xl w-full sm:h-2/3">
                          <LazyImage
                            key={index}
                            src={img.image}
                            width={843}
                            height={480}
                            alt={`${index}`}
                          />
                        </div>
                      </Suspense>
                    ))}
                  </Slider>
                </Suspense>
                <div className="flex flex-row gap-3 h-full">
                  {Banners.loading.side ? (
                    <Suspense fallback={<div>loading...</div>}>
                      <div className="rounded-2xl w-full sm:h-1/3 flex gap-3">
                        <LazyImage
                          src={defaultImg}
                          width={405}
                          className="rounded-2xl"
                          height={234}
                          alt="side"
                        />
                        <LazyImage
                          src={defaultImg}
                          width={405}
                          className="rounded-2xl"
                          height={234}
                          alt="side"
                        />
                      </div>
                    </Suspense>
                  ) : null}
                  {Banners.side.slice(0, 2).map((img, index) => (
                    <Suspense key={index} fallback={<div>loading...</div>}>
                      <div
                        key={index}
                        className="rounded-2xl w-[calc(50%-6px)] h-28 sm:h-1/3 sm:w-full cursor-pointer gap-3"
                      >
                        <LazyImage
                          key={index}
                          src={img.image}
                          className="rounded-2xl"
                          onClick={() => openInNewTab(img.link)}
                          width={405}
                          height={234}
                          alt="side"
                        />
                      </div>
                    </Suspense>
                  ))}
                </div>
              </div>
              <div className={`flex w-full flex-col sm:w-4/12 gap-3 h-full`}>
                <Suspense fallback={<Skeleton className="w-full h-full" />}>
                  <Slider {...settingsSide} className="sm:!hidden gap-6">
                    {Banners.loading.side &&
                      Array(Banners.side).map((_, index) => (
                        <Suspense key={index} fallback={<div>loading...</div>}>
                          <div className="rounded-2xl pl-[0.4rem] !w-[calc(100%-6px)] h-28 sm:h-[5.5rem]">
                            <LazyImage
                              key={index}
                              className="rounded-2xl"
                              src={defaultImg}
                              width={405}
                              height={234}
                              alt="side"
                            />
                          </div>
                        </Suspense>
                      ))}
                    {Banners.side.slice(2, 5).map((img, index) => (
                      <Suspense key={index} fallback={<div>loading...</div>}>
                        <div className="rounded-2xl pl-[0.4rem] !w-[calc(100%-6px)] h-28 sm:h-[5.5rem]">
                          <LazyImage
                            key={index}
                            className="rounded-2xl"
                            onClick={() => openInNewTab(img.link)}
                            src={img.image}
                            width={405}
                            height={234}
                            alt="side"
                          />
                        </div>
                      </Suspense>
                    ))}
                  </Slider>
                </Suspense>
                <div className="hidden sm:flex flex-col w-full h-full gap-3">
                  {Banners.loading.side ? (
                    <Suspense fallback={<div>loading...</div>}>
                      <div className="hidden rounded-2xl sm:w-full sm:h-1/3 sm:flex flex-col gap-3 cursor-pointer">
                        <LazyImage
                          src={defaultImg}
                          className="rounded-2xl"
                          alt="side"
                          width={405}
                          height={234}
                        />
                        <LazyImage
                          src={defaultImg}
                          className="bg-cover animate-pulse rounded-2xl cursor-pointer sm:w-full"
                          alt="side"
                          width={405}
                          height={234}
                        />
                        <LazyImage
                          src={defaultImg}
                          className="bg-cover animate-pulse rounded-2xl cursor-pointer sm:w-full"
                          alt="side"
                          width={405}
                          height={234}
                        />
                      </div>
                    </Suspense>
                  ) : null}
                  {Banners.side.slice(2, 5).map((img, index) => (
                    <div
                      key={index}
                      className="rounded-2xl w-full sm:h-1/3 cursor-pointer"
                    >
                      <Suspense key={index} fallback={<div>loading...</div>}>
                        <LazyImage
                          key={index}
                          className="rounded-2xl"
                          onClick={() => openInNewTab(img.link)}
                          src={img.image}
                          width={405}
                          height={234}
                          alt="side"
                        />
                      </Suspense>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-[#8448B2] flex flex-col justify-center items-center">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="w-full my-3 flex flex-col justify-center items-center mt-10">
            <div
              className={`w-full flex items-center justify-center px-8 lg:px-3 xl:px-0`}
              style={{ color: "#FFFFFF" }}
            >
              <Suspense fallback={<div>loading...</div>}>
                <LazyImage
                  loading="lazy"
                  className="!w-7 !h-7"
                  src={presentage}
                  width={28}
                  height={28}
                  alt="presentage"
                />
              </Suspense>
              <span className={`sm:mx-2 mr-2 text-sm sm:text-lg font-semibold`}>
                پیشنهادهای ویژه
              </span>
              <div
                style={{ color: "#FFFFFF" }}
                className="flex-1 md:border-b-4 md:border-dotted md:border-3 sm:mr-3"
              ></div>
            </div>
            <div className="w-full flex justify-between my-6 lg:!overflow-hidden lg:gap-0 overflow-x-scroll gap-3 pr-6 md:pr-0">
              <div
                className={`flex ${Styles.scrollContainer} flex-row justify-between w-full gap-3 lg:!overflow-hidden overflow-x-scroll`}
                ref={containerRef}
                onMouseDown={(e) => handleDragStart(e)}
                onMouseMove={(e) => handleDragMove(e)}
                onMouseUp={() => handleDragEnd()}
                onMouseLeave={() => handleDragEnd()}
              >
                {Banners.special.map((item, index) => (
                  <Suspense fallback={<CardSkeletonProposal />}>
                    <CardProposal
                      Id={item.id}
                      key={index}
                      text={item.company_name}
                      rate={item.rate}
                      offer={[item.discount, item.max_discount]}
                      img={`https://api.aranasayesh.ir/${item.company_image1}`}
                    />
                  </Suspense>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-[#F5F5F5] flex flex-col justify-center items-center">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="w-full lg:mb-24 xl:mb-32 mb-10">
            <div className="mt-10 mx-auto">
              <Suspense fallback={<div>loading...</div>}>
                <LineSpace
                  color={`#4A4A4A`}
                  ClassName={"text-base"}
                  text={"هنری و آموزشی"}
                  icon={
                    <Suspense fallback={<div>loading...</div>}>
                      <LazyImage
                        loading="lazy"
                        className="!w-7 !h-7"
                        width={28}
                        height={28}
                        src={art}
                        alt={"هنری و آموزشی"}
                      />
                    </Suspense>
                  }
                  showMore={true}
                  link={`/Categories/art-edu/1`}
                />
              </Suspense>
              <div className="w-full flex justify-items-start overflow-x-scroll overflow-hidden gap-2 md:gap-3 lg:gap-6 2xl:gap-8 mt-5">
                {isCategoryLoading ? (
                  <CardSkeleton />
                ) : (
                  <Suspense fallback={<div>loading...</div>}>
                    <CategoryItems categoryName={"art-edu"} />
                  </Suspense>
                )}
              </div>
            </div>
            <div className="mt-5 mx-auto">
              <Suspense fallback={<div>loading...</div>}>
                <LineSpace
                  color={`#4A4A4A`}
                  ClassName={"text-base"}
                  text={"زیبایی و آرایشی"}
                  icon={
                    <Suspense fallback={<div>loading...</div>}>
                      <LazyImage
                        loading="lazy"
                        className="!w-7 !h-7"
                        width={28}
                        height={28}
                        src={beauty}
                        alt={"زیبایی و آرایشی"}
                      />
                    </Suspense>
                  }
                  showMore={true}
                  link={`/Categories/beauty/1`}
                />
              </Suspense>
              <div className="w-full flex justify-items-start my-2 overflow-x-scroll overflow-hidden gap-2 md:gap-3 lg:gap-6 2xl:gap-8 mt-5">
                <Suspense fallback={<div>loading...</div>}>
                  <CategoryItems categoryName={"beauty"} />
                </Suspense>
              </div>
            </div>
            <div className="mt-5 mx-auto">
              <Suspense fallback={<div>loading...</div>}>
                <LineSpace
                  color={`#4A4A4A`}
                  ClassName={"text-base"}
                  text={"رستوران و کافی‌شاپ"}
                  icon={
                    <Suspense fallback={<div>loading...</div>}>
                      <LazyImage
                        loading="lazy"
                        className="!w-7 !h-7"
                        width={28}
                        height={28}
                        src={restaurant}
                        alt={"رستوران و کافی‌شاپ"}
                      />
                    </Suspense>
                  }
                  showMore={true}
                  link={`/Categories/restaurant/1`}
                />
              </Suspense>
              <div className="w-full flex justify-items-start my-2 overflow-x-scroll overflow-hidden gap-2 md:gap-3 lg:gap-6 2xl:gap-8 mt-5">
                <Suspense fallback={<div>loading...</div>}>
                  <CategoryItems categoryName={"restaurant"} />
                </Suspense>
              </div>
            </div>
            <div className="mt-5 mx-auto">
              <Suspense fallback={<div>loading...</div>}>
                <LineSpace
                  color={`#4A4A4A`}
                  ClassName={"text-base"}
                  text={"خدمات"}
                  icon={
                    <Suspense fallback={<div>loading...</div>}>
                      <LazyImage
                        loading="lazy"
                        className="!w-7 !h-7"
                        width={28}
                        height={28}
                        src={services}
                        alt={"خدمات"}
                      />
                    </Suspense>
                  }
                  showMore={true}
                  link={`/Categories/services/1`}
                />
              </Suspense>
              <div className="w-full flex justify-items-start my-2 overflow-x-scroll overflow-hidden gap-2 md:gap-3 lg:gap-6 2xl:gap-8 mt-5">
                <Suspense fallback={<div>loading...</div>}>
                  <CategoryItems categoryName={"services"} />
                </Suspense>
              </div>
            </div>
            <div className="mt-5 mx-auto">
              <Suspense fallback={<div>loading...</div>}>
                <LineSpace
                  color={`#4A4A4A`}
                  ClassName={"text-base"}
                  text={"تفریحی ورزشی"}
                  icon={
                    <Suspense fallback={<div>loading...</div>}>
                      <LazyImage
                        loading="lazy"
                        className="!w-7 !h-7"
                        width={28}
                        height={28}
                        src={sport}
                        alt={"تفریحی ورزشی"}
                      />
                    </Suspense>
                  }
                  showMore={true}
                  link={`/Categories/sportive/1`}
                />
              </Suspense>
              <div className="w-full flex justify-items-start my-2 overflow-x-scroll overflow-hidden gap-2 md:gap-3 lg:gap-6 2xl:gap-8 mt-5">
                <Suspense fallback={<div>loading...</div>}>
                  <CategoryItems categoryName={"sportive"} />
                </Suspense>
              </div>
            </div>
            <div className="mt-5 mx-auto">
              <Suspense fallback={<div>loading...</div>}>
                <LineSpace
                  color={`#4A4A4A`}
                  ClassName={"text-base"}
                  text={"پزشکی وسلامت"}
                  icon={
                    <Suspense fallback={<div>loading...</div>}>
                      <LazyImage
                        loading="lazy"
                        className="!w-7 !h-7"
                        width={28}
                        height={28}
                        src={treatment}
                        alt={"پزشکی وسلامت"}
                      />
                    </Suspense>
                  }
                  showMore={true}
                  link={`/Categories/treatment/1`}
                />
              </Suspense>
              <div className="w-full flex justify-items-start my-2 overflow-x-scroll overflow-hidden gap-2 md:gap-3 lg:gap-6 2xl:gap-8 mt-5">
                <Suspense fallback={<div>loading...</div>}>
                  <CategoryItems categoryName={"treatment"} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full flex flex-col justify-center items-center">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="w-full xl:grid xl:grid-cols-4 xl:justify-center 2xl:justify-evenly xl:gap-8 ">
            <div className="order-2 xl:flex col-span-2 xl:justify-center xl:flex-col max-w-full">
              <h1 className="text-xl md:text-2xl sm:text-xl font-semibold text-[#303030] py-5 lg:py-2">
                با اپلیکیشن آران آسایش، ساده‌تر از همیشه تخفیف بگیر!
              </h1>
              <p
                role="text"
                lang="fa"
                className="!text-base md:text-sm font-light text-[#717171] text-justify pb-6"
              >
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
                نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
                کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
                جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را
                برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
                زبان فارسی ایجاد کرد.
              </p>
            </div>
            <div className="bottom-0 lg:relative lg:order-1 hidden xl:inline-flex">
              <Suspense fallback={<div>loading...</div>}>
                <LazyImage
                  loading="lazy"
                  src={app_phone}
                  className="lg:!w-[272px] lg:!h-[378px]"
                  width={272}
                  height={378}
                  alt="app_phone"
                />
              </Suspense>
            </div>

            <div className="flex items-center justify-between order-2">
              <Suspense fallback={<div>loading...</div>}>
                <LazyImage
                  loading="lazy"
                  src={app_phone}
                  className="xl:hidden xl:order-1 !w-[189px] !h-[263px]"
                  width={189}
                  height={263}
                  alt="app_phone"
                />
              </Suspense>
              <div className="flex flex-col justify-center lg:gap-8 xl:gap-28 lg:order-2">
                <div className="w-full lg:w-auto flex flex-col items-center gap-1 sm:gap-3">
                  <div className="lg:flex items-center justify-center lg:justify-start">
                    <Link
                      id="RouterNavLink"
                      to={"https://api.aranasayesh.ir/app/download/"}
                      className="w-full rounded-2xl lg:w-auto bg-[#F5F5F5] text-gray-700 hover:!bg-transparent items-center justify-center lg:mb-0 py-4 lg:px-[49px] px-[11px] flex gap-1"
                    >
                      <HiDownload className="lg:w-[34px] lg:h-[32px] w-[16px] h-[16px] text-[#7F38B7]" />
                      <span className="block antialiased text-gray-700 text-sm lg:text-2xl font-semibold transition-colors bg-transparent xs:w-max">
                        دانلود مستقیم
                      </span>
                    </Link>
                  </div>
                  <div className="lg:flex items-center justify-center">
                    <button disabled>
                      <div
                        id="RouterNavLink"
                        className="w-full rounded-2xl lg:w-auto bg-[#F5F5F5] text-gray-700 hover:!bg-transparent items-center justify-center lg:mb-0 py-4 lg:px-[40px] px-[11px] flex gap-1 opacity-40"
                      >
                        <Suspense fallback={<div>loading...</div>}>
                          <LazyImage
                            loading="lazy"
                            src={bazar}
                            className="w-[34px] h-[34px] xs:w-[15px] xs:h-[15px]"
                            width={34}
                            height={34}
                            alt="bazar"
                          />
                        </Suspense>

                        <span className="block antialiased text-gray-700 text-base xs:text-sm lg:text-2xl font-semibold transition-colors bg-transparent xs:w-max">
                          دانلود از کافه بازار
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
