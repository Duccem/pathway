'use client'
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '../../../../lib/ui/button';

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
