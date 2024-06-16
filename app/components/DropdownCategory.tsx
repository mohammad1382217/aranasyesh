import React, { useContext } from "react";
import Context, { ContextType } from "../api/context";
import { type CustomFlowbiteTheme } from "flowbite-react/dist/types/index";
import { useNavigate } from "react-router-dom";

const Dropdown = React.lazy(() =>
  import("flowbite-react").then((module) => ({ default: module.Dropdown }))
);

const DropdownItem = React.lazy(() =>
  import("flowbite-react").then((module) => ({ default: module.DropdownItem }))
);

const DropdownCategory = () => {
  const Theme: CustomFlowbiteTheme["dropdown"] = {
    arrowIcon: "h-4 w-4 text-[#4A4A4A]",
    content: "focus:border-none focus:outline-none",
    inlineWrapper:
      "w-auto flex items-center justify-between text-[#4A4A4A] hover:text-blue-700 py-2 border-0 p-0 gap-2 hover:gap-2",
  };

  const context = useContext(Context);
  const navigate = useNavigate();
  const { categoryData } = context as ContextType;
  return (
    <div className="w-full flex items-center justify-start gap-5">
      {categoryData.map((category) => (
        <Dropdown
          key={category.id}
          theme={Theme}
          inline={true}
          className="font-normal rounded-lg shadow w-80 h-72"
          trigger="hover"
          label={category.show_name}
          dismissOnClick={false}
        >
          <div
            style={{
              backgroundImage: `url(${category.image})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
            className="bg-cover overflow-auto h-72 relative bottom-0 top-0 left-0 rounded-e-lg"
          >
            {category.sub_categories.map((item) => (
              <DropdownItem
                key={item.id}
                className="w-48"
                onClick={async () => {
                  navigate(
                    `Category/${category.name}/SubCategory/${item.name}/`
                  );
                }}
              >
                {item.name}
              </DropdownItem>
            ))}
          </div>
        </Dropdown>
      ))}
    </div>
  );
};

export default DropdownCategory;
