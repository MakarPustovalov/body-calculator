import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';

export default function App() {

  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [neck, setNeck] = useState(0);
  const [waist, setWaist] = useState(0);
  const [bodyParams, setBodyParams] = useState({});

  const calcBMI = (data) => {
    let {height, weight} = data
    if ((height && weight) == 0) return alert('Введите все параметры')

    let result = weight / Math.pow((height / 100), 2)
    result = result.toFixed(2)

    return result
  }

  const calcBFP = (data) => {
    let {height, neck, waist} = data
    if ((neck && waist && height) == 0) return alert('Введите все параметры')

    let result =	(495 / ((1.0324 - 0.19077 * Math.log10(waist - neck) ) + 0.15456 * Math.log10(height))) - 450
    result = result.toFixed(2)

    return result
  }

  const calcFFMI = (data) => {
    let {height, weight, BFP} = data
    if ((weight && height && BFP) == 0) return alert('Введите все параметры')

    let leanWeight = (weight * (1 - BFP / 100))
    let result = leanWeight / Math.pow((height / 100), 2)
    result = result.toFixed(2)

    return result
  }

  const calcBodyParams = (data) => {
    const BMI = calcBMI(data)
    const BFP = calcBFP(data)
    data.BFP = BFP
    const FFMI = calcFFMI(data)
    setBodyParams({BMI, BFP, FFMI})
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Рассчёт BMI/BF/FFMI</Text>

        <View style={styles.row}>

          <View>
            <Text style={styles.text}>Вес (кг)</Text>
            <TextInput style={styles.input} onChangeText={(value) => {setWeight(value)}}></TextInput>
          </View>

          <View>
            <Text style={styles.text}>Рост (см)</Text>
            <TextInput style={styles.input} onChangeText={(value) => {setHeight(value)}}></TextInput>
          </View>

        </View>

        <View style={styles.row}>

          <View>
            <Text style={styles.text}>Шея (см)</Text>
            <TextInput style={styles.input} onChangeText={(value) => {setNeck(value)}}></TextInput>
          </View>

          <View>
            <Text style={styles.text}>Талия (см)</Text>
            <TextInput style={styles.input} onChangeText={(value) => {setWaist(value)}}></TextInput>
          </View>

        </View>

        <TouchableOpacity style={styles.button} onPress={() => calcBodyParams({weight, height, neck, waist})}><Text style={styles.buttonText}>Рассчитать</Text></TouchableOpacity>
        {bodyParams.BMI > 0 ? <Text style={styles.result}>Ваш BMI: {bodyParams.BMI}</Text> : false}
        {bodyParams.BFP > 0 ? <Text style={styles.result}>Ваш ППЖ: {bodyParams.BFP}%</Text> : false}
        {bodyParams.FFMI > 0 ? <Text style={styles.result}>Ваш FFMI: {bodyParams.FFMI}</Text> : false}
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginBottom: 7
  },
  row: {
    width: 300,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 50
  },
  input: {
    paddingLeft: 10,
    width: 100,
    height: 40,
    marginBottom: 20,
    borderColor: '#333333',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 4
  },
  button: {
    marginTop: 8,
    marginBottom: 15,
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
    fontWeight: "700",
    marginTop: 15,
    fontSize: 18
  }
});
