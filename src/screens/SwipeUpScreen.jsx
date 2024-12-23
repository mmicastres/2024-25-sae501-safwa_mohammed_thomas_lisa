import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated, StatusBar } from 'react-native';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';

export default function SwipeScreen({ navigation }) {
    const translateY = useRef(new Animated.Value(0)).current; // Animation de déplacement vertical

    useEffect(() => {
        // Animation "up and down" (montée et descente) en boucle
        Animated.loop(
            Animated.sequence([
                Animated.timing(translateY, {
                    toValue: -30,  // Déplace le texte de -30 pixels
                    duration: 500, // Durée de l'animation
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: 0,  // Ramène le texte à sa position initiale
                    duration: 500, // Durée de l'animation
                    useNativeDriver: true,
                }),
            ])
        ).start(); // Démarre l'animation en boucle
    }, []);

    // Crée la logique pour détecter le swipe (simple swipe-up)
    const swipeGesture = Gesture.Pan()
        .onUpdate((event) => {
            translateY.setValue(event.translationY);
        })
        .onEnd((event) => {
            if (event.translationY < -100) {
                // Si le swipe est assez fort, on navigue
                navigation.navigate('Home');
            }
            // Réinitialisation de l'animation de translateY
            Animated.spring(translateY, {
                toValue: 0,
                useNativeDriver: true,
            }).start();
        });

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar barStyle="dark-content" />
            <GestureDetector gesture={swipeGesture}>
                <View style={styles.swipeArea}>
                    <Image
                        source={require('../../assets/logo.png')}
                        style={styles.image}
                    />
                    <Animated.View style={[styles.animation, { transform: [{ translateY }] }]}>
                        <Text style={styles.text}>Swipe up to begin</Text>
                    </Animated.View>
                </View>
            </GestureDetector>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    swipeArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 150,
        height: 150,
    },
    animation: {
        position: 'absolute',
        bottom: 50,
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
    },
});
