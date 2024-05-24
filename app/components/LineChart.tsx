import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

const MyAreaChart = (DiscountHistory:any) => {
  // تولید داده‌ها برای نمونه
  const data = Array.from({ length: 30 }, (_, index) => ({
    name: index + 1,
    value: DiscountHistory.DiscountHistory.DiscountHistory[index], // مقادیر تصادفی بین 0 تا 1 میلیون
  }));

  return (
    <div
      style={{
        width: "100%",
        height: "400px",
        overflowX: "scroll",
        userSelect: "none",
        direction: "ltr",
      }}
    >
      <ResponsiveContainer
        width="100%"
        height="100%"
        minWidth="800px"
        className="cursor-pointer"
      >
        <AreaChart
          data={data}
          width={500}
          height={400}
          margin={{
            top: 5,
            right: 30,
            left: 30,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0,100 ]} >
            <Label
              style={{
                fontSize: "100%",
                marginRight:30,
                marginLeft: 30,
              }}
            />
          </YAxis>
          <Tooltip labelClassName="" label='تعداد خرید' />
          <Area
            className="cursor-grab"
            type="monotone"
            dataKey="value"
            stroke="#8D2DCD99"
            fill="#8D2DCD99"
            dot={{ stroke: "#8D2DCD99", fill: "#8D2DCD99" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyAreaChart;
