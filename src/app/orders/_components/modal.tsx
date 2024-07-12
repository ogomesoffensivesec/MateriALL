import { Button } from '@/components/button';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Modal as RNModal, Alert } from 'react-native';

interface ModalProps {
  visible: boolean;
  onClose: () => void;

}

const Modal: React.FC<ModalProps> = ({ visible, onClose, }) => {
  const [items, setItems] = useState([{ item: '', quantity: '' }]);
  const [selectedWork, setSelectedWork] = useState('');

  useEffect(() => {
    // Assuming there's a function to fetch works from the database
    // fetchWorks().then(works => setWorks(works));
  }, []);

  const handleAddItem = () => {
    const hasEmptyFields = items.some(item => item.item === '' || item.quantity === '');
    if (hasEmptyFields) {
      Alert.alert('Aviso', 'Todos os campos devem ser preenchidos para adicionar um item.');
      return;
    }
    setItems([...items, { item: '', quantity: '' }]);
  };

  const handleEditItem = (index: number, item: string, quantity: string) => {
    setItems(items.map((i, idx) => idx === index ? { ...i, item, quantity } : i));
  };

  return (
    <RNModal visible={visible} onRequestClose={onClose} transparent>
      <View className="flex-1 justify-center items-center bg-black/70 px-4 ">
        <View className="bg-white p-4 rounded-lg w-90 w-full ">
          <Text className="text-lg font-bold mb-2">Adicionar Materiais ao Pedido</Text>
          {items.map((item, index) => (
            <View key={index} className="flex-row justify-between items-center">
              <TextInput
                placeholder="Item"
                className="bg-white p-1 border border-gray-300 rounded-md mb-2 flex-1"
                value={item.item}
                onChangeText={(text) => handleEditItem(index, text, item.quantity)}
              />
              <TextInput
                placeholder="Quantidade"
                className="bg-white p-1 border border-gray-300 rounded-md mb-2 ml-2 flex-1"
                keyboardType="numeric"
                value={item.quantity}
                onChangeText={(text) => handleEditItem(index, item.item, text)}
              />
            </View>
          ))}
          <Button title="Adicionar Item" size='small' onPress={handleAddItem} className='my-4' />
          <View className="flex-row justify-end gap-2">
            <Button title="Cancelar" variant='error' onPress={onClose}  size='small'/>
            <Button title="Salvar Pedido" onPress={onClose}  size='small'/>
          </View>
        </View>
      </View>
    </RNModal>
  );
}

export default Modal;
