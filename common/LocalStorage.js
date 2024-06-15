// https://react-native-async-storage.github.io/async-storage/docs/usage/
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomConsole } from './utils';

export const saveSession = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
        CustomConsole("Key=>" + key + ":" + "Value=>" + value);
    } catch (e) {
        // saving error
    }
}

export const clearAsyncStorage = async () => {
    AsyncStorage.clear();
}

export const getSession = async (key) => {
    var value = "";
    try {
        value = await AsyncStorage.getItem(key)
        CustomConsole("Key=>" + key + ":" + "Value=>" + value);
    } catch (e) {
        // error reading value
        // CustomConsole("Error=>" + e);
    }
    return value;
}

// User Data
export const TOKEN = "token";
export const USER_ID = "user_id";
export const USER_NAME = "user_name";
export const EMAIL = "user_email";
export const PHONE = "user_phone";
export const AVATAR = "avatar";
export const ROLE = "role";
export const FCM_TOKEN = "fcm_token";
