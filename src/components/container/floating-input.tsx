import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

type FloatingInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className='relative w-full'>
        <Input
          id={inputId}
          ref={ref}
          placeholder=' ' // penting untuk peer-placeholder-shown
          className={cn(
            'peer h-12 md:h-14 pt-[21px] relative text-sm md:text-md',
            className
          )}
          {...props}
        />
        <label
          htmlFor={inputId}
          className='md:text-md top-6 md:top-7 -translate-y-1/2 absolute  left-3 text-sm leading-6 text-neutral-500 transition-all duration-200 peer-placeholder-shown:top-6 md:peer-placeholder-shown:top-7 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs peer-[&:not(:placeholder-shown)]:top-4 peer-[&:not(:placeholder-shown)]:text-xs  md:peer-focus:top-4 md:peer-[&:not(:placeholder-shown)]:top-4 dark:text-neutral-400'
        >
          {label}
        </label>
        {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
      </div>
    );
  }
);

FloatingInput.displayName = 'FloatingInput';
