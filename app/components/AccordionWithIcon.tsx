import React from "react";
import { HiChevronDown } from "react-icons/hi";
const Accordion = React.lazy(()=> import("@material-tailwind/react/components/Accordion"));
const AccordionHeader = React.lazy(()=> import("@material-tailwind/react/components/Accordion/AccordionHeader"));
const AccordionBody = React.lazy(()=> import("@material-tailwind/react/components/Accordion/AccordionBody"));

const Icon: React.FC<IconProps> = ({ isOpen }) => {
  return (
    <HiChevronDown
      className={`${
        isOpen ? "rotate-180" : ""
      } h-5 w-5 transition-transform absolute top-4`}
    />
  );
};

const AccordionCustomIcon: React.FC<AccordionCustomIconProps> = ({
  headerTitle,
  Id,
  children,
}) => {
  const [accordionOpen, setAccordionOpen] = React.useState<number[]>([]);

  const handleOpen = (id: number) => {
    const newOpenAccordionIds = accordionOpen.includes(id)
      ? accordionOpen.filter((accordionId: number) => accordionId !== id)
      : [...accordionOpen, id];
    setAccordionOpen(newOpenAccordionIds);
  };

  return (
    <Accordion
      className="mb-2 rounded-lg relative"
      open={accordionOpen.includes(Id)}
      icon={<Icon id={Id} isOpen={accordionOpen.includes(Id)} />}
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <AccordionHeader
        className="text-base font-bold text-[#7F38B7] !border-0 h-12 rounded-lg p-3 w-full justify-between"
        onClick={() => handleOpen(Id)}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {headerTitle}
      </AccordionHeader>
      <AccordionBody className="flex items-center justify-center mx-auto w-full pt-0 text-base font-normal">
        {children}
      </AccordionBody>
    </Accordion>
  );
};
export default AccordionCustomIcon;

// Types
interface IconProps {
  id: number;
  isOpen: boolean;
}
interface AccordionCustomIconProps {
  headerTitle: string;
  Id: number;
  children: React.ReactNode;
}
