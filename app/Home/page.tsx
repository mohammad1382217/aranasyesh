import Styles from "./Home.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
import { HiDownload } from "react-icons/hi";
import {
  BannerReducer,
  initialBanner,
} from "../api/Slices/BannersSlice/Banners";
import { fetchBanner } from "../api/fetchBanner";
import { fetchSide } from "../api/fetchSide";
import { fetchSpecial } from "../api/fetchSpecial";
import LineSpace from "../components/lineSpace";
import { Link } from "react-router-dom";
import CategoryItems from "../components/CategoryItems";
import CardSkeleton from "../components/CardSkeleton";
import Context, { ContextType } from "../api/context";

const Slider = React.lazy(() =>
  import("react-slick").then((module) => ({ default: module.default }))
);
const CardProposal = lazy(() => import("../components/CardProposal"));
const Button = lazy(() => import("@material-tailwind/react/components/Button"));
const CardSkeletonProposal = lazy(
  () => import("../components/CardSkeletonProposal")
);
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
      <section className="flex flex-col justify-center items-center p-6">
        <div className="container mx-auto xl:px-7">
          <div className="w-full flex flex-col py-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full h-full">
              <div className="flex w-full flex-col sm:w-8/12 gap-3 h-full">
                <Slider
                  {...settings}
                  className="overflow-hidden aspect-video rounded-2xl"
                >
                  {Banners.loading.main
                    ? Array(Banners.main).map((_, index) => (
                        <Suspense key={index} fallback={<div>loading...</div>}>
                          <LazyImage
                            key={index}
                            src={defaultImg}
                            className="rounded-2xl h-2/3 animate-pulse"
                            alt={`${index}`}
                            width={843}
                            height={480}
                          />
                        </Suspense>
                      ))
                    : null}
                  {Banners.main.map((img, index) => (
                    <Suspense key={index} fallback={<div>loading...</div>}>
                      <LazyImage
                        key={index}
                        className="rounded-2xl w-full sm:h-2/3"
                        src={img.image}
                        width={843}
                        height={480}
                        alt={`${index}`}
                      />
                    </Suspense>
                  ))}
                </Slider>
                <div className="flex flex-row gap-3 h-full">
                  {Banners.loading.side ? (
                    <Suspense fallback={<div>loading...</div>}>
                      <div className="rounded-2xl flex w-full h-28 sm:h-1/3 gap-3 cursor-pointer">
                        <LazyImage
                          src={defaultImg}
                          className="rounded-2xl"
                          width={405}
                          height={234}
                          alt="side"
                        />
                        <LazyImage
                          src={defaultImg}
                          className="rounded-2xl"
                          width={405}
                          height={234}
                          alt="side"
                        />
                      </div>
                    </Suspense>
                  ) : null}
                  {Banners.side.slice(0, 2).map((img, index) => (
                    <div
                      key={index}
                      className="rounded-2xl w-[calc(50%-6px)] h-28 sm:h-1/3 sm:w-full cursor-pointer gap-3"
                    >
                      <Suspense key={index} fallback={<div>loading...</div>}>
                        <LazyImage
                          key={index}
                          className="rounded-2xl"
                          src={img.image}
                          onClick={() => openInNewTab(img.link)}
                          width={405}
                          height={234}
                          alt="side"
                        />
                      </Suspense>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className={`flex w-full flex-col sm:w-4/12 gap-3 h-full ${Styles.scrollContainer}`}
              >
                <Slider {...settingsSide} className="sm:!hidden gap-6">
                  {Banners.loading.side &&
                    Array(Banners.side).map((_, index) => (
                      <Suspense key={index} fallback={<div>loading...</div>}>
                        <LazyImage
                          key={index}
                          src={defaultImg}
                          className="sm:w-full rounded-2xl pl-[0.4rem] !w-[calc(100%-6px)] h-28 sm:h-[5.5rem]"
                          width={405}
                          height={234}
                          alt="side"
                        />
                      </Suspense>
                    ))}
                  {Banners.side.slice(2, 5).map((img, index) => (
                    <Suspense key={index} fallback={<div>loading...</div>}>
                      <LazyImage
                        key={index}
                        onClick={() => openInNewTab(img.link)}
                        className="sm:w-full rounded-2xl pl-[0.4rem] !w-[calc(100%-6px)] h-28 sm:h-[5.5rem]"
                        src={img.image}
                        width={405}
                        height={234}
                        alt="side"
                      />
                    </Suspense>
                  ))}
                </Slider>
                <div className="hidden sm:flex flex-col w-full h-full gap-3">
                  {Banners.loading.side ? (
                    <Suspense fallback={<div>loading...</div>}>
                      <div className="hidden rounded-2xl sm:w-full sm:h-1/3 sm:flex flex-col gap-3 cursor-pointer">
                        <LazyImage
                          loading="lazy"
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
                          onClick={() => openInNewTab(img.link)}
                          className="sm:w-full rounded-2xl cursor-pointer"
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
        <div className="container mx-auto xl:px-4">
          <div className="w-full my-3 flex flex-col justify-center items-center mt-10 sm:px-4">
            <div
              className={`w-full flex items-center justify-center px-8 lg:px-3 xl:px-0`}
              style={{ color: "#FFFFFF" }}
            >
              <Suspense fallback={<div>loading...</div>}>
                <LazyImage
                  loading="lazy"
                  className="w-7 h-7"
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
                  <CardProposal
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
          </div>
        </div>
      </section>
      <section className="w-full bg-[#F5F5F5] flex flex-col justify-center items-center">
        <div className="container mx-auto pr-6 xl:pr-7">
          <div className="w-full lg:mb-24 xl:mb-32 mb-10">
            <div className="mt-10 mx-auto">
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
              <div className="w-full flex justify-items-start overflow-x-scroll overflow-hidden gap-2 md:gap-3 lg:gap-6 2xl:gap-8 md:px-4 mt-5">
                {isCategoryLoading ? (
                  <CardSkeleton />
                ) : (
                  <CategoryItems categoryName={"art-edu"} />
                )}
              </div>
            </div>
            <div className="mt-5 mx-auto">
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
              <div className="w-full flex justify-items-start my-2 overflow-x-scroll overflow-hidden gap-2 md:gap-3 lg:gap-6 2xl:gap-8 md:px-4 mt-5">
                <CategoryItems categoryName={"beauty"} />
              </div>
            </div>
            <div className="mt-5 mx-auto">
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
              <div className="w-full flex justify-items-start my-2 overflow-x-scroll overflow-hidden gap-2 md:gap-3 lg:gap-6 2xl:gap-8 md:px-4 mt-5">
                <CategoryItems categoryName={"restaurant"} />
              </div>
            </div>
            <div className="mt-5 mx-auto">
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
              <div className="w-full flex justify-items-start my-2 overflow-x-scroll overflow-hidden gap-2 md:gap-3 lg:gap-6 2xl:gap-8 md:px-4 mt-5">
                <CategoryItems categoryName={"services"} />
              </div>
            </div>
            <div className="mt-5 mx-auto">
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
              <div className="w-full flex justify-items-start my-2 overflow-x-scroll overflow-hidden gap-2 md:gap-3 lg:gap-6 2xl:gap-8 md:px-4 mt-5">
                <CategoryItems categoryName={"sportive"} />
              </div>
            </div>
            <div className="mt-5 mx-auto">
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
              <div className="w-full flex justify-items-start my-2 overflow-x-scroll overflow-hidden gap-2 md:gap-3 lg:gap-6 2xl:gap-8 md:px-4 mt-5">
                <CategoryItems categoryName={"treatment"} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full flex flex-col justify-center items-center xl:h-[327px] ">
        <div className="container mx-auto px-8 xl:px-4">
          <div className="w-full lg:h-72 bg-white flex flex-row justify-center items-center">
            <div className="w-full lg:flex lg:justify-center 2xl:justify-between lg:gap-8">
              <div className="order-2 lg:w-10/12 lg:-mr-32 lg:flex lg:justify-center lg:flex-col lg:max-w-md xl:max-w-xl">
                <h1 className="text-xl md:text-lg sm:text-xl font-semibold text-[#303030] py-5 lg:py-2">
                  با اپلیکیشن آران آسایش، ساده‌تر از همیشه تخفیف بگیر!
                </h1>
                <p
                  lang="fa"
                  className="text-base md:text-sm sm:text-base font-light text-[#717171] text-justify pb-6"
                >
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                  با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی
                  تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای
                  کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و
                  آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم
                  افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص
                  طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد.
                </p>
              </div>
              <Suspense fallback={<div>loading...</div>}>
                <div className="lg:bottom-14 xl:bottom-9 lg:-right-16 lg:relative !h-[400px] lg:order-1 hidden lg:inline-flex">
                  <LazyImage
                    loading="lazy"
                    src={app_phone}
                    className="!w-[419px]"
                    width={419}
                    height={400}
                    alt="app_phone"
                  />
                </div>
              </Suspense>

              <div className="flex items-center justify-between order-2">
                <Suspense fallback={<div>loading...</div>}>
                  <LazyImage
                    loading="lazy"
                    src={app_phone}
                    className="lg:hidden lg:order-1 !h-[180px]"
                    width={189}
                    height={180}
                    alt="app_phone"
                  />
                </Suspense>
                <div className="flex flex-col justify-center lg:gap-8 xl:gap-28 lg:order-2">
                  <div className="w-full lg:w-auto flex flex-col items-center gap-1 sm:gap-3">
                    <div className="lg:flex items-center justify-center lg:justify-start">
                      <Button
                        className="w-full rounded-2xl lg:w-auto flex bg-[#F5F5F5] text-gray-700 hover:!bg-transparent items-center justify-center lg:mb-0 px-4 py-[11px]"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        <HiDownload className="w-7 h-7 text-[#7F38B7] ml-1" />
                        <Link
                          id="RouterNavLink"
                          // style={None}
                          to={"https://api.aranasayesh.ir/app/download/"}
                        >
                          <span className="block antialiased text-gray-700 text-xs lg:text-base font-semibold transition-colors bg-transparent">
                            دانلود مستقیم
                          </span>
                        </Link>
                      </Button>
                    </div>
                    <div className="lg:flex items-center justify-center">
                      <Button
                        className="w-full lg:w-auto rounded-2xl flex bg-[#F5F5F5] text-gray-700 hover:!bg-transparent items-center justify-center lg:mb-0 px-4 py-[11px]"
                        placeholder={undefined}
                        disabled={true}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        <Suspense fallback={<div>loading...</div>}>
                          <LazyImage
                            loading="lazy"
                            src={bazar}
                            className="w-8 h-8 sm:w-6 sm:h-6 ml-1"
                            width={32}
                            height={32}
                            alt="bazar"
                          />
                        </Suspense>

                        <span className="block antialiased text-gray-700 ml-2 text-xs lg:text-base font-semibold transition-colors bg-transparent">
                          دانلود از کافه بازار
                        </span>
                      </Button>
                    </div>
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
