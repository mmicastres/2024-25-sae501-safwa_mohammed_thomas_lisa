import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity } from 'react-native';

const inventoryItems = [
    { id: '1', name: 'Health Potion', quantity: 5 },
    { id: '2', name: 'Mana Potion', quantity: 3 },
    { id: '3', name: 'Sword', quantity: 1 },
    { id: '4', name: 'Shield', quantity: 1 },
];

export default function InventoryScreen({ navigation }) {
    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <View>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text>Quantity: {item.quantity}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => console.log(`Used ${item.name}`)}>
                <Text style={styles.buttonText}>Use</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Inventory</Text>
            <FlatList
                data={inventoryItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Back to Home</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    itemName: {
        fontSize: 18,
        fontWeight: '600',
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    backButton: {
        backgroundColor: '#28a745',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
        alignSelf: 'center',
    },
});
