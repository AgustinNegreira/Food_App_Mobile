import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function OrderElement({ food, onRemove }) {

   return (
        <View style={styles.container}>
            <View style={styles.info}>
                <Text style={styles.name}>{food.name}</Text>
                <Text>Cantidad: {food.quantity} - Precio: ${food.price.toFixed(2)}</Text>
                <Text>Subtotal: ${(food.quantity * food.price).toFixed(2)}</Text>
            </View>

            <TouchableOpacity onPress={() => onRemove(food.id)}>
                <Ionicons name="close" size={24} color="red" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});