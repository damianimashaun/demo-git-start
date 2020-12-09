import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, ActivityIndicator, StyleSheet, Text, View, Button } from 'react-native';
import DropDown from './src/components/dropdown';
import { ReadState, SaveState } from './src/utility/dataStore';


const stateActive = 'active';
const changeListener = 'change';
const inactiveRegex = /inactive|background/;

export default function App() {
    const [isLoading, setLoading] = useState(false);
    const [selectedActivity, setActivity] = useState('');
    const [message, setMessage] = useState('Select Activity');

    const appState = useRef(AppState.currentState);
    const handleStateChange = async (nextAppState) => {
        if (appState.current === stateActive
            && nextAppState.match(inactiveRegex)) {
            await SaveState({ selectedActivity, message });
        }
    };

    const readState = () => {
        ReadState().then((state) => {
            if (state !== null) {
                setActivity(state.selectedActivity);
                setMessage(state.message);
            }

            setLoading(false);
        }).catch((err) => {
            setLoading(false);
        })
    }

    useEffect(() => {
        setLoading(true);
        AppState.addEventListener(changeListener, handleStateChange);

        readState();
    }, []);

    return (
        <View style={styles.container}>
            <DropDown
                updateValue={setActivity}
                updateMessage={setMessage}
                setLoading={setLoading}
            />
            <View style={{ marginBottom: 10 }}>
                {isLoading && <ActivityIndicator size={"large"} color={"blue"} />}
                {!isLoading && (
                    <Text>{message}</Text>
                )}
            </View>
            <Button
                title={"refetch"}
                onPress={readState}
            />
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
