import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Modal, Alert } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import api from '../api'; // Import your axios instance


const AddExpenseScreen = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [initialMoney, setInitialMoney] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [totalDeduction, setTotalDeduction] = useState(0);
  const [deductionAmount, setDeductionAmount] = useState('');
  const [isAddExpenseModalVisible, setIsAddExpenseModalVisible] = useState(false);
  const [isExpenseDetailModalVisible, setIsExpenseDetailModalVisible] = useState(false);
  const [isChartVisible, setIsChartVisible] = useState(false);
  const [isInitialMoneySet, setIsInitialMoneySet] = useState(false);
  const [isEditingInitialMoney, setIsEditingInitialMoney] = useState(false);

  const handleAddExpense = useCallback(() => {
    if (!amount.trim() || !description.trim() || !isInitialMoneySet) {
      Alert.alert('Error', 'Please enter amount, description, and set initial money.');
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      Alert.alert('Error', 'Please enter a valid amount.');
      return;
    }

    const newExpense = { id: Math.random().toString(), amount: parsedAmount.toFixed(2), description };
    setExpenses(prevExpenses => [...prevExpenses, newExpense]);
    setAmount('');
    setDescription('');
    setIsAddExpenseModalVisible(false);
  }, [amount, description, isInitialMoneySet]);

  const handleDeleteExpense = useCallback(id => {
    setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
  }, []);

  const handleExpensePress = useCallback(expense => {
    setSelectedExpense(expense);
    setIsExpenseDetailModalVisible(true);
  }, []);

  const closeExpenseDetailModal = useCallback(() => {
    setSelectedExpense(null);
    setIsExpenseDetailModalVisible(false);
  }, []);

  const handleAddDeduction = useCallback(() => {
    const deduction = parseFloat(deductionAmount);
    if (isNaN(deduction) || deduction <= 0) {
      Alert.alert('Error', 'Please enter a valid deduction amount.');
      return;
    }
    setTotalDeduction(prevDeduction => prevDeduction + deduction);
    setDeductionAmount('');
  }, [deductionAmount]);

  const handleClearDeductions = useCallback(() => {
    setTotalDeduction(0);
  }, []);

  const handleClearInitialMoney = useCallback(() => {
    setInitialMoney('');
    setIsInitialMoneySet(false);
    setIsEditingInitialMoney(false); // Close the editing modal if open
  }, []);

  const finalMoney = isInitialMoneySet ? (parseFloat(initialMoney) - totalDeduction).toFixed(2) : '0.00';

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.expenseItem} 
      onPress={() => handleExpensePress(item)}
    >
      <Text style={styles.expenseAmount}>₵{item.amount}</Text>
      <Text style={styles.expenseDescription}>{item.description}</Text>
      <TouchableOpacity onPress={() => handleDeleteExpense(item.id)}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const chartData = expenses.map(expense => ({
    name: expense.description,
    amount: parseFloat(expense.amount),
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Random color
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  }));

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
    style: { borderRadius: 16 }
  };

  return (
    <View style={styles.container}>
      {!isInitialMoneySet ? (
        <View style={styles.form}>
          <TextInput
            placeholder="Initial Money"
            style={styles.input}
            keyboardType="numeric"
            value={initialMoney}
            onChangeText={setInitialMoney}
            onSubmitEditing={() => setIsInitialMoneySet(true)}
          />
          <View style={styles.initialMoneyButtonsContainer}>
            <Button 
              title="Set Initial Money" 
              onPress={() => setIsInitialMoneySet(true)}
            />
            <Button 
              title="Edit" 
              onPress={() => setIsEditingInitialMoney(true)}
            />
          </View>
        </View>
      ) : (
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Initial Money: ₵{parseFloat(initialMoney).toFixed(2)}</Text>
          <Button 
            title="Edit" 
            onPress={() => setIsEditingInitialMoney(true)}
          />
        </View>
      )}

      {isEditingInitialMoney && (
        <Modal
          visible={isEditingInitialMoney}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setIsEditingInitialMoney(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Edit Initial Money</Text>
              <TextInput
                placeholder="Initial Money"
                style={styles.input}
                keyboardType="numeric"
                value={initialMoney}
                onChangeText={setInitialMoney}
              />
              <View style={styles.buttonContainer}>
                <Button 
                  title="Save" 
                  onPress={() => {
                    setIsInitialMoneySet(true);
                    setIsEditingInitialMoney(false);
                  }}
                />
                <Button 
                  title="Cancel" 
                  onPress={() => setIsEditingInitialMoney(false)}
                />
                <Button 
                  title="Clear" 
                  onPress={handleClearInitialMoney}
                />
              </View>
            </View>
          </View>
        </Modal>
      )}

      <View style={styles.form}>
        <Button 
          title="Add Expense" 
          onPress={() => setIsAddExpenseModalVisible(true)}
        />
      </View>

      <View style={styles.expensesContainer}>
        <Text style={styles.expensesTitle}>Expenses List</Text>
        {expenses.length > 0 ? (
          <>
            <FlatList
              data={expenses}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              style={styles.expensesList}
            />
            <Button 
              title="Show Chart" 
              onPress={() => setIsChartVisible(true)}
              style={styles.chartButton}
            />
          </>
        ) : (
          <Text style={styles.noExpensesText}>No expenses added yet.</Text>
        )}
      </View>

      <View style={styles.summaryContainer}>
        <TextInput
          placeholder="Deduction Amount"
          style={styles.input}
          keyboardType="numeric"
          value={deductionAmount}
          onChangeText={setDeductionAmount}
        />
        <View style={styles.deductionButtonsContainer}>
          <Button 
            title="Add Deduction" 
            onPress={handleAddDeduction}
          />
          <Button 
            title="Clear Deductions" 
            onPress={handleClearDeductions}
          />
        </View>
        <Text style={styles.finalMoney}>Final Money: ₵{finalMoney}</Text>
      </View>

      <Modal
        visible={isAddExpenseModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsAddExpenseModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Expense</Text>
            <TextInput
              placeholder="Amount"
              style={styles.input}
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
            <TextInput
              placeholder="Description"
              style={[styles.input, styles.descriptionInput]}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
            />
            <View style={styles.buttonContainer}>
              <Button 
                title="Submit" 
                onPress={handleAddExpense}
              />
              <Button 
                title="Cancel" 
                onPress={() => setIsAddExpenseModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isExpenseDetailModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeExpenseDetailModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Expense Details</Text>
            <Text style={styles.modalAmount}>Amount: ₵{selectedExpense?.amount}</Text>
            <Text style={styles.modalDescription}>Description: {selectedExpense?.description}</Text>
            <Button 
              title="Close" 
              onPress={closeExpenseDetailModal}
            />
          </View>
        </View>
      </Modal>

      {isChartVisible && (
        <Modal
          visible={isChartVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setIsChartVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Expenses Chart</Text>
              <PieChart
                data={chartData}
                width={Dimensions.get('window').width - 40}
                height={220}
                chartConfig={chartConfig}
                accessor="amount"
                backgroundColor="transparent"
                paddingLeft="15"
                center={[10, 10]}
                absolute
              />
              <Button 
                title="Close" 
                onPress={() => setIsChartVisible(false)}
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  form: {
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
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  expensesContainer: {
    width: '100%',
    marginTop: 30,
  },
  expensesTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  expensesList: {
    width: '100%',
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  expenseAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
  },
  expenseDescription: {
    fontSize: 16,
    color: '#666',
    flex: 1,
    marginLeft: 10,
  },
  deleteButton: {
    fontSize: 16,
    color: 'red',
    marginLeft: 10,
  },
  noExpensesText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  summaryContainer: {
    width: '100%',
    padding: 20,
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  finalMoney: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
    marginTop: 10,
  },
  deductionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  initialMoneyButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 5,
  },
  modalDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  chartButton: {
    marginTop: 20,
  },
});

export default AddExpenseScreen;
