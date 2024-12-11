import { axiosClient } from "@/provider/axiosClient"
import { queryClient } from "@/provider/queryClient"
import { UpdateTodoTitleDto } from "@/server/dto/todoDto"
import { useMutation } from "@tanstack/react-query"

export default () => {

    return useMutation({
        mutationKey: ['update-todo-title'],
        mutationFn: async (requestData: UpdateTodoTitleDto) => {
            try {
                const response = await axiosClient.post('/todo/update-title', requestData)

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