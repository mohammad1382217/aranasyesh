import React, { useEffect, useReducer, useState } from "react";
import question from "../assets/svg/question.svg";
import Accordion from "@material-tailwind/react/components/Accordion";
import AccordionHeader from "@material-tailwind/react/components/Accordion/AccordionHeader";
import AccordionBody from "@material-tailwind/react/components/Accordion/AccordionBody";
import fetchFAQ from "../api/fetchFaq";
import {
  FAQ,
  FAQReducer,
  initialFAQ,
} from "../api/Slices/FAQSlice/faq";

const Button = React.lazy(() => import("../components/flowbite-react/button"));
const LazyImage = React.lazy(() => import("../components/LazyImage"));

const Icon = ({ id, open }: { id: number; open: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
};

const Questions = () => {
  const [open, setOpen] = React.useState(0);
  const [FAQState, dispatchFAQ] = useReducer(FAQReducer, initialFAQ);
  const [isActiveUser, setIsActiveUser] = useState(false);
  const [isActivezir, setIsActivezir] = useState(false);
  const [User, setUser] = useState<FAQ[]>([]);
  const [zir, setzir] = useState<FAQ[]>([]);

  // const cleanuptwo = fetchCities(dispatchCities, formData.province);
  // return cleanuptwo;

  useEffect(() => {
    const cleanupfaq = fetchFAQ(dispatchFAQ);
    return cleanupfaq;
  }, []);

  useEffect(() => {
    categorizeData();
  }, [FAQState.FAQ]);

  const categorizeData = () => {
    const userItems: FAQ[] = [];
    const collectionItems: FAQ[] = [];

    FAQState.FAQ.forEach((item) => {
      if (item.category === "U") {
        userItems.push(item);
      } else if (item.category === "C") {
        collectionItems.push(item);
      }
    });

    setUser(userItems);
    setzir(collectionItems);
  };

  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  return (
    <div className="flex flex-col items-center w-full h-full bg-[#F5F5F5] gap-10">
      <section className="container mx-auto my-10 flex flex-col items-center md:!flex-row-reverse p-10 w-11/12 lg:w-10/12 bg-[#FFFFFF] rounded-2xl gap-8">
        <div className="w-full flex flex-col justify-center lg:justify-start items-start text-justify ">
          <div className="w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-5">
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-center">
                <div className="flex flex-col">
                  <h1 className="flex items-center justify-center text-3xl sm:text-5xl lg:justify-start  lg:text-6xl text-[#7F38B7] font-semibold p-6">
                    سوالی دارید؟
                  </h1>
                  <h2 className="flex items-center justify-center lg:justify-start text-sm xs:!text-sm sm:text-xl lg:text-4xl font-semibold p-4">
                    ما اینجا هستیم تا پاسخگوی شما باشیم.
                  </h2>
                  <div className="w-full flex flex-col lg:flex-row gap-4 lg:pt-10 lg:pb-5">
                    <Button
                      className={`${
                        isActiveUser
                          ? "bg-[#8754AF] text-[#F5F5F5]"
                          : "text-[#8754AF] bg-[#F5F5F5]"
                      } text-sm border-none font-bold`}
                      onClick={() => {
                        setIsActiveUser(true);
                        setIsActivezir(false);
                      }}
                    >
                      کاربران
                    </Button>
                    <Button
                      className={`${
                        isActivezir
                          ? "bg-[#8754AF] text-[#F5F5F5]"
                          : "text-[#8754AF] bg-[#F5F5F5]"
                      } text-sm border-none font-bold`}
                      onClick={() => {
                        setIsActivezir(true);
                        setIsActiveUser(false);
                      }}
                    >
                      مجموعه‌ها و زیر‌مجموعه‌ها
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <LazyImage className="!w-[325px] !h-[325px]" src={question} alt="" width={325} height={326} />
            </div>
          </div>
          <div className="h-[1px] mx-auto my-6 w-full bg-[#C8C8C8]"></div>
          {isActiveUser
            ? User.map((items) => (
                <Accordion
                  open={open === 1}
                  icon={<Icon id={1} open={open} />}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <AccordionHeader
                    className="text-right border-none !text-sm md:text-sm lg:text-lg bg-[#F5F5F5] rounded-2xl py-2 px-2 lg:px-6 flex gap-4"
                    onClick={() => handleOpen(1)}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: items.question,
                      }}
                    />
                  </AccordionHeader>
                  <AccordionBody>
                    <div className="pr-6"
                      dangerouslySetInnerHTML={{
                        __html: items.answer,
                      }}
                    />
                  </AccordionBody>
                </Accordion>
              ))
            : zir.map((items) => (
                <Accordion
                  open={open === 1}
                  icon={<Icon id={1} open={open} />}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <AccordionHeader
                    className="text-right border-none !text-sm md:text-sm lg:text-lg bg-[#F5F5F5] rounded-2xl py-2 px-2 lg:px-6 flex gap-4"
                    onClick={() => handleOpen(1)}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: items.question,
                      }}
                    />
                  </AccordionHeader>
                  <AccordionBody>
                    <div className="pr-6"
                      dangerouslySetInnerHTML={{
                        __html: items.answer,
                      }}
                    />
                  </AccordionBody>
                </Accordion>
              ))}
        </div>
      </section>
    </div>
  );
};

export default Questions;
