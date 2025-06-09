import react from 'react';
import { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

export default function OrderEmergent({ totalOrders, totalPrice }) {

    const [showAlt, setShowAlt] = useState(true);

    const handleTocuh = () => {
        setShowAlt(!showAlt);
    }

    return (
        <View style={styles.wrapper}>
            {showAlt ? (
                <View style={styles.container}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoText}>{totalOrders} producto{totalOrders !== 1 ? 's' : ''}</Text>
                        <Text style={styles.infoText}>${totalPrice.toFixed(2)}</Text>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleTocuh}>
                        <Text style={styles.buttonText}>Ver carrito</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.container}>
                    <TouchableOpacity style={styles.button} onPress={handleTocuh}>
                        <Text style={styles.buttonText}>Volver</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.secondaryButton}>
                        <Text style={styles.secondaryButtonText}>Hacer pedido</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
    },
    infoContainer: {
        flexDirection: 'column',
    },
    infoText: {
        fontSize: 14,
        color: '#000',
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
    },
    secondaryButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 16,
        marginLeft: 10,
    },
    secondaryButtonText: {
        color: '#fff',
        fontSize: 14,
    },
});