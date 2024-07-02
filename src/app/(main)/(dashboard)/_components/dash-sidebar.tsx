'use client';
import { useAuth } from '@clerk/nextjs';
import { Compass, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DashSidebar = () => {
  const pathName = usePathname();
  const { isSignedIn } = useAuth();
  return (
    <div className="max-sm:hidden flex flex-col w-64  py-3 my-4 gap-0 text-sm font-medium">
      {isSignedIn && (
        <Link
          href="/"
          className={`transition-background flex justify-start items-center gap-3 hover:bg-[#dfcbfa] hover:border-r-4 hover:border-[var(--ducen-primary)] py-3 px-5 ${
            pathName === '/' ? 'bg-[#dfcbfa] border-r-4 border-[var(--ducen-primary)]' : ''
          }`}
        >
          <LayoutDashboard className={`${pathName === '/' ? 'animate-spin-once' : ''}`} />
          Dashboard
        </Link>
      )}
      <Link
        href="/browse"
        className={`flex justify-start items-center gap-3 hover:bg-[#dfcbfa] hover:border-r-4 hover:border-[var(--ducen-primary)] py-3 px-5 ${
          pathName === '/browse' ? 'bg-[#dfcbfa] border-r-4 border-[var(--ducen-primary)]' : ''
        }`}
      >
        <Compass className={`${pathName === '/browse' ? 'animate-spin-once' : ''}`} />
        Browse
      </Link>
    </div>
  );
};

export default DashSidebar;
