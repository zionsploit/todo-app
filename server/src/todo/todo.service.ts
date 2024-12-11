import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  CreateTodoDto,
  DeleteTodoDto,
  UpdateTodoStatusDto,
  UpdateTodoTitleDto,
} from 'dto/todoDto';
import mongoose, { Model } from 'mongoose';
import { Todo, TodoDocument } from 'schema/todo.schema';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel('todo_list', 'TodoApp') private todoModel: Model<Todo>,
  ) {}

  async getTodoById(requestParam: {
    userId: mongoose.Schema.Types.ObjectId;
  }): Promise<TodoDocument[]> {
    const requestData = await this.todoModel
      .find()
      .where('userId')
      .equals(requestParam.userId);

    return requestData;
  }

  async addTodo(requestData: CreateTodoDto): Promise<{ message: string }> {
    await new this.todoModel(requestData).save();

    return { message: 'New Todo Save' };
  }

  async updateTodoStatus(
    requestData: UpdateTodoStatusDto,
  ): Promise<{ message: string }> {
    await this.todoModel
      .updateOne({
        isComplete: requestData.isComplete,
      })
      .where('_id')
      .equals(requestData._id);

    return { message: 'Update Complete' };
  }

  async updateTodoTitle(
    requestData: UpdateTodoTitleDto,
  ): Promise<{ message: string }> {
    await this.todoModel
      .updateOne({
        todoTitle: requestData.todoTitle,
      })
      .where('_id')
      .equals(requestData._id);

    return { message: 'Update Complete' };
  }

  async deleteTodo(requestData: DeleteTodoDto): Promise<{ message: string }> {
    await this.todoModel.deleteOne({
      _id: requestData._id,
    });

    return { message: 'Delete Complete' };
  }
}
