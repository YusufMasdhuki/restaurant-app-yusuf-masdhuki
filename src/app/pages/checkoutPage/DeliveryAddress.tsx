'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useProfile } from '@/hooks/auth/useProfile';
import type { RootState } from '@/store';
import { setAddress, setPhone } from '@/store/slices/deliverySlice';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const DeliveryAddress = () => {
  const { data: profile } = useProfile();
  const dispatch = useDispatch();
  const { address, phone } = useSelector((state: RootState) => state.delivery);

  const [open, setOpen] = React.useState(false);

  // inisialisasi phone dari profile jika kosong
  React.useEffect(() => {
    if (!phone && profile?.phone) {
      dispatch(setPhone(profile.phone));
    }
  }, [profile?.phone, phone, dispatch]);

  const handleSave = () => {
    // bisa tambahkan API call di sini kalau mau simpan ke server
    setOpen(false); // nutup dialog langsung
  };

  return (
    <div className='shadow bg-white p-5 rounded-2xl flex flex-col gap-1'>
      <div className='flex items-center gap-2'>
        <img src='/icons/delivery-address.svg' alt='delivery-address' />
        <h2 className='text-lg font-extrabold text-neutral-950'>
          Delivery Address
        </h2>
      </div>
      <p className='text-md text-neutral-950 font-medium whitespace-pre-line'>
        {address}
      </p>
      <p className='text-md text-neutral-950 font-medium mb-4'>{phone}</p>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className='h-10 w-30 border border-neutral-300'>
            Change
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Delivery Info</DialogTitle>
          </DialogHeader>
          <div className='flex flex-col gap-4 py-2'>
            {/* Address textarea */}
            <div className='flex flex-col gap-1'>
              <Label htmlFor='address'>Address</Label>
              <Textarea
                id='address'
                value={address}
                onChange={(e) => dispatch(setAddress(e.target.value))}
                rows={3}
              />
            </div>

            {/* Phone input */}
            <div className='flex flex-col gap-1'>
              <Label htmlFor='phone'>Phone</Label>
              <Input
                id='phone'
                value={phone}
                onChange={(e) => dispatch(setPhone(e.target.value))}
              />
            </div>

            <Button onClick={handleSave} className='mt-2'>
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeliveryAddress;
