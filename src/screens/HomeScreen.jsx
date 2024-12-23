import React, { useState } from 'react';
import { StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import Icon from 'react-native-vector-icons/FontAwesome';  // Icônes FontAwesome
import { WebView } from 'react-native-webview';

export default function Home({ navigation }) {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [showAR, setShowAR] = useState(false);

  if (!permission) {
    return <View />; // Attente de la permission
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Nous avons besoin que vous activiez votre caméra pour accéder à l'application.</Text>
        <Button onPress={requestPermission} title="Activer la caméra" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));  // Inverser la caméra
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={[styles.iconButton, styles.TopLeft]} onPress={() => navigation.navigate("Leaderboard")}>
            <Icon name="trophy" size={30} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.iconButton, styles.TopRight]} onPress={() => navigation.navigate("Profil")}>
            <Icon name="gear" size={30} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.iconButton, styles.BottomLeft]} onPress={toggleCameraFacing}>
            <Icon name="retweet" size={30} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.iconButton, styles.BottomRight]} onPress={() => navigation.navigate("Shop")}>
            <Icon name="shopping-cart" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </CameraView>

      {showAR && (
        <WebView
          originWhitelist={['*']}
          source={require('../../assets/aframe-ar.html')}  // Le fichier HTML dans assets
          style={styles.webview}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  iconContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
  },
  iconButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 50,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TopLeft: {
    position: 'absolute',
    top: 50,
    left: 30,
  },
  TopRight: {
    position: 'absolute',
    top: 50,
    right: 30,
  },
  BottomLeft: {
    position: 'absolute',
    bottom: 30,
    left: 30,
  },
  BottomRight: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  webview: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1, // S'assurer qu'il est au-dessus de la caméra
  },
});
