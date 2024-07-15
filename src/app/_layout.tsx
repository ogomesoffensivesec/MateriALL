import "@/styles/global.css";

import { View, StatusBar } from "react-native";
import { Slot, useRouter } from "expo-router";
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import {
  useFonts,
  Inter_500Medium,
  Inter_400Regular,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";

import { Loading } from "@/components/loading";
import { auth } from '@/database/firebase.config';

export default function Layout() {
  const [initializing, setInitializing] = useState(true);
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    Inter_500Medium,
    Inter_400Regular,
    Inter_600SemiBold,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {

      const currentUser = user
      if (currentUser || currentUser !== null) {
        setInitializing(false);
        router.push('/orders');
        
      } else {
        setInitializing(false);
        router.push('/login'); 
      }
 

    });

    return unsubscribe;
  }, []);

  if (initializing && !fontsLoaded) {
    return (
      <Loading/>
    );
  }

  return (
    <View className="flex-1 bg-zinc-100 dark:bg-zinc-950">
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Slot />
    </View>
  );
}
