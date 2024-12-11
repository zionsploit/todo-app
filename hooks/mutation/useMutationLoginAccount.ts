import { axiosClient } from "@/provider/axiosClient"
import { LoginInfo, ResponseUserDto } from "@/server/dto/userDto"
import { useMutation } from "@tanstack/react-query"
import { AxiosResponse, HttpStatusCode } from "axios"

export default () => {

    return useMutation({
        mutationKey: ['login'],
        mutationFn: async (loginRequest: LoginInfo) => {
            try {
                const response: AxiosResponse<ResponseUserDto> = await axiosClient.post('/auth/login', loginRequest)

                return response.data
            } catch (error) {
                throw new Error('Error: ' + error)
            }
        }
    })
}