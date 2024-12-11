import { axiosClient } from "@/provider/axiosClient"
import { queryClient } from "@/provider/queryClient"
import { CreateTodoDto } from "@/server/dto/todoDto"
import { useMutation } from "@tanstack/react-query"

export default () => {

    return useMutation({
        mutationKey: ['add-todo'],
        mutationFn: async (requestData: CreateTodoDto) => {
            try {
                const response = await axiosClient.post('/todo/add', requestData)

                return response.data
            } catch (error) {
                throw new Error('Error: ' + error)
            }
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['todo-list']
            })
        }
    })
}