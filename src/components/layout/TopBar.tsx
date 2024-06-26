'use client';
import Link from "next/link";
import { Search } from "lucide-react";
import { UserButton, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const TobBar = () => {
  const { isSignedIn } = useAuth();
  const topRoutes = [
    { label: 'Instructor', path: '/instructor/courses' },
    { label: 'Learning', path: '/learning'}
  ]
  return (
    <div className="flex justify-between items-center p-4">
      <Link href='/'>
        <img src='/images/logo.png' alt="logo" height={100} width={200}/>
      </Link>
      <div className="max-md:hidden w-[400px] rounded-full flex">
        <input type="text" className="flex-grow bg-[#dfcbfa] rounded-l-full border-none outline-none text-sm pl-4 py-3" placeholder="Search for courses" />
        <button className="bg-[#9747FF] rounded-r-full border-none outline-none cursor-pointer px-4 py-3 hover:bg-[#9747FF]/80"> 
          <Search className="h-4 w-4"/>
        </button>
      </div>
      <div className="flex gap-6 items-center">
        <div className="max-sm:hidden flex gap-6">
          {
            topRoutes.map((route, index) => (
              <Link key={route.path} href={route.path} className="text-sm font-medium hover:text-[#9747FF]">{route.label}</Link>
            ))
          }
        </div>
        { isSignedIn ? <UserButton afterSignOutUrl="/sign-in" /> : <Link href='sign-in' className=""><Button>Sign In</Button></Link>}
        
      </div>
    </div>
  );
}

export default TobBar;
