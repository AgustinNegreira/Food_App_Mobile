import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function AddFood() {
  const [nombre, setNombre] = useState('');
      const [descripcion, setDescripcion] = useState('');
      const [precio, setPrecio] = useState('');
      const [cantidad, setCantidad] = useState('');
      const [emoji, setEmoji] = useState('');
  
      const handleSubmit = async () => {
          try {
              const response = await fetch('http://localhost:3000/usuarios', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      nombre,
                      descripcion,
                      precio,
                      cantidad,
                      emoji
                  }),
              });
              Alert.alert('Éxito', 'Comida creada correctamente');
              setNombre('');
              setDescripcion('');
              setPrecio('');
              setCantidad('');
              setEmoji('');
          } catch (error) {
              Alert.alert('Error', 'No se pudo crear la comida');
              console.error(error);
          }
      };
  
      return (
          <View style={styles.container}>
              <Text style={styles.label}>Agregar una comida:</Text>
              <Text style={styles.label}>Nombre:</Text>
              <TextInput
                  style={styles.input}
                  value={nombre}
                  onChangeText={setNombre}
              />
  
              <Text style={styles.label}>Descripcion:</Text>
              <TextInput
                  style={styles.input}
                  value={descripcion}
                  onChangeText={setDescripcion}
              />
  
              <Text style={styles.label}>Precio:</Text>
              <TextInput
                  style={styles.input}
                  value={precio}
                  onChangeText={setPrecio}
              />
  
              <Text style={styles.label}>Cantidad:</Text>
              <TextInput
                  style={styles.input}
                  value={cantidad}
                  onChangeText={setCantidad}
              />

              <Text style={styles.label}>Emoji:</Text>
              <TextInput
                  style={styles.input}
                  value={emoji}
                  onChangeText={setEmoji}
              />
  
              <Button title="Crear" onPress={handleSubmit} />
          </View>
      );
  }
  
  const styles = StyleSheet.create({
      container: { padding: 20 },
      label: { fontWeight: 'bold', marginTop: 10 },
      input: {
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginTop: 5,
          marginBottom: 10,
          borderRadius: 5,
      },
  });
  