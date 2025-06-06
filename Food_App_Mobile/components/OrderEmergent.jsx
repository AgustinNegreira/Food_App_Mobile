import react from 'react';
import { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

export default function OrderEmergent({ totalOrders, totalPrice }) {

    const [showAlt, setShowAlt] = useState(true);

    const handleTocuh = () => {
        setShowAlt(!showAlt);
    }

    return (
        <View style={styles.container}>
            {showAlt === true ? (
                <>
                    <Text style={styles.label}>Cantidad de órdenes: {totalOrders}</Text>
                    <Text style={styles.label}>Precio total: {totalPrice.toFixed(2)}</Text>
                    <TouchableOpacity>
                        <Text>
                            hacer pedido
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleTocuh}>
                        <Text>
                            Ver carrito
                        </Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <TouchableOpacity onPress={handleTocuh}>
                        <Text>
                            volver
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text>
                            hacer pedido
                        </Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    )

};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        margin: 10,
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 4,
    },
    value: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#000',
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 10,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
    },
});