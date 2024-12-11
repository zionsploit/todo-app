import { ResponseUserDto } from "@/server/dto/userDto"
import { useMutation } from "@tanstack/react-query"
import AsyncStorage from '@react-native-async-storage/async-storage';


export default () => {

    return useMutation({
        mutationKey: ['save-login-info'],
        mutationFn: async (requestData: ResponseUserDto) => {
            try {
                const parseData = JSON.stringify(requestData)
                await AsyncStorage.setItem('account-info', parseData)
            } catch (error) {
                throw new Error('Error: ' + error)
            }
        }
    })
}