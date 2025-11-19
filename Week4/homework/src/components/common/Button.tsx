import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'cancel' | 'delete';
}

const Button = ({ 
  children, 
  variant = 'primary', 
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
      className={cn(variantClass, className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;