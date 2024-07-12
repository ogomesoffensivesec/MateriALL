import { forwardRef } from 'react';
import { Text, TouchableOpacity } from 'react-native';

export interface ButtonProps {
  variant?: 'default' | 'error' | 'success' | 'warning' | 'outlined' | 'muted';
  size?: 'small' | 'medium' | 'large';
  title: string;
  onPress: () => void;
  className?: string;
}

const Button = forwardRef<TouchableOpacity, ButtonProps>(
  ({ variant = 'default', size = 'medium', title, onPress, className = '', ...props }, ref) => {
    let baseClasses = 'rounded-md items-center ';
    let variantClasses = '';
    let sizeClasses = '';

    switch (variant) {
      case 'default':
        variantClasses = 'bg-purple-600 text-white ';
        break;
      case 'error':
        variantClasses = 'bg-red-500 text-white ';
        break;
      case 'success':
        variantClasses = 'bg-green-500 text-white ';
        break;
      case 'warning':
        variantClasses = 'bg-yellow-500 text-white ';
        break;
      case 'outlined':
        variantClasses = 'bg-transparent border-2 border-purple-600 text-purple-600 ';
        break;
      case 'muted':
        variantClasses = 'bg-gray-400 text-white ';
        break;
      default:
        variantClasses = 'bg-purple-600 text-white ';
    }

    switch (size) {
      case 'small':
        sizeClasses = 'py-2 px-3 my-1 ';
        break;
      case 'large':
        sizeClasses = 'py-4 px-6 my-3 ';
        break;
      default:
        sizeClasses = 'py-3 px-4 my-2 ';
    }

    return (
      <TouchableOpacity
        ref={ref}
        
        onPress={onPress}
        className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
        {...props}
      >
        <Text className='text-white'>{title}</Text>
        
      </TouchableOpacity>
    );
  }
);

export { Button };
