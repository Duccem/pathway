import React from 'react';
import DashSidebar from './_components/dash-sidebar';
const DashLayout = ({ children }:{ children: React.ReactNode }) => {
  return (
    <div className='flex flex-1'>
      <DashSidebar/>
      {children}
    </div>
  );
}

export default DashLayout;
