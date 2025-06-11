import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function OrderElement({ food }) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{food.name}</Text>
      <Text>
        Cantidad: {food.quantity} - Precio: ${food.price.toFixed(2)}
      </Text>
      <Text>Subtotal: ${(food.quantity * food.price).toFixed(2)}</Text>
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