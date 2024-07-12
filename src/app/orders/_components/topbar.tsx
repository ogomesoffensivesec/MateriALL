import { forwardRef } from "react";
import { Text, View } from "react-native";

// TopBar Component
export interface TopBarProps {
  children?: React.ReactNode;
}

export const TopBar = forwardRef<View, TopBarProps>(({  children, ...props }, ref) => {
  return (
    <View ref={ref} className={`w-full bg-purple-700 h-4`} {...props}>
      {children}
    </View>
  );
});

TopBar.displayName = 'TopBar';


export const TopbarHeader = forwardRef<View, TopBarProps>(({children, ...props}, ref) => {
  return(
    <View ref={ref} className="  " {...props}>
      {
        children
      }
    </View>
  )
})


TopbarHeader.displayName = 'TopbarHeader'



export const TopbarTitle = forwardRef<View, TopBarProps>(({children, ...props}, ref)=> {
  return( 
    <Text ref={ref} className="font-bold text-md leading-relaxed text-purple-600" {...props}>
      {children}
    </Text>
  )
})

TopbarTitle.displayName = "TopbarTitle"

