import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  registerSchema,
  type RegisterFormType,
} from '@/schemas/register-schema';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useRegisterUser } from '@/hooks/auth/useRegisterUser ';
import { FloatingInput } from '@/components/container/floating-input';

type RegisterFormProps = {
  onSuccess?: () => void;
};

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const registerMutation = useRegisterUser();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormType) => {
    registerMutation.mutate(data, {
      onSuccess: () => onSuccess?.(),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 md:space-y-5'>
      <FloatingInput
        label='Name'
        type='text'
        {...register('name')}
        error={errors.name?.message}
        required
      />
      <FloatingInput
        label='Email'
        type='email'
        {...register('email')}
        error={errors.email?.message}
        required
      />
      <FloatingInput
        label='Phone'
        type='text'
        {...register('phone')}
        error={errors.phone?.message}
        required
      />

      {/* Password khusus pakai tombol mata */}
      <div className='relative'>
        <FloatingInput
          label='Password'
          type={showPassword ? 'text' : 'password'}
          {...register('password')}
          error={errors.password?.message}
          required
        />
        <button
          type='button'
          onClick={() => setShowPassword((prev) => !prev)}
          className='absolute right-3 top-6 md:top-7 -translate-y-1/2 text-neutral-500 hover:text-neutral-800'
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      <Button
        type='submit'
        className='w-full hover:bg-[#ba534c] bg-primary-100 text-neutral-25'
        disabled={registerMutation.isPending}
      >
        {registerMutation.isPending ? 'Registering...' : 'Register'}
      </Button>
    </form>
  );
}
