import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { FoodList } from '../components/FoodList';
import OrderEmergent from '../components/OrderEmergent';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function HomePage() {

    const navigation = useNavigation();

    const [foods, setFoods] = useState([]);
    const [orders, setOrders] = useState([]);
    const API_URL = process.env.EXPO_PUBLIC_API_URL;

    console.log(API_URL);

    useFocusEffect(
        useCallback(() => {
            fetch(`${API_URL}/foods`, {
                headers: {
                    "Content-Type": "Application/json",
                    "ngrok-skip-browser-warning": "true"
                }

            })
                .then(res => res.json())
                .then(data => setFoods(data))
                .catch(err => console.error('Error al cargar alimentos:', err));
        }, [API_URL])
    );

    const addFood = (food) => {
        setOrders((prev) => [...prev, food]);
    };

    const handleNavigateToAddFood = () => {
        navigation.navigate('AddFood');
    };

    const totalOrders = orders.length;
    const totalPrice = orders.reduce((sum, item) => sum + item.price, 0);

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handleNavigateToAddFood}>
                <Text style={styles.buttonText}>Añadir Comida</Text>
            </TouchableOpacity>
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
    button: {
        backgroundColor: '#000',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 16,
        margin: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
    },
});
