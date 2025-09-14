// RegisterForm.tsx
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegisterUser } from '@/hooks/auth/useRegisterUser ';
import {
  registerSchema,
  type RegisterFormType,
} from '@/schemas/register-schema';

type RegisterFormProps = {
  onSuccess?: () => void;
};

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const registerMutation = useRegisterUser();

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
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div>
        <Input placeholder='Name' {...register('name')} />
        {errors.name && (
          <p className='text-red-500 text-sm'>{errors.name.message}</p>
        )}
      </div>

      <div>
        <Input placeholder='Email' {...register('email')} />
        {errors.email && (
          <p className='text-red-500 text-sm'>{errors.email.message}</p>
        )}
      </div>

      <div>
        <Input placeholder='Phone' {...register('phone')} />
        {errors.phone && (
          <p className='text-red-500 text-sm'>{errors.phone.message}</p>
        )}
      </div>

      <div>
        <Input
          type='password'
          placeholder='Password'
          {...register('password')}
        />
        {errors.password && (
          <p className='text-red-500 text-sm'>{errors.password.message}</p>
        )}
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
