import TopBar from '@/components/TobBar';
import React from 'react';
const HomeLayout = ({ children }:{ children: React.ReactNode }) => {
  return (
    <>
      <TopBar/>
      {children}
    </>
  );
}

export default HomeLayout;
