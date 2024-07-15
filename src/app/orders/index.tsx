import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, useColorScheme } from 'react-native';
import OrderCard from './_components/card';
import { Button } from '@/components/button';
import Modal from './_components/createNewOrder';
import { auth, database } from '@/database/firebase.config';
import { OrderType } from '@/types/data.types';
import { onValue, ref } from 'firebase/database';
import { Loading } from '@/components/loading';
import { LogOut } from 'lucide-react-native';
import { signOut } from 'firebase/auth';
export default function Index() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [ordersPerPage, setOrdersPerPage] = useState<number>(3);
  const [orders, setOrders] = useState<OrderType[]>()
  const colorScheme = useColorScheme();

  useEffect(() => {
    const user = auth.currentUser;
    const databaseReference = ref(database, `/users/${user?.uid}/orders`);
    onValue(databaseReference, (snapshot) => {
      const ordersRaw = snapshot.val();
      if (ordersRaw) {
        const sortedOrders = Object.values(ordersRaw).sort((a: any, b: any) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime());
        setOrders(sortedOrders as OrderType[]);
      } else {
        setOrders([]);
      }
    });
    setIsDarkMode(colorScheme === 'dark');
  }, [colorScheme]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const paginatedOrders = orders?.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage);

  if (orders?.length === 0 || orders === null || !orders)  {
    return (
      <Loading/>
    )
  }
  return (
    <View className="flex-1 bg-gray-200 dark:bg-zinc-950">
      <View className="flex-row justify-between items-center px-4 pt-12  mb-4 bg-zinc-950 shadow-xl border-b border-zinc-800 pb-2">
        <Text className="text-lg font-bold text-white ">Meus Pedidos</Text>
       <View className='flex-row  items-center gap-2'>
        <Button icon={<LogOut color={'white'} size={12} />} size='small' onPress={() => signOut(auth)} />
       <Button title="Novo Pedido" size='small' onPress={() => setIsModalOpen(true)} />
       </View>
      </View>

      {orders?.length === 0 ? <View className='flex-1 items-center py-4'>
        <Text className='text-white font-bold text-xl'>Nenhum pedido encontrado!</Text>
      </View> : <FlatList
        className='px-4 '
        data={paginatedOrders}
        renderItem={({ item }) => (
          <OrderCard order={item as OrderType} isDarkMode={isDarkMode} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />}

      <View className="flex-row justify-center items-center gap-2 py-4 ">
        {[...Array(Math.ceil(orders?.length / ordersPerPage)).keys()].map((page) => (
          <Button
            key={page}
            title={(page + 1).toString()}
            size='small'
            onPress={() => handlePageChange(page + 1)}
            className={currentPage !== page + 1 ? 'bg-transparent border-[1px] border-purple-600 text-white' : 'bg-puprle-600/30 text-purple-600'}
          />
        ))}
      </View>

      <Modal visible={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </View>
  );
}
