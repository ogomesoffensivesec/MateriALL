import { forwardRef } from 'react';
import { Text, TextInput, View } from 'react-native';

export interface InputProps
  extends React.ComponentPropsWithoutRef<typeof TextInput> {
  label?: string;
  labelClasses?: string;
  inputClasses?: string;
}

const Input = forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({ className, label, labelClasses, inputClasses, placeholder, ...props }, ref) => (
    <View className={`${className} flex flex-col gap-1.5`}>
      {label && <Text className={`${labelClasses} text-base text-zinc-400`}>{label}</Text>}
      <TextInput
        className={`${inputClasses} border py-1.5 px-4 rounded-lg border-zinc-600 
        text-zinc-400
        placeholder:text-zinc-500`}
        placeholder={placeholder}
        {...props}
      />
    </View>
  )
);

export { Input };
