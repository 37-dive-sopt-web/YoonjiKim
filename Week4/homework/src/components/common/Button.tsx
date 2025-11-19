import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'cancel' | 'delete';
  fullWidth?: boolean;
  disabled?: boolean;
}

const Button = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className,
  ...props 
}: ButtonProps) => {
  const variantClass = {
    primary: 'btn-primary',
    cancel: 'btn-cancel',
    delete: 'btn-delete',
  }[variant];

  return (
    <button
      className={cn(variantClass, fullWidth && 'w-full', className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;