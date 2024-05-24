import React, { useEffect, useReducer } from "react";
import MyAreaChart from "../../components/LineChart";
import { DiscountHistoryReducer, initialDiscountHistory } from "../../api/Slices/DiscountHistorySlice/DiscountHistory";
import { fetchDiscountHistory } from "../../api/fetchDiscountHistory";

const DiscountHistory = () => {
  const [ReducerDiscount, dispatchDiscount]= useReducer(DiscountHistoryReducer,initialDiscountHistory);

  useEffect(()=>{
    fetchDiscountHistory(dispatchDiscount);
  },[])
  return (
    <>
      <div className="w-full flex items-center justify-between gap-4">
        <h1 className="text-[#7F38B7] self-center md:self-start text-2xl sm:text-3xl font-semibold">
          گزارش خرید طی 30 روز گذشته
        </h1>
      </div>
      <section className="relative w-full flex flex-col items-center justify-between overflow-hidden">
        <MyAreaChart DiscountHistory={ReducerDiscount}/>
      </section>
    </>
  );
};

export default DiscountHistory;
