import React from 'react';
import { Text } from 'react-native';
import OrderEmergent from '../components/OrderEmergent';

export default function HomeScreen() {
  return (
    <>
      <Text>hola mundo</Text>
      <OrderEmergent totalOrders={5} totalPrice={50}/>
    </>
  );
}