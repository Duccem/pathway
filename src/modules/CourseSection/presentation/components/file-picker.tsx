'use client'
import toast from "react-hot-toast";
import { ourFileRouter } from "../../infrastructure/UploadThingCore";
import { UploadDropzone } from "./uploadthing";

interface FilePickerProps {
  value: string;
  onChange: (value: string) => void;
  endpoint: keyof typeof ourFileRouter;
  page: string;
}

const FilePicker = ({ value, onChange, endpoint, page }: FilePickerProps) => {
  return (
    <div className={`flex gap-2 ${page === 'edit-section' ? 'flex-col' : ''}`}>
      {page === 'edit-course' &&  value !== '' && <img src={value} alt="image" width={500} height={500} className="w-[280px] h-[200px] object-contain rounded-xl" /> }
      { page === 'edit-section' && value !== '' && (
        <p className="text-sm font-medium">
          {value}
        </p>
      )}
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
