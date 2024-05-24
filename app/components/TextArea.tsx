import { Textarea, CustomFlowbiteTheme } from "flowbite-react";

export const TextArea: React.FC<TextareaProps> = ({
  TextAreaClass,
  MaxLength,
  Name,
  Value,
  placeholder,
  onChange,
}) => {

  const customTheme: CustomFlowbiteTheme["textarea"] = {
    base: `block w-full rounded-lg !border disabled:cursor-not-allowed disabled:opacity-50 text-sm !border-[#C8C8C8] outline-none shadow-none bg-white focus:!border-2 text-[#C8C8C8] placeholder:text-[#C8C8C8] focus:text-[#7F38B7] hover:!border-[#8754AF] focus:!border-[#7F38B7] focus:ring-[#8754AF]/10 ${TextAreaClass}`,
  };

  return (
    <Textarea
      theme={customTheme}
      className={`!border-[#C8C8C8] outline-none shadow-none bg-white border-2 text-[#C8C8C8]  placeholder:text-[#C8C8C8] focus:text-[#7F38B7] hover:!border-[#8754AF] hover:!border-t-[#8754AF] focus:!border-[#7F38B7] focus:!border-t-[#7F38B7] focus:ring-[#8754AF]/10  ${TextAreaClass}`}
      maxLength={MaxLength}
      name={Name}
      value={Value?.replace(/(<([^>]+)>)/gi, "")}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

// Types
interface TextareaProps {
  TextAreaClass: string;
  MaxLength?: number;
  Name?: string;
  Value?: string | undefined;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}
