'use client';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { UserButton, useAuth } from '@clerk/nextjs';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Searcher from '../shared/Searcher';

const TobBar = () => {
  const [signed, setSigned] = useState(false);
  const { isSignedIn } = useAuth();
  const pathName = usePathname();
  useEffect(()=> {
    setSigned(isSignedIn || false)
  
  }, [isSignedIn])
  const topRoutes = [
    { label: 'Instructor', path: '/instructor/courses' },
    { label: 'Learning', path: '/learning' },
  ];
  const sidebarRoutes = [
    { label: 'Courses', path: '/instructor/courses' },
    {
      label: 'Performance',
      path: '/instructor/performance',
    },
  ];
  return (
    <div className="flex justify-between items-center p-4">
      <Link href="/">
        <img src="/images/logo.png" alt="logo" height={100} width={200} />
      </Link>
      <Searcher />
      <div className="flex gap-6 items-center">
        <div className="max-sm:hidden flex gap-6">
          {topRoutes.map((route, index) => (
            <Link
              key={route.path}
              href={route.path}
              className="text-sm font-medium hover:text-[#9747FF]"
            >
              {route.label}
            </Link>
          ))}
        </div>
        <div className="z-20 sm:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu className="w-5 h-5" />
            </SheetTrigger>
            <SheetContent>
              <p className="font-bold text-sm text-[#9747FF]">MENU</p>
              <div className="flex flex-col gap-4">
                {topRoutes.map((route) => (
                  <Link
                    href={route.path}
                    key={route.path}
                    className="text-sm font-medium hover:text-[#9747FF]"
                  >
                    <SheetClose>{route.label}</SheetClose>
                  </Link>
                ))}
              </div>
              
              {pathName.startsWith('/instructor') && (
                <div className="flex flex-col gap-4 mt-10">
                  <p className="font-bold text-sm text-[#9747FF]">INSTRUCTOR</p>
                  {sidebarRoutes.map((route) => (
                    <Link
                      href={route.path}
                      key={route.path}
                      className="text-sm font-medium hover:text-[#9747FF]"
                    >
                      <SheetClose>{route.label}</SheetClose>
                    </Link>
                  ))}
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
        {signed ? (
          <UserButton afterSignOutUrl="/sign-in" />
        ) : (
          <Link href="sign-in" className="">
            <Button>Sign In</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default TobBar;
