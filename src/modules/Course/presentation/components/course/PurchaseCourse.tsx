'use client'
import { Button } from '@/lib/ui/button';
import axios from 'axios';
import { CircleDollarSign, Loader2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const PurchaseCourse = ({ courseId }: { courseId: string }) => {
  const [loading, setLoading] = useState(false);
  const handlePurchase = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`/api/course/${courseId}/checkout`);
      window.location.assign(response.data.url);
    } catch (error) {
      console.log('error_purchase_course', error);
      toast.error('Failed to purchase course');
    } finally{
      setLoading(false);
    }
  }
  return (
    <Button onClick={handlePurchase}>
      { loading ? <Loader2 className='h-4 w-4 animate-spin'/> : <p className='flex justify-start items-center'> <CircleDollarSign className="h-4 w-4 mr-2" /> Buy course</p>}
    </Button>
  );
}

export default PurchaseCourse;
