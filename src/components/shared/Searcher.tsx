'use client'
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import debounce from "lodash.debounce";

const Searcher = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const category = searchParams.get('categoryId')
  const handleChange = useCallback(
    debounce((e) =>{
      if(category) router.push(`/?search=${e.target.value}&categoryId=${category}`);
      else router.push(`/?search=${e.target.value}`)
    }, 500),
    []
  )
  return (
    <div className="max-md:hidden w-[400px] rounded-full flex">
      <input type="text" className="flex-grow bg-[#dfcbfa] rounded-l-full border-none outline-none text-sm pl-4 py-3" placeholder="Search for courses" onChange={handleChange}/>
      <button className="bg-[#9747FF] rounded-r-full border-none outline-none cursor-pointer px-4 py-3 hover:bg-[#9747FF]/80">
        <Search className="h-4 w-4" />
      </button>
    </div>
  );
}

export default Searcher;
