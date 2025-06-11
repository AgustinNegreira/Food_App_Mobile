import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import OrderElement from './OrderElement';

export default function OrderList({ order, onRemove }) {
  const subtotal = order.reduce((total, item) => total + item.price * item.quantity, 0);
  const envio = 45;
  const total = subtotal + envio;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tu carrito</Text>

      {order.length === 0 ? (
        <Text>No hay productos en el carrito.</Text>
      ) : (
        order.map((item) => <OrderElement key={item.id} food={item} onRemove={onRemove} />)
      )}

      <View style={styles.resumen}>
        <Text>Productos: ${subtotal.toFixed(2)}</Text>
        <Text>Envío: ${envio.toFixed(2)}</Text>
        <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  resumen: {
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingTop: 15,
  },
  total: {
    fontWeight: 'bold',
    marginTop: 10,
  },
});