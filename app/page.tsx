import "./globals.scss";
import { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
const Home = lazy(() => import("./Home/page"));
const Blog = lazy(() => import("./Blogs/page"));
const RootLayout = lazy(() => import("./layout"));
const RootLayoutAdmin = lazy(() => import("./(Panel)/layout"));
const AboutUs = lazy(() => import("./AboutUs/page"));
const OurGoals = lazy(() => import("./OurGoals/page"));
const Services = lazy(() => import("./Services/page"));
const BlogPost = lazy(() => import("./BlogPost/page"));
const Questions = lazy(() => import("./Questions/page"));
const OurHistory = lazy(() => import("./OurHistory/page"));
const WorkWithUs = lazy(() => import("./WorkwithUs/page"));
const ProfileOne = lazy(() => import("./ProfileOne/page"));
const ProfileTwo = lazy(() => import("./profileTwo/page"));
const Page404 = lazy(() => import("./[...not-found]/page"));
const Application = lazy(() => import("./Application/page"));
const BuySubscription = lazy(() => import("./BuySubscription/page"));
const ConfirmCode = lazy(() => import("./(Panel)/ConfirmCode/page"));
const DiscountHistory = lazy(() => import("./(Panel)/DiscountHistory/page"));
const SelectDate = lazy(() => import("./(Panel)/SelectDate/page"));
const SubCategory = lazy(() => import("./subcategory/page"));
const SearchPage = lazy(() => import("./SearchPage/Page"));
const Authorized = lazy(() => import("./components/Authoration"));
const TransactionPage = lazy(
  () => import("./BuySubscription/Transaction/page")
);
const Categories = lazy(() => import("./categories/page"));
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Loading from "./components/loading";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "Questions",
        element: (
          <Suspense fallback={<Loading />}>
            <Questions />
          </Suspense>
        ),
      },
      {
        path: "BuySubscription",
        element: (
          <Suspense fallback={<Loading />}>
            <BuySubscription />
          </Suspense>
        ),
      },
      {
        path: "BuySubscription/Transaction/",
        element: (
          <Suspense fallback={<Loading />}>
            <TransactionPage />
          </Suspense>
        ),
      },
      {
        path: "AboutUs",
        element: (
          <Suspense fallback={<Loading />}>
            <AboutUs />
          </Suspense>
        ),
      },
      {
        path: "OurGoals",
        element: (
          <Suspense fallback={<Loading />}>
            <OurGoals />
          </Suspense>
        ),
      },
      {
        path: "Services/:Id",
        element: (
          <Suspense fallback={<Loading />}>
            <Services />
          </Suspense>
        ),
      },
      {
        path: "Application",
        element: (
          <Suspense fallback={<Loading />}>
            <Application />
          </Suspense>
        ),
      },
      {
        path: "OurHistory",
        element: (
          <Suspense fallback={<Loading />}>
            <OurHistory />
          </Suspense>
        ),
      },
      {
        path: "WorkWithUs",
        element: (
          <Suspense fallback={<Loading />}>
            <WorkWithUs />
          </Suspense>
        ),
      },
      {
        path: "Categories/:Name/:page",
        element: (
          <Suspense fallback={<Loading />}>
            <Categories />
          </Suspense>
        ),
      },
      {
        path: "Category/:Name/subCategory/:sub_categories_name",
        element: (
          <Suspense fallback={<Loading />}>
            <SubCategory />
          </Suspense>
        ),
      },
      {
        path: "search",
        element: (
          <Suspense fallback={<Loading />}>
            <SearchPage />
          </Suspense>
        ),
      },
      {
        path: "Blog",
        element: (
          <Suspense fallback={<Loading />}>
            <Blog />
          </Suspense>
        ),
      },
      {
        path: "blog/BlogPost/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <BlogPost />
          </Suspense>
        ),
      },
      {
        path: "ProfileOne",
        element: (
          <Suspense fallback={<Loading />}>
            <ProfileOne />
          </Suspense>
        ),
      },
      {
        path: "ProfileTwo",
        element: (
          <Suspense fallback={<Loading />}>
            <ProfileTwo />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "CCP/",
    element: <RootLayoutAdmin />,
    children: [
      {
        path: "",
        element: <Navigate to={"ConfirmCode"} replace={true} />,
      },
      // {
      //   path: "ccp",
      //   element: (
      //     <Authorized>
      //       <CCP />
      //     </Authorized>
      //   ),
      // },
      {
        path: "DiscountHistory",
        element: (
          <Suspense fallback={<Loading />}>
            <Authorized>
              <DiscountHistory />
            </Authorized>
          </Suspense>
        ),
      },
      {
        path: "ConfirmCode",
        element: (
          <Suspense fallback={<Loading />}>
            <Authorized>
              <ConfirmCode />
            </Authorized>
          </Suspense>
        ),
      },
      {
        path: "SelectDate",
        element: (
          <Suspense fallback={<Loading />}>
            <Authorized>
              <SelectDate />
            </Authorized>
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<Loading />}>
    <RouterProvider router={router} />
  </Suspense>
);
