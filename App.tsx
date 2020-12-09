import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import DropDown from './src/components/dropdown';

const axios = require('axios');
const BoredApi = 'http://www.boredapi.com/api/activity?type=';


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

    useEffect(() => {

        return () => {
            
        }
    })

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
