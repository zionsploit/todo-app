import { axiosClient } from "@/provider/axiosClient"
import { User } from "@/server/schema/user.schema"
import { useMutation } from "@tanstack/react-query"
import { HttpStatusCode } from "axios"

export default () => {

    return useMutation({
        mutationKey: ['add-user'],
        mutationFn: async (requestData: User) => {
            try {
                const response = await axiosClient.post('/user/add', requestData)
                
                return response.data

            } catch (error) {
                throw new Error('Error: ' + error)
            }
        }
    })
}