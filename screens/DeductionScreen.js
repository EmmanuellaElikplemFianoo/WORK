// DeductionScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const DeductionScreen = () => {
  const [deductionAmount, setDeductionAmount] = useState('');
  const route = useRoute();
  const { onAddDeduction } = route.params;

  const handleAddDeduction = () => {
    if (deductionAmount.trim() === '' || isNaN(deductionAmount) || parseFloat(deductionAmount) <= 0) {
      alert('Please enter a valid deduction amount.');
      return;
    }
    onAddDeduction(deductionAmount);
    setDeductionAmount('');
    // Optionally, navigate back to the previous screen
    // navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Deduction</Text>
      <TextInput
        placeholder="Deduction Amount"
        style={styles.input}
        keyboardType="numeric"
        value={deductionAmount}
        onChangeText={(text) => setDeductionAmount(text)}
      />
      <Button title="Add Deduction" onPress={handleAddDeduction} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
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
});

export default DeductionScreen;
