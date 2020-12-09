import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, ActivityIndicator, StyleSheet, Text, View, Button } from 'react-native';
import DropDown from './src/components/dropdown';
import { ClearState, ReadState, SaveState } from './src/utility/dataStore';


const stateActive = 'active';
const changeListener = 'change';
const inactiveRegex = /inactive|background/;

export default function App() {
    const [isLoading, setLoading] = useState(false);
    const [previousActivity, setPreviousActivity] = useState('');
    const [selectedActivity, setActivity] = useState('');
    const [message, setMessage] = useState('Select Activity');
    const activityRef = React.useRef('');
    const messageRef = React.useRef('');

    useEffect(() => {
        activityRef.current = selectedActivity;
        messageRef.current = message
    }, [selectedActivity, message])

    const appState = useRef(AppState.currentState);

    const saveState = async () => {
        await SaveState({
            selectedActivity: activityRef.current,
            message: messageRef.current
        });
    }
    const handleStateChange = async (nextAppState) => {
        if (appState.current === stateActive
            && nextAppState.match(inactiveRegex)) {
            await ClearState();
            await saveState();
        }
    };

    const readState = () => {
        setLoading(true);

        ReadState().then((state) => {
            if (state !== null) {
                setPreviousActivity(state.selectedActivity);
                setMessage(state.message);
            }

            setLoading(false);
        }).catch((err) => {
            setLoading(false);
        })
    }

    useEffect(() => {
        AppState.addEventListener(changeListener, handleStateChange);

        readState();
        return () => {
            saveState();
        }
    }, []);

    return (
        <View style={styles.container}>
            <DropDown
                set={previousActivity}
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
                onPress={() => {
                    readState();
                }}
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
