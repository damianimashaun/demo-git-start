import AsyncStorage from '@react-native-async-storage/async-storage';

const stateSaveKey = 'my-state-key';

async function SaveState(state: any) {
    try {
        const jsonValue = JSON.stringify(state);
        await AsyncStorage.setItem(stateSaveKey, jsonValue);
    } catch (e) {
        // saving error
    }
}

async function ReadState() {
    try {
        const jsonValue = await AsyncStorage.getItem(stateSaveKey);
        return jsonValue != null
            ? JSON.parse(jsonValue)
            : null;
    } catch (e) {
        return null;
    }
}

async function ClearState() {
    try {
        await AsyncStorage.removeItem(stateSaveKey);
    } catch (e) {
        return null;
    }
}

export { SaveState, ReadState, ClearState };
