import React from "react";
import axiosInstance from "../api/apiConfig";
import Styles from "../Home/Home.module.scss";
import CardSkeleton from "./CardSkeleton";
const CardComponent = React.lazy(() => import("../components/Card"));

const CategoryItems: React.FC<{ categoryName: string }> = ({
  categoryName,
}) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [items, setItems] = React.useState<Company[]>([]);
  const [dragStartX, setDragStartX] = React.useState<number>(0);
  const [scrollLeft, setScrollLeft] = React.useState<number>(-740);
  const containerRef = React.useRef<HTMLDivElement>(null);

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

  React.useEffect(() => {
    if (containerRef.current) {
      if (window.innerWidth > 1320) {
        containerRef.current.style.cursor = "context-menu";
      }
    }
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(
          `company/?category=${categoryName}&limit=4`
        );
        setItems(response.data.results);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [categoryName]);

  return (
    <div
      ref={containerRef}
      className={`${Styles.scrollContainer} w-full p-1 cursor-pointer flex justify-items-start my-6 overflow-x-scroll lg:overflow-hidden gap-2 md:gap-3 lg:gap-6 2xl:gap-8`}
      onMouseDown={(e) => handleDragStart(e)}
      onMouseMove={(e) => handleDragMove(e)}
      onMouseUp={() => handleDragEnd()}
      onMouseLeave={() => handleDragEnd()}
    >
      {items.map((item) =>
        isLoading ? (
          <CardSkeleton />
        ) : (
          <CardComponent
            key={item.id}
            Id={item.id}
            text={item.company_name}
            rate={item.rate}
            offer={[item.discount, item.max_discount]}
            img={`https://api.aranasayesh.ir/${item.company_image1}`}
          />
        )
      )}
    </div>
  );
};

export default CategoryItems;

interface Company {
  id: number;
  company_name: string;
  discount: number;
  max_discount: number;
  rate: number;
  company_image1: string;
}
