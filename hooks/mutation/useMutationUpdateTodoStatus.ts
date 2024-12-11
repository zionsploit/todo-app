import { axiosClient } from "@/provider/axiosClient"
import { queryClient } from "@/provider/queryClient"
import { UpdateTodoStatusDto } from "@/server/dto/todoDto"
import { useMutation } from "@tanstack/react-query"

export default () => {

    return useMutation({
        mutationKey: ['update-todo-status'],
        mutationFn: async (requestData: UpdateTodoStatusDto) => {
            try {
                const response = await axiosClient.post('/todo/update-status', requestData)

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