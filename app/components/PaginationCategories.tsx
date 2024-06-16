import React, { useState } from "react";
import { CardComponentType } from "../components/Card";
import foodpost from "../assets/images/foodpost.webp";
const CardComponent = React.lazy(() =>
  import("../components/Card")
);

interface Props {
  data: CardComponentType[];
  itemsPerPage: number;
}

const PaginationCategories: React.FC<Props> = ({ data, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Calculate the index of the first and last item of the current page
  const indexOfLastItem: number = currentPage * itemsPerPage;
  const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;

  // Slice the data array to get the items for the current page
  const currentItems: CardComponentType[] = data.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page
  const paginate = (pageNumber: number): void => setCurrentPage(pageNumber);

  return (
    <>
      <div className="space-y-10 justify-center justify-items-center items-center content-center grid-cols-1  sm:gap-4 sm:space-y-0 grid grid-flow-row sm:grid-cols-2 lg:gap-8 lg:grid-cols-3 2xl:gap-10 2xl:grid-cols-4">
        {/* Display items of the current page */}
        {currentItems.map((item: CardComponentType) => (
          <CardComponent
            key={item.Id}
            Id={item.Id}
            text="باغ رستوران بهشت"
            rate="4.0"
            offer={["10%","20%"]}
            img={foodpost}
          />
        ))}
      </div>
      {/* Pagination buttons */}
      <div className="w-full flex justify-center items-center mt-5">
        {/* Button for previous page */}
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`py-2 px-4 rounded border-none ${
            currentPage === 1
              ? "text-[#C8C8C8] cursor-not-allowed"
              : "text-blue-gray-600 hover:text-blue-500"
          }`}
        >
          قبلی
        </button>

        {/* Page number buttons */}
        {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map(
          (_, index) => (
            <button
              key={index}
              className={`py-2 px-4 rounded border-none ${
                currentPage === index + 1
                  ? "text-purple-500"
                  : "text-blue-gray-600 hover:text-blue-500"
              }`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}

        {/* Button for next page */}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
          className={`py-2 px-4 rounded border-none ${
            currentPage === Math.ceil(data.length / itemsPerPage)
              ? "text-[#C8C8C8] cursor-not-allowed"
              : "text-blue-gray-600 hover:text-blue-500"
          }`}
        >
          بعدی
        </button>
      </div>
    </>
  );
};

export default PaginationCategories;
