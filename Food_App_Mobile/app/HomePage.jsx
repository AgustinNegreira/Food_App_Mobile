import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { FoodList } from '../components/FoodList';
import OrderEmergent from '../components/OrderEmergent';

export default function HomePage() {

  const [foods, setFoods] = useState([]);
  const [orders, setOrders] = useState([]);
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
  // Cargar foods
  fetch(`${API_URL}/foods`, {
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true"
    }
  })
    .then(res => res.json())
    .then(data => setFoods(data))
    .catch(err => console.error('Error al cargar alimentos:', err));

  // Cargar orders
  fetch(`${API_URL}/orders`, {
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true"
    }
  })
    .then(res => res.json())
    .then(data => setOrders(data))
    .catch(err => console.error('Error al cargar órdenes:', err));

}, []);


  const addFood = async (food) => {
    if (food.stock <= 0) {
      alert('No hay stock disponible');
      return;
    }
 
    setOrders((prev) => [...prev, food]);

    // Actualizar stock local
    setFoods((prevFoods) =>
      prevFoods.map((item) =>
        item.id === food.id
          ? { ...item, stock: item.stock - 1 }
          : item
      )
    );

    // Actualizar stock en el servidor???????
    try {
      await fetch(`${API_URL}/foods/${food.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify({ stock: food.stock - 1 }),
      });
    } catch (err) {
      console.error('Error al actualizar el stock:', err);
    }

    // Actualizar o crear en /orders
    try {
      // Ver si ya existe el item en orders
      const res = await fetch(`${API_URL}/orders/${food.id}`, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        }
      });

      if (res.ok) {
        // Ya existe, actualizar quantity
        const existingOrder = await res.json();
        await fetch(`${API_URL}/orders/${food.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
          },
          body: JSON.stringify({
            quantity: existingOrder.quantity + 1
          }),
        });
      } else if (res.status === 404) {
        // No existe, crear nuevo order
        await fetch(`${API_URL}/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
          },
          body: JSON.stringify({
            id: food.id,
            name: food.name,
            price: food.price,
            quantity: 1
          }),
        });
      } else {
        console.error('Error al consultar order:', res.status);
      }
    } catch (err) {
      console.error('Error al actualizar/crear order:', err);
    }
  };


  const totalOrders = orders.length;
  const totalPrice = orders.reduce((sum, item) => sum + item.price, 0);

  return (
    <SafeAreaView style={styles.container}>
      <FoodList foodElements={foods} addFood={addFood} />
      <OrderEmergent totalOrders={totalOrders} totalPrice={totalPrice} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 100, // deja espacio para OrderEmergent
  },
});
