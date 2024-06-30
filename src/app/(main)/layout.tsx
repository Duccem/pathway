import TopBar from '@/modules/shared/presentation/components/layout/TopBar';
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
