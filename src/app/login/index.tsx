import React, { useEffect, useState } from 'react';
import { View, Text, Image, useColorScheme } from 'react-native';
import { Input } from '@/components/input';
import { RouteButton } from '@/components/route.button';
import { router } from 'expo-router';
import { signIn } from '@/functions/order.functions';

export default function Index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false)
  const handleEmailChange = (text: string) => setEmail(text);
  const handlePasswordChange = (text: string) => setPassword(text);
  const colorScheme = useColorScheme()

  useEffect(() => {
    if (email !== '' && password !== '') {
      setIsFormValid(true)
    }
  }, [email, password])

  useEffect(() => {

    if (colorScheme === 'dark') {
      setIsDarkMode(true)
    } else {
      setIsDarkMode(false)
    }
  }, [])


  const validateEmail = (email: string) => {
    // Regex para validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onSubmit = async () => {
    if (email && validateEmail(email) && password) {
      await signIn(email, password)
      router.navigate('/orders')
    } else {
      alert('email invalido'); // Define isValidEmail como falso se o email não for válido
    }
  };
  return (
    <View className={`flex-1 items-center justify-center transition-all duration-300  ${isDarkMode ? 'bg-zinc-950' : 'bg-zinc-200'}`}>

      <Image
        source={isDarkMode ? require(`@/assets/logo-white.png`) : require(`@/assets/logo-black.png`)}
        style={{ height: 80 }}
        resizeMode='contain'
      />
      <Text style={{ color: isDarkMode ? '#cccccc' : '#666666', marginVertical: 10 }}>
        Entre com email e senha para realizar seus pedidos.
      </Text>
      <View className={`w-5/6 justify-center gap-2 border-[1px] border-purple-900/50 rounded-lg shadow-md mt-6 bg-zinc-100 ${isDarkMode ? 'bg-zinc-900' : 'bg-zinc-100'} p-6 h-[230px]`}>
        <Input
          placeholder='Digite seu e-mail'
          label='E-mail'
          inputMode='email'
          value={email}
          onChangeText={handleEmailChange}
          inputClasses={isDarkMode ? 'text-white' : 'text-black'}
          placeholderTextColor={isDarkMode ? 'white' : 'black'}
        />
        <Input
          placeholder='Digite sua senha'
          label='Senha'
          secureTextEntry={true}
          value={password}
          onChangeText={handlePasswordChange}
          inputClasses={isDarkMode ? 'text-white' : 'text-black'}
          placeholderTextColor={isDarkMode ? 'white' : 'black'}
        />
        <RouteButton
          title="Entrar na conta"
          variant="default"
          disabled={isFormValid}
          className={`${isFormValid ? '' : 'opacity-50'}`}
          onPress={onSubmit}
        />
      </View>

    </View>
  );
}
