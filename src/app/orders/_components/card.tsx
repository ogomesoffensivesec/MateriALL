import React from 'react';
import { View, Text, Image } from 'react-native';

interface OrderCardProps {
  order: {
    id: number;
    customerName: string;
    dateTime: string;
    items: { name: string; quantity: number }[];
    deliveryLocation: string;
    status: string;
  };
  isDarkMode: boolean;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, isDarkMode }) => {
  return (
    <View className={`p-6 mt-3 shadow-md ${isDarkMode ? 'bg-zinc-900' : 'bg-white'} rounded-md`}>
      <View className="flex-row items-center">
        <View>
          <Text className={`font-bold text-lg text-purple-800 dark:text-purple-200`}>{order.customerName}</Text>
          <Text style={{ color: isDarkMode ? 'gray' : 'gray' }}>{order.dateTime}</Text>
        </View>
      </View>
      <View className="mt-2">
        {order.items.map((item, index) => (
          <View key={index} className="flex-row justify-between mb-2">
            <Text style={{ color: isDarkMode ? 'white' : 'black' }}>{item.name}</Text>
            <Text style={{ color: isDarkMode ? 'white' : 'black' }}>{item.quantity} unidades</Text>
          </View>
        ))}
      </View>
      <View className="flex-row justify-between items-center w-full mt-2">
        <Text style={{ color: isDarkMode ? 'gray' : 'gray' }}>Entrega: {order.deliveryLocation}</Text>
        <View className={`px-2 py-1 rounded ${order.status === 'Entregue' ? 'bg-purple-600' : order.status === 'Em Trânsito' ? 'bg-yellow-500' : 'bg-gray-400'}`}>
          <Text style={{ color: 'white' }}>{order.status}</Text>
        </View>
      </View>
    </View>
  );
}

export default OrderCard;
