'use client'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
interface ReadTextProps {
  value: string;
}
const ReadText = ({ value }: ReadTextProps) => {
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
