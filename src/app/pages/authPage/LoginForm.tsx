import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useLoginUser } from '@/hooks/auth/useLoginUser ';
import { loginSchema, type LoginFormType } from '@/schemas/login-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

type LoginFormProps = {
  onSuccess?: () => void;
};

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const loginMutation = useLoginUser();

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
          // Simpan token sesuai rememberMe
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
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div>
        <Input
          type='email'
          placeholder='Email'
          {...register('email')}
          required
        />
        {errors.email && (
          <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>
        )}
      </div>

      <div>
        <Input
          type='password'
          placeholder='Password'
          {...register('password')}
          required
        />
        {errors.password && (
          <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>
        )}
      </div>

      <div className='flex items-center space-x-2'>
        <Checkbox
          id='rememberMe'
          checked={watch('rememberMe')}
          onCheckedChange={(val) => setValue('rememberMe', Boolean(val))} // ✅ set value dengan boolean
          className='cursor-pointer'
        />
        <label htmlFor='rememberMe' className='text-sm select-none'>
          Remember Me
        </label>
      </div>

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
