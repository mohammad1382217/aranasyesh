import React from "react";
import { Link } from "react-router-dom/dist";
import { ListGroup, ListGroupItem } from "flowbite-react";

const FlowbiteListGroup: React.FC<FlowbiteListGroupProps> = ({
  List,
}) => {
  const ListTheme = {
    root: {
      base: "w-full flex flex-col items-center justify-center h-max list-none rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900 xl:w-48",
    },
    item: {
      link: {
        base: "flex items-center justify-center w-full border-b border-gray-200 py-4 px-4",
      },
      active: {
        off: "justify-center",
      },
      base: "w-full flex items-center justify-center xl:w-48",
    },
  };

  return (
    <ListGroup theme={ListTheme}>
      {List.map((item) => (
        <Link key={item.link} className="w-full" to={item.link}>
          <ListGroupItem onClick={item.click} className="w-full">
            {item.title}
          </ListGroupItem>
        </Link>
      ))}
    </ListGroup>
  );
};

export default FlowbiteListGroup;

// Types
interface FlowbiteListGroupProps {
  List: itemList[];
}

interface itemList {
  title: string;
  link: string;
  click?: | ((() => void) &
  React.MouseEventHandler<HTMLAnchorElement> &
  React.MouseEventHandler<HTMLButtonElement>)
| undefined;
}
