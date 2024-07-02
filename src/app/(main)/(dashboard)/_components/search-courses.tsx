'use client'
import { Input } from "@/lib/ui/input";
import debounce from "lodash.debounce";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const SearchCourses = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [term, setTerm] = useState('');
  const categoryId = searchParams.get('categoryId')
  const handleChange = useCallback(debounce((e: any)=> {
    setTerm(e.target.value)
  }, 500), [])

  useEffect(() => {
    if(!term || term === '') {
      return;
    }

    if(categoryId) {
      router.push(`/browse/?categoryId=${categoryId}&search=${term}`)
    } else {
      router.push(`/browse/?search=${term}`)
    }

  }, [term])
  return (
    <div>
      <Input placeholder="Search for courses..." onChange={handleChange}/>
    </div>
  );
}

export default SearchCourses;
