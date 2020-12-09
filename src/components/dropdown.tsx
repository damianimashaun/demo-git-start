import { Picker } from '@react-native-picker/picker';
import React, { memo, useEffect, useState } from 'react';
import { View } from 'react-native';
import ActivityTypes from '../activityTypes';
import axios from 'axios';
const BoredApi = 'http://www.boredapi.com/api/activity?type=';

type myProps = {
    updateValue: Function;
    updateMessage:  Function,
    setLoading: Function
}

const dropDown = ({ updateValue, updateMessage, setLoading }: myProps) => {
    const [value, setValue] = useState('');

    useEffect(() => {
        setLoading(true);
        if (value !== '') {
            axios.get(`${BoredApi}${value}`)
                .then((response) => {
                    updateMessage(response.data.activity);
                    setLoading(false);
                })
                .catch((err) => {
                    updateMessage('Error fetching message');
                    setLoading(false);
                });
        }
    }, [value])

    return (
        <View style={{  width: '100%', alignItems: 'center', marginBottom: 10 }}>
            <Picker
                selectedValue={value}
                style={{ height: 50, width: '80%' }}
                onValueChange={(itemValue, itemIndex) => {
                    setValue(itemValue.toString());
                    updateValue(itemValue);
                }}
            >
                {ActivityTypes.map((activity, i) => (
                    <Picker.Item key={i} label={activity} value={activity} />
                ))}
            </Picker>
        </View>
    )
}

export default memo(dropDown);
