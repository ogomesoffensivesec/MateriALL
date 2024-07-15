import { Button } from '@/components/button';
import type { OrderType } from '@/types/data.types';
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { auth } from '@/database/firebase.config';
import { deleteOrderByPending } from '@/functions/order.functions';
import OrderDetailsModal from './order.details';

const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];

const OrderCard: React.FC<{ order: OrderType; isDarkMode: boolean }> = ({ order, isDarkMode }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function handleCancelOrder(orderId: string | number[] | '') {
    const userId = auth.currentUser?.uid || ''
    deleteOrderByPending(userId, orderId)
  }

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <View className={`p-6 mt-3 shadow-md ${isDarkMode ? 'bg-zinc-900' : 'bg-white'} rounded-md`}>
      <View className="flex-row items-center">
        <View>
          <Text className={`font-bold text-lg text-purple-800 dark:text-purple-200`}>Entrega: {order.build}</Text>
          <Text style={{ color: isDarkMode ? 'gray' : 'gray' }}>{order.createAt}</Text>
        </View>
      </View>
      <View className="mt-2">
        {order.items.slice(0, 3).map((item, index) => (
          <View key={index} className="flex-row justify-between mb-2">
            <Text style={{ color: isDarkMode ? 'white' : 'black' }}>{item.description}</Text>
            <Text style={{ color: isDarkMode ? 'white' : 'black' }}>{item.quantity} unidades</Text>
          </View>
        ))}
      </View>

      <View className={`flex-row ${order.status !== 'Solicitado' ? 'justify-end' : 'justify-around'} gap-3 items-center w-full mt-4`}>
        {
          order.status === 'Solicitado' &&
          <Button size='smallest' title='Cancelar' variant='error' className='px-5' onPress={()=>handleCancelOrder(order?.id)}/>
        }
        <Button size='smallest' title='Opções' onPress={handleOpenModal} className='px-5' />
        <View className={` w-[90px] items-center justify-center px-2 py-1 rounded ${order.status === 'Entregue' ? 'bg-emerald-400 dark:bg-emerald-600/60' : order.status === 'Em Trânsito' ? 'bg-amber-400 dark:bg-amber-600/60' : order.status === 'Solicitado' ? 'bg-teal-400 dark:bg-teal-600/60' : 'bg-stone-400/60'}`}>
          <Text className='text-zinc-950   dark:text-zinc-300'>{order.status}</Text>
        </View>
      </View>
      <OrderDetailsModal order={order} visible={isModalOpen} onClose={handleCloseModal} />
    </View>
  );
}

export default OrderCard;
