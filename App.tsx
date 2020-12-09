import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import {Picker} from '@react-native-picker/picker';
const axios = require('axios');
const BoredApi = 'http://www.boredapi.com/api/activity?type=';

const DropDown = ({ value, updateValue }) => {

    return (
            <Picker
            selectedValue={value}
            style={{height: 50, width: 100}}
            onValueChange={(itemValue, itemIndex) => {
                updateValue(itemValue);
            }}
            >
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
            </Picker>
    )
}



export default function App() {
    const [isLoading, setLoading] = useState(false);
    const [selectedActivity, setActivity] = useState('');
    const [message, setMessage] = useState('Select Activity');
    useEffect(() => {
        setLoading(true);
        if (selectedActivity !== '') {
            axios.get(`${BoredApi}${selectedActivity}`)
            .then((response) => {
                console.log(response);
                setLoading(false);
            })
            .catch((err) => {
                setMessage('Error fetching message');
                setLoading(false);
            });
        }
    }, [selectedActivity])


  return (
    <View style={styles.container}>

<DropDown value={selectedActivity} updateValue={setActivity} />
<View style={[styles.flexOne]}>
 {isLoading && <ActivityIndicator size={"large"} />}
 {!isLoading && (
     <Text>{message}</Text>
 )}
</View>
      <Text>Open up App.tsx to start working on your app!</Text>
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
  flexOne: {
      flex: 1
  }
});
