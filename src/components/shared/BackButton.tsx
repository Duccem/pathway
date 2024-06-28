'use client'
import React from 'react';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();
  const back = () => {
    router.back();
  }
  return (
    <div>
      <Button variant='ghost' onClick={back}>
        <ArrowLeft className='h-4 w-4'/>
        Back
      </Button>
    </div>
  );
}

export default BackButton;
