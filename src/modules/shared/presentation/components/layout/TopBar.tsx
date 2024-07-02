'use client';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/lib/ui/sheet';
import Link from 'next/link';

import { Button } from '@/lib/ui/button';
import { UserButton, useAuth } from '@clerk/nextjs';
import { Glasses, GraduationCap, Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Searcher from '../Searcher';

const TobBar = () => {
  const [signed, setSigned] = useState(false);
  const { isSignedIn } = useAuth();
  const pathName = usePathname();
  useEffect(() => {
    setSigned(isSignedIn || false);
  }, [isSignedIn]);
  const instructorSidebarRoutes = [
    { label: 'Courses', path: '/instructor/courses' },
    {
      label: 'Performance',
      path: '/instructor/performance',
    },
  ];

  const rootSidebarRoutes = [
    { label: 'Browse', path: '/browse' },
  ];
  if(isSignedIn) rootSidebarRoutes.unshift({ label: 'Dashboard', path: '/' },);
  return (
    <div className="flex justify-between items-center p-4">
      <Link href="/">
        <img src="/images/logo.png" alt="logo" height={100} width={200} />
      </Link>
      <Searcher />
      <div className="flex gap-6 items-center">
        {isSignedIn && (
          <div className="max-sm:hidden flex gap-6">
            {!pathName.startsWith('/instructor') ? (
              <Link href={'/instructor/courses'} className="text-sm font-medium ">
                <Button variant="outline" className="flex justify-start items-center gap-2">
                  <GraduationCap className="w-6 h-6" />
                  Teacher mode
                </Button>
              </Link>
            ) : (
              <Link href={'/'} className="text-sm font-medium ">
                <Button variant="outline" className="flex justify-start items-center gap-2">
                  <Glasses className="w-6 h-6" />
                  Student mode
                </Button>
              </Link>
            )}
          </div>
        )}
        <div className="z-20 sm:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu className="w-5 h-5" />
            </SheetTrigger>
            <SheetContent>
              <p className="font-bold text-sm text-[#9747FF]">MENU</p>
              {
                isSignedIn && (
                  <div className="flex flex-col gap-4">
                {!pathName.startsWith('/instructor') ? (
                  <Link
                    href={'/instructor/courses'}
                    className="text-sm font-medium mt-2 flex justify-start items-center gap-2"
                  >
                    <GraduationCap className="w-6 h-6" />
                    Teacher mode
                  </Link>
                ) : (
                  <Link href={'/'} className="text-sm font-medium mt-2 flex justify-start items-center gap-2">
                    <Glasses className="w-6 h-6" />
                    Student mode
                  </Link>
                )}
              </div>
                )
              }

              {pathName.startsWith('/instructor') ? (
                <div className="flex flex-col gap-4 mt-5">
                  <p className="font-bold text-sm text-[#9747FF]">SECTIONS</p>
                  {instructorSidebarRoutes.map((route) => (
                    <Link
                      href={route.path}
                      key={route.path}
                      className="text-sm font-medium hover:text-[#9747FF]"
                    >
                      <SheetClose>{route.label}</SheetClose>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-4 mt-5">
                  <p className="font-bold text-sm text-[#9747FF]">SECTIONS</p>
                  {rootSidebarRoutes.map((route) => (
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
