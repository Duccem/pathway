'use client'
import { CloudUpload } from "lucide-react";
import { useEffect, useRef } from "react";

interface ImageCoursePickerProps {
  value: string;
  onChange: (value: string) => void;
  onSelectFile: (file: File) => void;
}

const ImageCoursePicker = ({ onChange, value, onSelectFile }:ImageCoursePickerProps) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const openFilePicker = () => {
    inputFileRef.current?.click();
  }
  const handleChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      onChange(URL.createObjectURL(file));
      onSelectFile(file);
    }
  }
  useEffect(() => {
    inputFileRef.current?.addEventListener('change', handleChange)
    return () => {
      inputFileRef.current?.removeEventListener('change', handleChange)
    }
  }, [])
  
  return (
    <div className="flex gap-3 flex-col">
      <div className="w-[500px] aspect-video mx-auto border border-dashed p-2 border-gray-500 rounded-lg">
        { value !== '' && (
          <img src={value} alt="course-image" className="w-full  object-contain rounded-lg" />
        )}
      </div>
      <div className="p-2 rounded-lg w-full border border-dashed border-gray-500 flex flex-col justify-center items-center cursor-pointer" onClick={openFilePicker}>
        <p className="flex flex-col justify-center items-center">
          {value !=='' ? 'Choose Another file' : 'Choose file'}
          <CloudUpload className="w-5 h-5"/>
        </p>
        
        <input ref={inputFileRef} type="file"  className="hidden "/>
      </div>
      
    </div>
  );
};

export default ImageCoursePicker;
