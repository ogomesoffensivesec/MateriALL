import { forwardRef } from 'react';
import { Text, Pressable } from 'react-native';
import type { PressableProps } from 'react-native';

export interface RouteButtonProps {
  variant?: 'default' | 'error' | 'success' | 'warning' | 'outlined' | 'muted';
  title: string;
  className?: string;
  disabled?: boolean;
  onPress?: () => void; // Adicionei onPress como propriedade opcional
}

const RouteButton = forwardRef<PressableProps, RouteButtonProps>(
  ({ variant = 'default', title, className = '', onPress, disabled = false, ...props }, ref) => {
    let baseClasses = 'py-2 px-4 rounded-md items-center text-white ';
    let variantClasses = '';

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


    return (
        <Pressable
    onPress={onPress}
          className={`${baseClasses} ${variantClasses} ${className}`}
          {...props}
        >
          <Text className='text-white'>{title}</Text>
        </Pressable>
    );
  }
);

export { RouteButton };
