import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

type FloatingTextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label: string;
    error?: string;
  };

export const FloatingTextarea = forwardRef<
  HTMLTextAreaElement,
  FloatingTextareaProps
>(({ label, error, className, id, ...props }, ref) => {
  const textareaId = id || props.name;

  return (
    <div className='relative w-full'>
      <Textarea
        id={textareaId}
        ref={ref}
        placeholder=' ' // penting untuk peer-placeholder-shown
        className={cn(
          'peer min-h-[120px] pt-6 text-sm md:text-md resize-y',
          className
        )}
        {...props}
      />
      <label
        htmlFor={textareaId}
        className={cn(
          'absolute left-3 text-sm text-neutral-500 transition-all duration-200',
          // posisi awal (placeholder shown)
          'top-6 -translate-y-1/2 peer-placeholder-shown:top-6 peer-placeholder-shown:-translate-y-1/2',
          // saat fokus atau ada isi
          'peer-focus:top-2 peer-focus:text-xs peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:text-xs',
          'dark:text-neutral-400'
        )}
      >
        {label}
      </label>
      {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
    </div>
  );
});

FloatingTextarea.displayName = 'FloatingTextarea';
