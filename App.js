import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import AddExpenseScreen from './screens/AddExpenseScreen';
import DeductionScreen from './screens/DeductionScreen'; // Import DeductionScreen
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

// Common header options for screens
const headerOptions = (navigation, title = '', showBackButton = true) => ({
  title: title,
  headerShown: true,
  headerLeft: showBackButton ? () => (
    <Icon.Button
      name="arrow-back"
      size={24}
      color="#007bff"
      backgroundColor="transparent"
      onPress={() => navigation.goBack()}
    />
  ) : null,
  headerStyle: { backgroundColor: '#ffffff' },
  headerTintColor: '#007bff',
});

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Home Screen */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={() => headerOptions(null, '', false)} // Home screen does not need a back button
        />
        {/* Login Screen */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={({ navigation }) => headerOptions(navigation, 'Login')}
        />
        {/* Signup Screen */}
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={({ navigation }) => headerOptions(navigation)}
        />
        {/* Add Expense Screen */}
        <Stack.Screen
          name="AddExpense"
          component={AddExpenseScreen}
          options={({ navigation }) => headerOptions(navigation, '', true)} // Hide title but show back button
        />
        {/* Deduction Screen */}
        <Stack.Screen
          name="Deduction"
          component={DeductionScreen}
          options={({ navigation }) => headerOptions(navigation, 'Add Deduction')}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
