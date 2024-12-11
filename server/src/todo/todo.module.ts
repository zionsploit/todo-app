import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TodoSchema } from 'schema/todo.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: 'todo_list', schema: TodoSchema }],
      'TodoApp',
    ),
  ],
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodoModule {}
