import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useProfile } from '@/hooks/auth/useProfile';
import { useUpdateProfile } from '@/hooks/auth/useUpdateProfile';
import {
  updateProfileSchema,
  type UpdateProfileForm,
} from '@/schemas/updateProfileSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function UpdateProfileDialog() {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useUpdateProfile();
  const { data: profile } = useProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateProfileForm>({
    resolver: zodResolver(updateProfileSchema),
  });

  // isi form dengan data profile
  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name,
        phone: profile.phone,
      });
    }
  }, [profile, reset]);

  const onSubmit = async (values: UpdateProfileForm) => {
    await mutateAsync(values);
    setOpen(false);
    // reset tidak perlu, karena profile akan otomatis refresh lewat invalidateQueries
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='bg-primary-100 text-white'>Update Profile</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] bg-transparent p-0'>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className='bg-white rounded-2xl p-6 shadow-xl'
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-4 mt-4'
          >
            <div>
              <Input placeholder='Nama' {...register('name')} />
              {errors.name && (
                <p className='text-red-500 text-sm'>{errors.name.message}</p>
              )}
            </div>
            <div>
              <Input placeholder='Nomor Handphone' {...register('phone')} />
              {errors.phone && (
                <p className='text-red-500 text-sm'>{errors.phone.message}</p>
              )}
            </div>
            <div>
              <Input
                type='password'
                placeholder='Password saat ini'
                {...register('currentPassword')}
              />
            </div>
            <div>
              <Input
                type='password'
                placeholder='Password baru'
                {...register('newPassword')}
              />
            </div>
            <Button
              type='submit'
              disabled={isPending}
              className='bg-primary-100 text-white'
            >
              {isPending ? 'Menyimpan...' : 'Simpan Perubahan'}
            </Button>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
