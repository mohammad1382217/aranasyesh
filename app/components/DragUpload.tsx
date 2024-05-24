import { Button } from "@material-tailwind/react";
import { FileInput, Label } from "flowbite-react";
import { useRef } from "react";

const DragUpload: React.FC<DragUploadProps> = ({
  lable,
  onChange,
  selectedFile,
  name,
}) => {
  const upload = useRef<HTMLInputElement>(null);
  const handleClickUploadFile = () => {
    upload.current?.click();
  };

  return (
    <div className="flex flex-col w-full items-center justify-center gap-2">
      <span className="text-[#717171] text-sm">{lable}</span>
      <Label
        htmlFor="dropzone-file"
        className="flex lg:h-52 w-full h-auto cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
      >
        <div className="w-full flex flex-col items-center justify-center pb-6 pt-5">
          <svg
            className="mb-4 h-8 w-8 text-[#7F38B7]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center text-center">
              <p className="hidden lg:flex opacity-0 lg:opacity-100 mb-2 px-4 text-sm text-[#7F38B7] text-justify">
                لطفاً فایل خود را بکشید و رها کنید
              </p>
              <p className="hidden lg:flex opacity-0 lg:opacity-100 mb-2 text-xs text-[#7F38B7]">
                یا
              </p>
            </div>
            <Button
              type="button"
              color="gray"
              className="text-[#7F38B7] bg-gray-100 hover:bg-gray-200 shadow-none hover:shadow-none"
              placeholder={undefined}
              onClick={handleClickUploadFile}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              انتخاب فایل
            </Button>
            {selectedFile && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {(selectedFile as File).name}
              </p>
            )}
          </div>
        </div>
        <FileInput
          name={name}
          ref={upload}
          id="dropzone-file"
          className="hidden"
          onChange={onChange}
        />
      </Label>
    </div>
  );
};

export default DragUpload;

// Types
interface DragUploadProps {
  lable: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  selectedFile: File | null | string;
  name: string;
}
