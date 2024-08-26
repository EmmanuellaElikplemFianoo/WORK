import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import Icon from 'react-native-vector-icons/Ionicons';

const SignupScreen = () => {
  const navigation = useNavigation(); // Initialize navigation using useNavigation hook

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    // Perform signup logic here, e.g., API call to create account

    // After successfully signing up, navigate to Login screen
    navigation.navigate('Login', { username, password });
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic
    console.log('Logging in with Google');
  };

  const handleAppleLogin = () => {
    // Handle Apple ID login logic
    console.log('Logging in with Apple ID');
  };

  return (
    <ImageBackground source={require('../assets/images/x.jpg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Username"
            style={styles.input}
            onChangeText={(text) => setUsername(text)}
            value={username}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>OR</Text>
        <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#db4437' }]} onPress={handleGoogleLogin}>
          <Icon name="logo-google" size={24} color="#fff" style={styles.socialIcon} />
          <Text style={[styles.socialButtonText, { color: '#fff' }]}>Login with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#000' }]} onPress={handleAppleLogin}>
          <Icon name="logo-apple" size={24} color="#fff" style={styles.socialIcon} />
          <Text style={[styles.socialButtonText, { color: '#fff' }]}>Login with Apple ID</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust opacity as needed
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  signupButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#28a745',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  orText: {
    color: '#fff',
    marginBottom: 10,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#db4437', // Default color, will be overridden
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  socialIcon: {
    marginRight: 10,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignupScreen;
