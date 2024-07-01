'use client'
import { Compass, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashSidebar = () => {
  const pathName = usePathname();
  return (
    <div className="max-sm:hidden flex flex-col w-64  py-3 my-4 gap-0 text-sm font-medium">
      <Link href='/' 
      className={`flex justify-start items-center gap-3 hover:bg-[#dfcbfa] hover:border-r-4 hover:border-[var(--ducen-primary)] py-3 px-5 ${pathName === '/' ? 'bg-[#dfcbfa] border-r-4 border-[var(--ducen-primary)]' : ''}`}>
        <LayoutDashboard/>
        Dashboard
      </Link>
      <Link href='/browse' className={`flex justify-start items-center gap-3 hover:bg-[#dfcbfa] hover:border-r-4 hover:border-[var(--ducen-primary)] py-3 px-5 ${pathName === '/browse' ? 'bg-[#dfcbfa] border-r-4 border-[var(--ducen-primary)]' : ''}`}>
        <Compass/>
        Browse
      </Link>
    </div>
  );
}

export default DashSidebar;
