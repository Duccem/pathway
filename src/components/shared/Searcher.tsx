'use client';
import { Course } from '@prisma/client';
import axios from 'axios';
import { BookText, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const Searcher = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [term, setTerm] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);
  const ref = useRef<HTMLInputElement>(null);
  const handleChange = (e: any) => {
    setTerm(e.target.value);
  }
  const searchCourses = async (search: string) => {
    const response = await axios.get(`/api/course?search=${search}`);
    setCourses(response.data);
    setIsSearching(false);
  };
  useEffect(() => {
    if (!term || term === '') {
      setCourses([]);
      return;
    }
    setIsSearching(true);
    const timeout = setTimeout(async () => {
      await searchCourses(term);
    }, 500)

    return () => {
      clearTimeout(timeout);
    }
  }, [term]);

  const clearTerm = () => {
    setTerm('');
    setCourses([]);
    ref.current!.value = '';
  };
  return (
    <div className="max-md:hidden w-[400px] rounded-full flex relative">
      <input
        ref={ref}
        type="text"
        className="flex-grow bg-[#dfcbfa] rounded-full border-none outline-none text-sm pl-4 py-3"
        placeholder="Search for courses"
        onChange={handleChange}
      />
      {term && courses.length === 0 && isSearching && (
        <div className='z-50 absolute py-4 bg-white w-full top-[50px] flex justify-center items-center rounded-lg shadow-lg border border-gray-300'>
          <Loader2 className="w-8 h-8 animate-spin text-[#9747FF]"></Loader2>
        </div>
      )}
      {courses.length > 0 && (
        <div className="z-50 absolute bg-white w-full top-[50px] rounded-lg shadow-lg border border-gray-300">
          {courses.map((course) => (
            <Link
              href={`/courses/${course.id}/overview`}
              onClick={clearTerm}
              key={course.id}
              className="border-b flex flex-col justify-start gap-1 border-gray-300 px-3 py-3 hover:bg-[#dfcbfa] cursor-pointer"
            >
              <p className="text-sm font-bold flex items-center gap-2">
                <BookText className="w-4 h-4" /> {course.title}
              </p>
              <div className="flex gap-2 justify-start items-center">
                <img
                  src={course.imageUrl || ''}
                  alt={course.title}
                  className="w-[90px] object-contain rounded-lg"
                />
                <p className="text-sm">{course.subtitle}</p>
              </div>
            </Link>
          ))}
          <div
            className="cursor-pointer hover:bg-[#dfcbfa]"
            onClick={clearTerm}
          >
            <p className="text-sm text-center py-2">Clear results</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Searcher;
