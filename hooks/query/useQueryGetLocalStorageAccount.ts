import { ResponseUserDto } from "@/server/dto/userDto"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useQuery } from "@tanstack/react-query"

export default () => {

    return useQuery({
        queryKey: ['get-save-login'],
        queryFn: async (): Promise<ResponseUserDto | null> => {
            try {
                const getSaveLoginInfo = await AsyncStorage.getItem('account-info')

                if (getSaveLoginInfo !== null) {
                    const parseString = JSON.parse(getSaveLoginInfo) as ResponseUserDto
                    return parseString
                }

                return null
                
            } catch (error) {
                throw new Error('Error: ' + error)
            }
        }
    })
}