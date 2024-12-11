import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
import {
  CreateTodoDto,
  DeleteTodoDto,
  UpdateTodoStatusDto,
  UpdateTodoTitleDto,
} from 'dto/todoDto';
import mongoose from 'mongoose';
import { TodoDocument } from 'schema/todo.schema';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get('/get/:userId')
  getTodoByUserId(
    @Param() params: { userId: mongoose.Schema.Types.ObjectId },
  ): Promise<TodoDocument[]> {
    return this.todoService.getTodoById(params);
  }

  @Post('/add')
  addTodo(@Body() requestData: CreateTodoDto): Promise<{ message: string }> {
    return this.todoService.addTodo(requestData);
  }

  @Post('/update-status')
  updateTodoStatus(
    @Body() requestData: UpdateTodoStatusDto,
  ): Promise<{ message: string }> {
    return this.todoService.updateTodoStatus(requestData);
  }

  @Post('/update-title')
  updateTodoTitle(
    @Body() requestData: UpdateTodoTitleDto,
  ): Promise<{ message: string }> {
    return this.todoService.updateTodoTitle(requestData);
  }

  @Post('/delete-todo')
  deleteTodo(@Body() requestData: DeleteTodoDto): Promise<{ message: string }> {
    return this.todoService.deleteTodo(requestData);
  }
}
