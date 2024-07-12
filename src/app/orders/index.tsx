import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, useColorScheme } from 'react-native';
import OrderCard from './_components/card';
import { Button } from '@/components/button';
import Modal from './_components/modal';

// Mock data for orders
const mockOrders = [
  {
    id: 1,
    customerName: 'João da Silva',
    dateTime: '23/05/2023 - 15:30',
    items: [
      { name: 'Cadeira de Escritório', quantity: 2 },
      { name: 'Luminária de Mesa', quantity: 1 }
    ],
    deliveryLocation: 'Escritório Central',
    status: 'Entregue'
  },
  {
    id: 2,
    customerName: 'Maria Santos',
    dateTime: '21/05/2023 - 10:45',
    items: [
      { name: 'Estante de Livros', quantity: 1 },
      { name: 'Tapete Decorativo', quantity: 2 }
    ],
    deliveryLocation: 'Loja Central',
    status: 'Em Trânsito'
  },
  {
    id: 3,
    customerName: 'João Carlos',
    dateTime: '18/05/2023 - 09:20',
    items: [
      { name: 'Sofá de 3 Lugares', quantity: 1 },
      { name: 'Mesa de Centro', quantity: 1 }
    ],
    deliveryLocation: 'Apartamento 302',
    status: 'Cancelado'
  },
  {
    id: 4,
    customerName: 'Ana Paula',
    dateTime: '25/05/2023 - 14:00',
    items: [
      { name: 'Cama de Casal', quantity: 1 },
      { name: 'Cortina de Banho', quantity: 1 }
    ],
    deliveryLocation: 'Casa 123',
    status: 'Entregue'
  },
  {
    id: 5,
    customerName: 'Pedro Henrique',
    dateTime: '20/05/2023 - 11:15',
    items: [
      { name: 'Mesa de Jantar', quantity: 1 },
      { name: 'Cadeira de Jantar', quantity: 4 }
    ],
    deliveryLocation: 'Apartamento 101',
    status: 'Em Trânsito'
  },
  {
    id: 6,
    customerName: 'Luana Souza',
    dateTime: '19/05/2023 - 08:30',
    items: [
      { name: 'Sofá de 2 Lugares', quantity: 1 },
      { name: 'Luminária de Teto', quantity: 1 }
    ],
    deliveryLocation: 'Casa 456',
    status: 'Cancelado'
  },
  {
    id: 7,
    customerName: 'Carlos Eduardo',
    dateTime: '24/05/2023 - 13:45',
    items: [
      { name: 'Estante de TV', quantity: 1 },
      { name: 'Tapete de Sala', quantity: 1 }
    ],
    deliveryLocation: 'Apartamento 202',
    status: 'Entregue'
  },
  {
    id: 8,
    customerName: 'Juliana Martins',
    dateTime: '22/05/2023 - 12:00',
    items: [
      { name: 'Cama de Solteiro', quantity: 1 },
      { name: 'Cortina de Quarto', quantity: 1 }
    ],
    deliveryLocation: 'Casa 789',
    status: 'Em Trânsito'
  },
  {
    id: 9,
    customerName: 'Rafael Oliveira',
    dateTime: '17/05/2023 - 07:40',
    items: [
      { name: 'Mesa de Computador', quantity: 1 },
      { name: 'Cadeira de Computador', quantity: 1 }
    ],
    deliveryLocation: 'Escritório Lateral',
    status: 'Cancelado'
  },
  {
    id: 10,
    customerName: 'Gabriela Silva',
    dateTime: '26/05/2023 - 15:15',
    items: [
      { name: 'Sofá de 4 Lugares', quantity: 1 },
      { name: 'Mesa de Jantar', quantity: 1 }
    ],
    deliveryLocation: 'Casa 1010',
    status: 'Entregue'
  },
  {
    id: 11,
    customerName: 'Bruno Alves',
    dateTime: '27/05/2023 - 16:00',
    items: [
      { name: 'Cama de Casal', quantity: 1 },
      { name: 'Cortina de Banho', quantity: 1 }
    ],
    deliveryLocation: 'Apartamento 303',
    status: 'Em Trânsito'
  },
  {
    id: 12,
    customerName: 'Alessandra Costa',
    dateTime: '28/05/2023 - 17:00',
    items: [
      { name: 'Mesa de Escritório', quantity: 1 },
      { name: 'Cadeira de Escritório', quantity: 1 }
    ],
    deliveryLocation: 'Escritório Central',
    status: 'Cancelado'
  },
  {
    id: 13,
    customerName: 'Lucas Ferreira',
    dateTime: '29/05/2023 - 18:00',
    items: [
      { name: 'Sofá de 3 Lugares', quantity: 1 },
      { name: 'Mesa de Centro', quantity: 1 }
    ],
    deliveryLocation: 'Apartamento 404',
    status: 'Entregue'
  }
];

export default function Component() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(4);
  const colorScheme = useColorScheme();

  useEffect(() => {
    setIsDarkMode(colorScheme === 'dark');
  }, [colorScheme]);

  const handlePageChange = (newPage: any) => {
    setCurrentPage(newPage);
  };

  const paginatedOrders = mockOrders.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage);

  return (
    <View className="flex-1 bg-gray-200 dark:bg-zinc-950">
      <View className="flex-row justify-between items-center px-4 pt-12  mb-4 bg-zinc-950 shadow-xl border-b border-zinc-800 pb-2">
        <Text className="text-lg font-bold text-white ">Meus Pedidos</Text>
        <Button title="Novo Pedido" size='small' onPress={() => setIsModalOpen(true)} />
      </View>

        <FlatList
        className='px-4'
          data={paginatedOrders}
          renderItem={({ item }) => (
            <OrderCard order={item} isDarkMode={isDarkMode} />
          )}
          keyExtractor={(item) => item.id.toString()}
        />

      <View className="flex-row justify-center items-center gap-4  py-4 ">
        <Button size='small' title="Anterior" onPress={() => handlePageChange(currentPage - 1)} />
        <Text>{currentPage}</Text>
        <Button size='small' title="Próximo" onPress={() => handlePageChange(currentPage + 1)} />
      </View>

      <Modal visible={isModalOpen} onClose={() => setIsModalOpen(false)}  />
    </View>
  );
}
