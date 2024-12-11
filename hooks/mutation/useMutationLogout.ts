import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query"

export default () => {

    return useMutation({
        mutationKey: ['logout-todo'],
        mutationFn: async () => {
            try {
                await AsyncStorage.clear()
            } catch (error) {
                throw new Error('Error: ' + error);
            }
        }
    })
}