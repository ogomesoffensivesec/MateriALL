import React from 'react';
import { View, Text, FlatList, Modal as RNModal } from 'react-native';
import { OrderType } from '@/types/data.types';
import { Button } from '@/components/button';

interface OrderDetailsModalProps {
  order: OrderType;
  visible: boolean;
  onClose: () => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ order, visible, onClose }) => {
  return (
    <RNModal visible={visible} onRequestClose={onClose} transparent>
      <View className="flex-1 justify-center items-center bg-black/70 px-4">
        <View className="bg-white dark:bg-zinc-900 p-4 rounded-lg w-90 w-full">
          <Text className="text-zinc-950 dark:text-white text-lg font-bold mb-2">
            Detalhes do Pedido
          </Text>
          <View className="mb-4">

            <Text className="text-zinc-600 dark:text-white text-lg">
              <Text className="font-bold">Data de Criação:</Text> {new Date(order.createAt).toLocaleDateString('pt-BR')}
            </Text>
            <Text className="text-zinc-600 dark:text-white text-lg">
              <Text className="font-bold">Status:</Text> {order.status}
            </Text>
            <Text className="text-zinc-600 dark:text-white text-lg">
              <Text className="font-bold">Endereço de entrega:</Text> {order.build}
            </Text>
          </View>
          <Text className='text-xl text-purple-600 mb-2 dark:text-zinc-50'>
            Itens deste pedido:
          </Text>
          <FlatList
            data={order.items}
            renderItem={({ item }) => (
              <View className="mb-1">
                <Text className="text-zinc-600 dark:text-white text-lg">
                  <Text className="font-bold">{item.description}:</Text> {item.quantity} unidades
                </Text>
              </View>
            )}
            keyExtractor={(item) => item.description}
          />
          <View className='flex-row items-center gap-3 justify-end mt-4'>
            <Button title='Solicitar cancelamento do pedido' size='small' variant='error' onPress={() => console.log('Cancel receive')} />
            <Button title="Fechar" size='small' onPress={onClose} className='my-4' />
          </View>
        </View>
      </View>
    </RNModal>
  );
};

export default OrderDetailsModal;
