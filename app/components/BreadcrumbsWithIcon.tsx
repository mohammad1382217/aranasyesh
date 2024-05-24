import { Breadcrumbs } from "@material-tailwind/react";
import home from "../assets/svg/home.svg";
import { Link } from "react-router-dom";
import LazyImage from "./LazyImage";

export const BreadcrumbsWithIcon: React.FC<BreadcrumbsWithIconProps> = ({
  Address,
}) => {
  return (
    <Breadcrumbs
      className="bg-[#ECECEC]"
      placeholder={undefined}
      separator={">"}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <Link to="/home" className="opacity-60">
        <LazyImage className="h-4 w-4" src={home} alt="home" width={16} height={16} />
      </Link>
      {Address.map((item, index) =>
        Address.length - 1 !== index ? (
          <Link key={index} onClick={item.click} to={item.link!} className="opacity-60">
            {item.lable}
          </Link>
        ) : (
          <Link key={index} onClick={item.click} to={item.link!} className="text-[#8754AF]">
            {item.lable}
          </Link>
        )
      )}
    </Breadcrumbs>
  );
};

// Types
interface BreadcrumbsWithIconProps {
  Address: Address[];
}

interface Address {
  lable: string;
  link?: string;
  click?: React.MouseEventHandler<HTMLAnchorElement>
}