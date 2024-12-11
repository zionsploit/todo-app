import { axiosClient } from "@/provider/axiosClient";
import { TodoDocument } from "@/server/schema/todo.schema";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import mongoose from "mongoose";

export default (params: {userId: mongoose.Schema.Types.ObjectId | undefined}) => {

    return useQuery({
        queryKey: ['todo-list'],
        queryFn: async () => {
            try {
                const response: AxiosResponse<TodoDocument[]> = await axiosClient.get(`/todo/get/${params.userId}`)

                return response.data
            } catch (error) {
                throw new Error('Error: ' + error)
            }
        }
    })
}