import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert, Button, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';

export default function AddFood() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [img, setImg] = useState('');

    const handleSubmit = async () => {

        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/foods`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    description,
                    price: parseInt(price, 10),
                    stock: parseInt(stock, 10),
                    img
                }),
            });
            Alert.alert('Éxito', 'Comida creada correctamente');
            setName('');
            setDescription('');
            setPrice('');
            setStock('');
            setImg('');
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
                value={name}
                onChangeText={setName}
            />

            <Text style={styles.label}>Descripcion:</Text>
            <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
            />

            <Text style={styles.label}>Precio:</Text>
            <TextInput
                style={styles.input}
                value={price}
                onChangeText={setPrice}
            />

            <Text style={styles.label}>Stock:</Text>
            <TextInput
                style={styles.input}
                value={stock}
                onChangeText={setStock}
            />

            <Text style={styles.label}>Emoji:</Text>
            <TextInput
                style={styles.input}
                value={img}
                onChangeText={setImg}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Añadir Comida</Text>
            </TouchableOpacity>
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
    button: {
        backgroundColor: '#000',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
    }
});
