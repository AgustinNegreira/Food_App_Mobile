import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './HomePage';
import AddFood from './AddFood';
import OrderPage from './OrderPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="AddFood" component={AddFood} options={{ title: 'Agregar Comida' }} />
        <Stack.Screen name="Orders" component={OrderPage} options={{ title: 'Órdenes' }} />
      </Stack.Navigator>
  );
}
