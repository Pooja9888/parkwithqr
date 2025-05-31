import AsyncStorage from '@react-native-async-storage/async-storage';

const asyncStorage = {
	setItem: (keyName, value) => {
		return new Promise(async(resolve, reject)=>{
            try {
                await AsyncStorage.setItem(keyName, value.toString());
                resolve(true)
            } catch (e) {
                reject(e);
            }
		})
	},
	getItem: (keyName) => {
		return new Promise(async(resolve, reject)=>{
            try {
            const value = await AsyncStorage.getItem(keyName);
            if (value !== null) {
                resolve(value);
            }
            } catch (e) {
                reject(e);
            }
		})
	}
}

export default asyncStorage;