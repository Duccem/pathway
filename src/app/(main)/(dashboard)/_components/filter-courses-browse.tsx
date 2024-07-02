'use client'
import CategoriesList from "@/modules/Course/presentation/components/categories/CategoriesList";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import SearchCourses from "./search-courses";

const FilterCoursesBrowse = ({ categories }) => {
  const [isSearching, setIsSearching] = useState(false);
  const changeIsPending = (isPending) => setIsSearching(isPending);
  return (
    <div className="flex items-center justify-start">
      <SearchCourses setSearchingState={changeIsPending}/>
      <CategoriesList categories={categories} setSearchingState={changeIsPending}/>
      {isSearching && <Loader2 className='h-6 w-6 animate-spin'/> }
    </div>
  );
}

export default FilterCoursesBrowse;
