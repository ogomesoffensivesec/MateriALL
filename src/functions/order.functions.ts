import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../database/firebase.config";
import { get, ref, remove, set } from "firebase/database";
import { Alert } from "react-native";
import type { OrderType } from "@/types/data.types";

interface SignInError extends Error {
  code?: string;
}

// Entrar com email e senha
export async function signIn(email: string, password: string): Promise<string | null> {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return null; // Sucesso, sem erro
  } catch (error) {
    const signInError = error as SignInError;
    let errorMessage = '';

    switch (signInError.code) {
      case 'auth/invalid-credential':
        errorMessage = 'Usuário sem cadastro. Contate o administrador!'
        break
      case 'auth/invalid-email':
        errorMessage = 'Email inválido.';
        break;
      case 'auth/user-disabled':
        errorMessage = 'Usuário desativado.';
        break;
      case 'auth/user-not-found':
        errorMessage = 'Usuário não encontrado.';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Senha incorreta.';
        break;
      default:
        errorMessage = 'Erro desconhecido.';
    }
    console.log(signInError)
    return errorMessage; // Retorna a mensagem de erro
  }
}

//Ler todos os pedididos deste usuário

//Realizar novo pedido



export async function createNewOrder(order: OrderType, userId: string, setLoading: (loading: boolean) => void) {
  setLoading(true);
  try {
    const databaseReference = ref(database, `/users/${userId}/orders/${order.id}`);
    await set(databaseReference, order);
    Alert.alert('Pedido realizado!');
    return
  } catch (error) {
    if (error instanceof Error) {
      switch (error.cause) {
        case 'database/permission-denied':
          Alert.alert('Erro', 'Você não tem permissão para realizar esta ação.');
          break;
        case 'database/unknown-error':
          Alert.alert('Erro', 'Erro desconhecido ao criar o pedido.');
          break;
        case 'database/invalid-argument':
          Alert.alert('Erro', 'Argumentos inválidos ao criar o pedido.');
          break;
        case 'database/operation-not-supported':
          Alert.alert('Erro', 'Operação não suportada ao criar o pedido.');
          break;
        default:
          Alert.alert('Erro', 'Erro ao criar o pedido. Tente novamente mais tarde.');
      }
    }
    console.error(error);
    return
  } finally {
    setLoading(false);
  }
}

export async function readAllOrderByUserId(userId: string ) {
  try {
    const databaseReference = ref(database, `/users/${userId}/orders`)
    const snapshot = await get(databaseReference)
    const orders = Object.values(snapshot.val())
    if (orders.length === 0) {
      Alert.alert('Nenhum pedido encontradoa!')
    }
    return orders

  } catch (error) {
    Alert.alert('Nenhum pedido encontrado!')
  }
}



export async function deleteOrderByPending(userId: string | number[], orderId: string | number[]) {
  try {
    const databaseReference = await ref(database, `/users/${userId}/orders/${orderId}`)
    await remove(databaseReference)
    Alert.alert('Pedido cancelado com sucesso!')
  } catch (error) {
    Alert.alert('Erro ao cancelar pedido!')
  }finally{ 
    return
  }
}