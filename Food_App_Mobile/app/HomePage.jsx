import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { FoodList } from '../components/FoodList';
import OrderEmergent from '../components/OrderEmergent';

export default function HomePage() {

    const [foods, setFoods] = useState([]);
    const [orders, setOrders] = useState([]);
    const API_URL = process.env.EXPO_PUBLIC_API_URL;

    useEffect(() => {
        fetch(`${API_URL}/foods`)
            .then(res => res.json())
            .then(data => setFoods(data))
            .catch(err => console.error('Error al cargar alimentos:', err));
    }, []);

    const addFood = (selectedFood) => {

        if (selectedFood.stock === 0) {
            return
        }

        const updatedFoods = foods.map(food =>
            food.name === selectedFood.name ? { ...food, stock: food.stock - 1 } : food
        );

        setOrders((prev) => [...prev, selectedFood]);
    };
    // modificar para reducir el stock del articulo

    /*
    const addToCart = (selectedFood) => {

    if (selectedFood.stock === 0) {
      return;
    }

    const updatedFoods = data.foods.map(food =>
      food.name === selectedFood.name ? { ...food, stock: food.stock - 1 } : food
    );

    const orderExists = data.orders.find(order => order.name === selectedFood.name)

    let updatedOrders;
    if (orderExists) {
      updatedOrders = data.orders.map(order =>
        order.name === selectedFood.name ?
          { ...order, quantity: order.quantity + 1, price: selectedFood.price * (order.quantity + 1) }
          : order
      );
    } else {
      updatedOrders = [...data.orders, { name: selectedFood.name, quantity: 1, price: selectedFood.price }]
    }

    setData({ foods: updatedFoods, orders: updatedOrders })
  }
    */

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
