import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'flex items-center justify-center text-sm md:text-md font-bold transition-all duration-200 ease-out disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'bg-white rounded-full border-2 border-white text-neutral-950 hover:bg-neutral-200',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'bg-transparent hover:underline ',
        link: 'text-primary underline-offset-4 hover:underline',
        underline: 'hover:underline',
      },
      size: {
        default: 'h-12 w-full min-w-41',
        sm: 'h-8 rounded-md px-3 text-xs',
        md: 'h-10 rounded-full w-20',
        lg: 'h-11 px-4',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
