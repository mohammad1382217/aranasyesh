import DatePicker, { DateObject } from "react-multi-date-picker";
import { type CustomInputProps, weekDays } from "../../ProfileOne/page";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import persian_en from "react-date-object/locales/persian_en";
import noteText from "../../assets/svg/note-text.svg";
import { Suspense, useReducer, useState } from "react";
import { fetchSpecific_date } from "../../api/fetchSpecific_date";
import {
  initialtransactionData,
  transactionDataReducer,
} from "../../api/Slices/SelectDateSlice/SelectDate";
import React from "react";

const Button = React.lazy(() =>
  import("flowbite-react").then((module) => ({ default: module.Button }))
);
const Table = React.lazy(() =>
  import("flowbite-react").then((module) => ({ default: module.Table }))
);
const TableBody = React.lazy(() =>
  import("flowbite-react").then((module) => ({ default: module.TableBody }))
);
const TableCell = React.lazy(() =>
  import("flowbite-react").then((module) => ({ default: module.TableCell }))
);
const TableHead = React.lazy(() =>
  import("flowbite-react").then((module) => ({ default: module.TableHead }))
);
const TableHeadCell = React.lazy(() =>
  import("flowbite-react").then((module) => ({ default: module.TableHeadCell }))
);
const TableRow = React.lazy(() =>
  import("flowbite-react").then((module) => ({ default: module.TableRow }))
);
const LazyImage = React.lazy(() => import("../../components/LazyImage"));

const theme = {
  root: {
    base: "w-full text-left text-sm text-gray-500 dark:text-gray-400",
    shadow:
      "absolute left-0 top-0 -z-10 h-full w-full drop-shadow-md dark:bg-black",
    wrapper: "relative",
  },
  body: {
    base: "group/body",
    cell: {
      base: "px-6 py-4",
    },
  },
  head: {
    base: "group/head text-xs uppercase text-gray-700 dark:text-gray-400",
    cell: {
      base: "bg-gray-50 px-6 py-3",
    },
  },
  row: {
    base: "group/row",
    hovered: "hover:bg-gray-50 dark:hover:bg-gray-600",
    striped:
      "odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700",
  },
};

const DateInput: React.FC<CustomInputProps> = ({
  onFocus,
  value,
  onChange,
}) => {
  return (
    <div className="inline-flex items-center">
      <LazyImage
        onClick={onFocus as React.MouseEventHandler<HTMLImageElement>}
        className="relative right-8 cursor-pointer !w-7 !h-7"
        src={noteText}
        alt=""
        loading={undefined}
        width={undefined}
        height={undefined}
      />
      <input
        dir="ltr"
        onFocus={onFocus as React.FocusEventHandler<HTMLInputElement>}
        onChange={onChange}
        type="text"
        className="block outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#7F38B7] focus:border-[#7F38B7] w-full py-1.5 px-3 ml-8"
        placeholder="روز / ماه / سال"
        autoComplete="off"
        value={value}
      />
    </div>
  );
};

const SelectDate: React.FC = () => {
  const [showTable, setShowTable] = useState(false);
  const [transaction, dispatchTransactionData] = useReducer(
    transactionDataReducer,
    initialtransactionData
  );
  const [date, setDate] = useState<DateObject | null>();
  return (
    <>
      <div className="w-full flex items-center justify-between gap-4">
        <h1 className="text-[#7F38B7] self-center md:self-start text-2xl sm:text-3xl font-semibold">
          لیست تراکنش‌ها
        </h1>
      </div>
      <section className="w-full flex flex-col items-center justify-between">
        <div className="w-full flex flex-col items-center justify-between gap-8">
          <h2 className="text-[#7F38B7] self-center md:self-start text-sm sm:text-base font-semibold text-justify">
            لطفا تاریخ مدنظر خود را جهت مشاهده لیست تراکنش‌ها وارد نمایید یا بر
            روی دکمه مشاهده 20 تراکنش اخیر کلیک نمایید.
          </h2>
          <div className="flex flex-col mx-auto sm:mx-0 sm:flex-row self-start items-center gap-6">
            <DatePicker
              name={"date"}
              value={date}
              render={<DateInput />}
              onChange={(date: DateObject) => {
                setDate(date);
                if (date instanceof DateObject) {
                  // handleChange(date)
                  const newDate = date
                    ?.convert(persian, persian_en)
                    .format()
                    .toString()
                    .replace(/\//g, "-");
                  fetchSpecific_date(dispatchTransactionData, newDate);
                  setShowTable(false);
                  // fetchListValues(`${da}`);
                }
              }}
              weekDays={weekDays}
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-center"
              inputClass="block outline-0 bg-white h-10 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1.5 px-3"
              placeholder="تاریخ تولد"
            />

            <span>یا</span>
            <Button
              className={`${
                showTable
                  ? "bg-[#7F38B7] text-white border-[#7F38B7]"
                  : "bg-[#F5F5F5] border-[#F5F5F5] text-[#717171]"
              }`}
              onClick={() => {
                fetchSpecific_date(dispatchTransactionData, "");
                setShowTable(!showTable);
                setDate(null);
              }}
            >
              مشاهده 20 تراکنش اخیر
            </Button>
          </div>
          <div className="w-full overflow-x-auto">
            <Suspense fallback={<div>Loading...</div>}>
              <Table
                theme={theme}
                className="w-[50rem] lg:!w-full overflow-x-scroll"
                striped
              >
                <TableHead className="bg-[#8754AF] w-full">
                  {[
                    "ردیف",
                    "تاریخ تراکنش",
                    "نام",
                    "نام خانوادگی",
                    "کد کاربری",
                    "قیمت سرویس",
                    "تخفیف",
                    "قیمت با تخفیف",
                  ].map((name) => (
                    <TableHeadCell
                      key={name}
                      className="bg-[#8754AF] text-white text-center px-3"
                    >
                      {name}
                    </TableHeadCell>
                  ))}
                </TableHead>
                <TableBody className="divide-y !w-auto ">
                  {transaction.transactionData.map((item, index) => (
                    <TableRow key={index} className="bg-blue-gray-600 ">
                      <TableCell className="right">{index + 1}</TableCell>
                      <TableCell className="right">{item.created}</TableCell>
                      <TableCell className="right">{item.first_name}</TableCell>
                      <TableCell className="right">{item.last_name}</TableCell>
                      <TableCell className="right">
                        {item.customer_code}
                      </TableCell>
                      <TableCell className="right">
                        {item.original_price}
                      </TableCell>
                      <TableCell className="right">
                        {item.discount} درصد
                      </TableCell>
                      <TableCell className="right">
                        {item.discount_price}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
};

export default SelectDate;
