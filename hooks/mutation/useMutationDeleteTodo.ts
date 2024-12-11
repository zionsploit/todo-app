import { axiosClient } from "@/provider/axiosClient"
import { queryClient } from "@/provider/queryClient"
import { DeleteTodoDto } from "@/server/dto/todoDto"
import { useMutation } from "@tanstack/react-query"

export default () => {

    return useMutation({
        mutationKey: ['delete-todo'],
        mutationFn: async (requestData: DeleteTodoDto) => {
            try {
                const response = await axiosClient.post('/todo/delete-todo', requestData)

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