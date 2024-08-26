import React, { useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import Icon from 'react-native-vector-icons/Ionicons';

const LoginScreen = () => {
  const navigation = useNavigation(); // Initialize navigation using useNavigation hook

  useEffect(() => {
    // Customize the header when component mounts
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={styles.headerLeftContainer} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" style={styles.headerLeftIcon} />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: '#007bff', // Set the background color of the header
      },
      headerTintColor: '#fff', // Set the text color of the header
      headerTitle: '', // Hide the header title
    });
  }, [navigation]);

  const handleLogin = () => {
    // Perform login logic here, e.g., API call to validate credentials

    // After successful login, navigate to AddExpenseScreen
    navigation.navigate('AddExpense');
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
    <ImageBackground source={require('../assets/images/dfr.jpg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Username"
            style={styles.input}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry
          />
        </View>
        
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        
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
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  socialButton: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  socialIcon: {
    marginRight: 10,
  },
  socialButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  headerLeftContainer: {
    paddingHorizontal: 15,
  },
  headerLeftIcon: {
    fontSize: 24,
  },
});

export default LoginScreen;
