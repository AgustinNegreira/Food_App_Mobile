import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function FoodElement({ product, addFood }) {
    const navigation = useNavigation();

    const stockStyle = product.stock > 0 ? styles.stockPositive : styles.stockZero;

    return (
        <View style={styles.foodElement}>
            <Text style={styles.foodEmoji}>{product.img}</Text>
            <Text style={stockStyle}>
                Precio: ${product.price}{"\n"}
                Stock: {product.stock}
            </Text>
            <TouchableOpacity style={styles.addButton} onPress={() => addFood(product)}>
                <Text style={styles.buttonText}>Añadir</Text>
            </TouchableOpacity>
        </View>
    );
}

export const styles = StyleSheet.create({
    foodElement: {
        width: 160,
        height: 220,
        backgroundColor: '#fff',
        borderRadius: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 8,
        paddingVertical: 16,
        paddingHorizontal: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    stockPositive: {
        fontSize: 12,
        color: 'green',
    },
    stockZero: {
        fontSize: 12,
        color: 'red',
    },
    foodEmoji: {
        fontSize: 80,
    },
    addButton: {
        backgroundColor: '#000',
        borderRadius: 16,
        paddingVertical: 10,
        paddingHorizontal: 24,
        marginTop: 8,
    },
    buttonText: {
        fontSize: 14,
        color: '#fff',
        textAlign: 'center',
    },
});

