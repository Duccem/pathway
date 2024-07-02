'use client'
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import 'react-quill/dist/quill.bubble.css';
interface ReadTextProps {
  value: string;
}
const ReadText = ({ value }: ReadTextProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  return (
    <div>
      <ReactQuill
        theme='bubble'
        value={value}
        readOnly={true}
      />
    </div>
  );
}

export default ReadText;
