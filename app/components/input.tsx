import React from "react";
import {
  type CustomFlowbiteTheme,
  type FlowbiteTextInputSizes,
} from "flowbite-react";

const TextInput = React.lazy(() =>
  import("flowbite-react").then((module) => ({ default: module.TextInput }))
);

const Input: React.FC<InputProps> = ({
  type,
  value,
  placeholder,
  sizing,
  ClassName,
  maxLength,
  Name,
  onChange,
  onKeyDown,
  Icon,
  disabled,
  autofocus,
  pattern,
  title,
}) => {
  const customTheme: CustomFlowbiteTheme["textInput"] = {
    base: "w-full",
    field: {
      icon: {
        base: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3",
        svg: "h-5 w-5 text-gray-500 dark:text-gray-400",
      },
      input: {
        base: `w-full !border-[#C8C8C8] outline-none shadow-none !bg-white focus:border-2 text-[#C8C8C8] placeholder:text-[#C8C8C8] focus:text-[#7F38B7] hover:!border-[#8754AF] focus:!border-[#7F38B7] focus:ring-[#8754AF]/10 ${ClassName}`,
      },
    },
  };

  return (
    <TextInput
      pattern={pattern}
      title={title}
      value={value}
      disabled={disabled}
      theme={customTheme}
      maxLength={maxLength}
      autoFocus={autofocus}
      name={Name}
      sizing={sizing}
      icon={Icon}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
};

export default Input;

interface InputProps {
  value?: string;
  Name?: string;
  title?: string;
  pattern?: string;
  disabled?: boolean;
  sizing?: keyof FlowbiteTextInputSizes;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  ClassName?: string;
  maxLength?: number;
  autofocus?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}
