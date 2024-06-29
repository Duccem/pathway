import React, { useState } from 'react';
import { Button } from '../ui/button';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

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
      { loading ? <Loader2 className='h-4 w-4 animate-spin'/> : <p>Buy course</p>}
    </Button>
  );
}

export default PurchaseCourse;
