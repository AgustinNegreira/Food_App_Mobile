// OrderPage.jsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator, Text } from 'react-native';
import OrderList from '../components/OrderList';
import OrderEmergent from '../components/OrderEmergent';

export default function OrderPage() {

    const [orders, setOrders] = useState([]);
    const API_URL = process.env.EXPO_PUBLIC_API_URL;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/orders`, {
            headers: {
                "Content-Type": "Application/json",
                "ngrok-skip-browser-warning": "true"
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Error al obtener las órdenes');
                }
                return res.json();
            })
            .then(data => setOrders(data))
            .catch(err => {
                console.error('Error al cargar órdenes:', err);
                setError(err.message);
            })
            .finally(() => setLoading(false));
    }, []);

    const totalOrders = orders.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = orders.reduce((sum, item) => sum + item.quantity * item.price, 0) + 45;

    return (
        <SafeAreaView style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#000" style={styles.loader} />
            ) : error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : (
                <>
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <OrderList order={orders} />
                    </ScrollView>
                    <OrderEmergent totalOrders={totalOrders} totalPrice={totalPrice} />
                </>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingBottom: 100, // deja espacio para OrderEmergent
    },
    scrollContainer: {
        paddingBottom: 100,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
});
