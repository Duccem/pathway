'use client'
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.bubble.css';
import React from 'react';
interface ReadTextProps {
  value: string;
}
const ReadText = ({ value }: ReadTextProps) => {
  const ReactQuill = React.useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);
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
