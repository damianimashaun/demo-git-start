import { Picker } from '@react-native-picker/picker';
import React from 'react';
import ActivityTypes from '../activityTypes';

const DropDown = ({ value, updateValue }) => {

    return (
        <Picker
            selectedValue={value}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) => {
                updateValue(itemValue);
            }}
        >
            {ActivityTypes.map((activity) => (
                <Picker.Item label={activity} value={activity} />
            ))}

            <Picker.Item label="JavaScript" value="js" />
        </Picker>
    )
}

export default DropDown;
