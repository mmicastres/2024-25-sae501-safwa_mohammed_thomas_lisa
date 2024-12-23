import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; // Pour la navigation

export default function AuthScreen() {
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({
        username: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigation = useNavigation();

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
        setForm({ username: '', password: '' });
        setErrorMessage('');
    };

    const handleSubmit = async () => {
        const apiUrl = isLogin
            ? 'https://test.nanodata.cloud/signin'
            : 'https://test.nanodata.cloud/register';

        try {
            const response = await axios.post(apiUrl, form);
            const { access_token, refresh_token } = response.data;
            if (access_token) {
                console.log('Access token received:', access_token); // Log token pour débogage
                await Preferences.set({ key: 'access_token', value: access_token });
                await Preferences.set({ key: 'refresh_token', value: refresh_token });
                navigation.replace('Home'); // Navigue vers la page d'accueil
            }
        } catch (error) {
            if (error.response && error.response.data) {
                console.log('Error during submission:', error); // Log complet de l'erreur pour débogage
                setErrorMessage(error.response.data.error || 'Une erreur inconnue s\'est produite');
                presentToast(error.response.data.error || 'Une erreur inconnue s\'est produite');
            } else if (error.response && error.response.status === 401) {
                setErrorMessage('Wrong Credentials');
                presentToast('Wrong Credentials');
            }
        }
    };

    const presentToast = (message) => {
        Alert.alert('Erreur', message, [{ text: 'OK' }]);
    };

    return (
        <View style={styles.authForm}>
            <Text style={styles.title}>{isLogin ? 'Login' : 'Register'}</Text>

            <View style={styles.formGroup}>
                <Text>Username</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your username"
                    value={form.username}
                    onChangeText={(text) => setForm({ ...form, username: text })}
                />
            </View>

            <View style={styles.formGroup}>
                <Text>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    secureTextEntry
                    value={form.password}
                    onChangeText={(text) => setForm({ ...form, password: text })}
                />
            </View>

            <Button title={isLogin ? 'Login' : 'Register'} onPress={handleSubmit} color="green" />

            <Text style={styles.switchModeText}>
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
                <Button title={isLogin ? 'Register' : 'Login'} onPress={toggleAuthMode} color="green" />
            </Text>

            {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    authForm: {
        padding: 20,
        maxWidth: 400,
        margin: 'auto',
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
    },
    formGroup: {
        marginBottom: 15,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
    switchModeText: {
        textAlign: 'center',
        marginTop: 20,
    },
    errorMessage: {
        color: 'red',
        textAlign: 'center',
        marginTop: 15,
    },
});
