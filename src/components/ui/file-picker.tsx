'use client'
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/lib/uploadthing";
import toast from "react-hot-toast";

interface FilePickerProps {
  value: string;
  onChange: (value: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

const FilePicker = ({ value, onChange, endpoint }: FilePickerProps) => {
  return (
    <div className="flex gap-2">
      {value && <img src={value} alt="image" width={500} height={500} className="w-[280px] h-[200px] object-contain rounded-xl"/> }
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res): void => {
          onChange(res?.[0]?.url || '')
        }}
        onUploadError={(error: Error) => {
          toast.error(error.message);
        }}
        className="w-[280px]"
      />
    </div>
  );
};

export default FilePicker;
