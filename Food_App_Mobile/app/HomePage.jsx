import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { FoodList } from '../components/FoodList';
import OrderEmergent from '../components/OrderEmergent';

export default function HomePage() {
    const [foods, setFoods] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('http://192.168.1.77:3000/foods') // Cambia esto por tu IP local si lo corrés en emulador/dispositivo
            .then(res => res.json())
            .then(data => setFoods(data))
            .catch(err => console.error('Error al cargar alimentos:', err));
    }, []);

    const addFood = (food) => {
        setOrders((prev) => [...prev, food]);
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
