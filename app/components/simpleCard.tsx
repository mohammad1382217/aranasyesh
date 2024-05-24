import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import LazyImage from "./LazyImage";

export const SimpleCard: React.FC<SimpleCardProps> = ({
  header,
  headerClass,
  text,
  cardClass,
  ImageClass,
  Image,
  price,
  Button,
}) => {
  return (
    <Card
      className={`relative mt-24 w-1/3 py-4 px-6 rounded-2xl border-4 border-white ${cardClass}`}
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <CardBody
        placeholder={undefined}
        className="p-0 xl:p-2 text-justify self-start"
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <LazyImage className={`absolute ${ImageClass}`} src={Image!} alt="" width={240} height={176} />
        <Typography
          variant="h5"
          color="white"
          className={`mb-5 ${headerClass}`}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {header}
        </Typography>
        <Typography
          className="text-white"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {text}
        </Typography>
      </CardBody>
      <CardFooter
        className="w-full px-0 flex flex-col lg:flex-row items-center justify-start gap-5 text-white"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {Button}
        <span>{price}</span>
      </CardFooter>
    </Card>
  );
};

// Types
interface SimpleCardProps {
  header: React.ReactNode;
  headerClass?: string;
  text: React.ReactNode;
  Image?: string;
  cardClass?: string;
  ImageClass?: string;
  price?: string;
  Button: React.ReactNode;
}
