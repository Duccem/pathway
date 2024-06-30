'use client'
import { CloudUpload } from "lucide-react";
import { useRef } from "react";

interface VideoSectionPickerProps {
  value: string;
  onChange: (value: string) => void;
  onSelectFile: (file: File) => void;
}

const VideoSectionPicker = ({ onChange, value, onSelectFile }:VideoSectionPickerProps) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const openFilePicker = () => {
    inputFileRef.current?.click();
  }
  inputFileRef.current?.addEventListener('change', (e: any) => {
    const file = e.target.files[0];
    if (file) {
      onChange(URL.createObjectURL(file));
      onSelectFile(file);
    }
  })
  return (
    <div className="flex gap-3 flex-col">
      
      <div className="p-2 rounded-lg w-[300px] border border-dashed border-gray-500 flex flex-col justify-center items-center cursor-pointer" onClick={openFilePicker}>
        <p className="flex flex-col justify-center items-center">
          {value !=='' ? 'Choose Another file' : 'Choose file'}
          <CloudUpload className="w-5 h-5"/>
        </p>
        { value !== '' && (<video src={value} className="w-[300px]" controls></video>) }
        
        <input ref={inputFileRef} type="file"  className="hidden "/>
      </div>
      
    </div>
  );
};

export default VideoSectionPicker;
