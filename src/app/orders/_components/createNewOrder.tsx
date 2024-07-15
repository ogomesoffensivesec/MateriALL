
import { Button } from '@/components/button';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Modal as RNModal, Alert, useColorScheme } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { createNewOrder, } from '@/functions/order.functions';
import { auth } from '@/database/firebase.config';
import uuid from 'react-native-uuid';
interface ModalProps {
  visible: boolean;
  onClose: () => void;

}

const Modal: React.FC<ModalProps> = ({ visible, onClose, }) => {
  const [items, setItems] = useState([{ item: '', quantity: '' }]);
  const [selectedWork, setSelectedWork] = useState('');
  const works = [{ label: 'Obra 1', value: 'obra1' }, { label: 'Obra 2', value: 'obra2' }];
const [loading, setLoading] = useState(false)
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

  const theme = useColorScheme()

  async function onSubmit() {
    const hasEmptyFields = items.some(item => item.item === '' || item.quantity === '');
    if (hasEmptyFields || selectedWork === '') {
      Alert.alert('Aviso', 'Todos os campos devem ser preenchidos para enviar o pedido.');
      return;
    }

    const insuficientItems = await items.filter(item => parseInt(item.quantity) < 0)

    if (insuficientItems.length > 0) {
      Alert.alert('A quantidade de itens deve ser maior do que 0!!')
      return
    }
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0]; // Exemplo: '2023-03-16'

const id = uuid.v4() 
    const order = { 
    items: items.map(item => ({ description: item.item, quantity: item.quantity })),
    build: selectedWork,
    id: id || '',
    createAt: formattedDate,
    status: 'Solicitado'
    }

    // const unsubscribe = onAuthStateChanged(auth, (user: any) => {

    //   const currentUser = user
    //   if (currentUser || currentUser !== null) {
    //     setInitializing(false);
    //     router.push('/orders');
        
    //   } else {
    //     setInitializing(false);
    //     router.push('/login'); 
    //   }
 

    // });

    const user = auth.currentUser
    const userId = user?.uid || ''


    // Lógica para enviar o pedido
    await createNewOrder(order, userId, setLoading)
  items.forEach((item, index) => {
    item.item = '';
    item.quantity = '';
  });
  setSelectedWork('');
  }

  return (
    <RNModal visible={visible} onRequestClose={onClose} transparent>
      <View className="flex-1 justify-center items-center bg-black/70 px-4 ">
        <View className="bg-white dark:bg-zinc-900 p-4 rounded-lg w-90 w-full ">
          <Text className="text-zinc-950 dark:text-white text-lg font-bold mb-2">Adicionar Materiais ao Pedido</Text>
          {items.map((item, index) => (
            <View key={index} className="flex-row justify-between items-center">
              <TextInput
                placeholder="Item"
                className=" p-1 dark:text-white/80 pl-3  border border-gray-300 rounded-md mb-2 flex-1 placeholder:dark:text-white"
                value={item.item}
                onChangeText={(text) => handleEditItem(index, text, item.quantity)}
              />
             <View>
             <TextInput
                placeholder="Quantidade"
                className="p-1 px-3 dark:text-white/80 border border-gray-300 rounded-md mb-2 ml-2 flex-1 pl-3 placeholder:dark:text-white"
                keyboardType="numeric"
                value={item.quantity}
                onChangeText={(text) => handleEditItem(index, item.item, text)}
              />
            </View>
            </View>
          ))}
          <View className='border-[1px] dark:bg-zinc-900  border-zinc-300 rounded-md  h-12 justify-center text-zinc-600 dark:text-white'>
            <Picker 
              selectedValue={selectedWork}
              placeholder='Selecione uma obra para o pedido ser entregue'
              onBlur={(e) => console.log(e)}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedWork(itemValue)
              }
            >
              {works.map((work, index) => (
                <Picker.Item key={index} label={work.label} value={work.value}
            />
              ))}
            </Picker>
          </View>
          <Button title="Adicionar Item" size='small' onPress={handleAddItem} className='my-4' />
          <View className="flex-row justify-end gap-2">
            <Button title="Cancelar" variant='error' onPress={onClose} size='small' />
            <Button title={`${loading ? 'Enviando pedido...' : 'Salvar Pedido'}`} onPress={onSubmit} size='small' />
          </View>
        </View>
      </View>
    </RNModal>
  );
}

export default Modal;
