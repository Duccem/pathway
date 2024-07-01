import TopBar from '@/modules/shared/presentation/components/layout/TopBar';
import React from 'react';
const MainLayout = ({ children }:{ children: React.ReactNode }) => {
  return (
    <>
      <TopBar/>
      {children}
    </>
  );
}

export default MainLayout;
