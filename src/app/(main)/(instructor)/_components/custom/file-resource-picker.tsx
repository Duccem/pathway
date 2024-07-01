'use client'
import { CloudUpload } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ImageCoursePickerProps {
  value: string;
  onChange: (value: string) => void;
  onSelectFile: (file: File) => void;
}

const FileResourcePicker = ({ onChange, value, onSelectFile }:ImageCoursePickerProps) => {
  const [fileName, setFileName] = useState<string>('')
  const inputFileRef = useRef<HTMLInputElement>(null);
  const openFilePicker = () => {
    inputFileRef.current?.click();
  }
  const handleChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      onChange(URL.createObjectURL(file));
      onSelectFile(file);
      setFileName(file.name)
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
      { value !== '' && (
          <p className="flex justify-start items-center gap-x-2"><span className="font-bold text-sm">File: </span>{fileName}</p>
        )}
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

export default FileResourcePicker;
