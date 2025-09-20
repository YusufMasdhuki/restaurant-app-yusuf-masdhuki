import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useProfile } from '@/hooks/auth/useProfile';
import type { RootState } from '@/store';
import { setAddress, setPhone } from '@/store/slices/deliverySlice';

import { FloatingTextarea } from '@/components/container/FloatingTextarea';
import { FloatingInput } from '@/components/container/floating-input';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const DeliveryAddress = () => {
  const { data: profile } = useProfile();
  const dispatch = useDispatch();
  const { address, phone } = useSelector((state: RootState) => state.delivery);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!phone && profile?.phone) {
      dispatch(setPhone(profile.phone));
    }
  }, [profile?.phone, phone, dispatch]);

  const handleSave = () => {
    setOpen(false);
  };

  return (
    <div className='shadow-[0_0_20px_rgba(203,202,202,0.25)] bg-white p-4 md:p-5 rounded-2xl flex flex-col gap-0 md:gap-1'>
      <div className='flex items-center gap-2'>
        <img
          src='/icons/delivery-address.svg'
          alt='delivery-address'
          className='size-6 md:size-8'
        />
        <h2 className='text-md md:text-lg font-extrabold text-neutral-950'>
          Delivery Address
        </h2>
      </div>
      <p className='text-sm md:text-md text-neutral-950 font-medium whitespace-pre-line'>
        {address}
      </p>
      <p className='text-sm md:text-md text-neutral-950 font-medium mb-4'>
        {phone}
      </p>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className='md:h-10 h-9 w-30 border border-neutral-300'>
            Change
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px] bg-transparent p-4'>
          <AnimatePresence mode='wait'>
            {open && (
              <motion.div
                key='delivery-dialog'
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className='bg-white rounded-2xl p-4 md:p-6 shadow-xl'
              >
                <DialogHeader>
                  <DialogTitle className='text-display-xs font-extrabold mb-4 md:mb-6'>
                    Edit Delivery Info
                  </DialogTitle>
                </DialogHeader>
                <div className='flex flex-col gap-4 md:gap-6'>
                  <FloatingTextarea
                    label='Address'
                    id='address'
                    value={address}
                    onChange={(e) => dispatch(setAddress(e.target.value))}
                    rows={3}
                  />

                  <FloatingInput
                    label='Phone'
                    id='phone'
                    value={phone}
                    onChange={(e) => dispatch(setPhone(e.target.value))}
                  />

                  <Button
                    onClick={handleSave}
                    className='bg-primary-100 hover:bg-[#db6d65] text-white'
                  >
                    Save
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeliveryAddress;
