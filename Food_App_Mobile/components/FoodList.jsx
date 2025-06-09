import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { FoodElement } from './FoodElement';

export function FoodList({ foodElements, addFood }) {
    return (
        <View style={styles.container}>
            <FlatList
                data={foodElements}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <FoodElement product={item} addFood={addFood} />
                )}
            />
        </View>
    );
}

export const styles = StyleSheet.create({
    columnWrapper: {
        justifyContent: 'flex-start',
        paddingHorizontal: 16,
        columnGap: 16, // si tu versión de RN lo soporta, si no, usar margin en FoodElement
    },
    listContent: {
        paddingVertical: 20,
    },
});