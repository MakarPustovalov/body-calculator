import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';

export default function App() {

  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [BMI, setBMI] = useState(0);

  const calcBMI = (w, h) => {
    if (w <= 0 || h <= 0) return alert('Введите рост и вес')
    let result = w / Math.pow((h / 100), 2)
    result = result.toFixed(2)
    setBMI(result)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Рассчёт ИМТ</Text>
      <Text style={styles.text}>Ваш вес (кг)</Text>
      <TextInput style={styles.input} onChangeText={(value) => {setWeight(value)}}></TextInput>
      <Text style={styles.text}>Ваш рост (см)</Text>
      <TextInput style={styles.input} onChangeText={(value) => {setHeight(value)}}></TextInput>
      <TouchableOpacity style={styles.button} onPress={() => calcBMI(weight, height)}><Text style={styles.buttonText}>Рассчитать ИМТ</Text></TouchableOpacity>
      {BMI > 0 ? <Text style={styles.result}>Ваш BMI: {BMI}</Text> : false}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginBottom: 10
  },
  title: {
    fontSize: 36,
    marginBottom: 70
  },
  input: {
    paddingLeft: 10,
    width: 150,
    height: 40,
    marginBottom: 30,
    borderColor: '#333333',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 4
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 45,
    backgroundColor: '#048ff2',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "500"
  },
  result: {
    marginTop: 20,
    fontSize: 18
  }
});
