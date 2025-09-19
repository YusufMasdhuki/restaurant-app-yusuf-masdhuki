import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { loginSchema, type LoginFormType } from '@/schemas/login-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useLoginUser } from '@/hooks/auth/useLoginUser ';
import { FloatingInput } from '@/components/container/floating-input';

type LoginFormProps = {
  onSuccess?: () => void;
};

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const loginMutation = useLoginUser();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = (data: LoginFormType) => {
    loginMutation.mutate(
      { email: data.email, password: data.password },
      {
        onSuccess: (res) => {
          if (data.rememberMe) {
            localStorage.setItem('auth_token', res.data.token);
          } else {
            sessionStorage.setItem('auth_token', res.data.token);
          }
          onSuccess?.();
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 md:space-y-5'>
      {/* Email */}
      <FloatingInput
        type='email'
        label='Email'
        error={errors.email?.message}
        {...register('email')}
        required
      />

      {/* Password + tombol mata */}
      <div className='relative'>
        <FloatingInput
          type={showPassword ? 'text' : 'password'}
          label='Password'
          error={errors.password?.message}
          {...register('password')}
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

      {/* Remember Me */}
      <div className='flex items-center space-x-2'>
        <Checkbox
          id='rememberMe'
          checked={watch('rememberMe')}
          onCheckedChange={(val) => setValue('rememberMe', Boolean(val))}
          className='cursor-pointer'
        />
        <label htmlFor='rememberMe' className='text-sm select-none'>
          Remember Me
        </label>
      </div>

      {/* Submit */}
      <Button
        type='submit'
        className='w-full bg-primary-100 text-neutral-25 hover:bg-[#ba534c]'
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
}
