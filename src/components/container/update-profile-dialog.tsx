import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { FloatingInput } from '@/components/container/floating-input';
import { Eye, EyeOff } from 'lucide-react';

export default function UpdateProfileDialog() {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useUpdateProfile();
  const { data: profile } = useProfile();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

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
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='bg-primary-100 text-white h-11 md:mt-3 mt-4'>
          Update Profile
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] bg-transparent p-4'>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className='bg-white rounded-2xl p-4 md:p-6 shadow-xl'
        >
          <DialogHeader>
            <DialogTitle className='text-xl md:text-display-xs font-extrabold'>
              Update Profile
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-4 mt-4'
          >
            <FloatingInput
              label='Name'
              type='text'
              {...register('name')}
              error={errors.name?.message}
            />

            <FloatingInput
              label='Number Phone'
              type='text'
              {...register('phone')}
              error={errors.phone?.message}
            />

            <div className='relative'>
              <FloatingInput
                label='Current password'
                type={showCurrentPassword ? 'text' : 'password'}
                {...register('currentPassword')}
                error={errors.currentPassword?.message}
              />
              <button
                type='button'
                onClick={() => setShowCurrentPassword((prev) => !prev)}
                className='absolute right-3 top-6 md:top-7 -translate-y-1/2 text-neutral-500 hover:text-neutral-800'
              >
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Password baru */}
            <div className='relative'>
              <FloatingInput
                label='New password'
                type={showNewPassword ? 'text' : 'password'}
                {...register('newPassword')}
                error={errors.newPassword?.message}
              />
              <button
                type='button'
                onClick={() => setShowNewPassword((prev) => !prev)}
                className='absolute right-3 top-6 md:top-7 -translate-y-1/2 text-neutral-500 hover:text-neutral-800'
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <Button
              type='submit'
              disabled={isPending}
              className='bg-primary-100 text-white'
            >
              {isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
