/* eslint-disable @typescript-eslint/no-empty-object-type */
import mongoose from 'mongoose';
import { TodoDocument } from 'schema/todo.schema';

export class CreateTodoDto {
  readonly userId: mongoose.Schema.Types.ObjectId;
  readonly todoTitle: string;
  readonly isComplete: boolean;
}

export interface UpdateTodoStatusDto
  extends Pick<TodoDocument, '_id' | 'isComplete'> {}

export interface UpdateTodoTitleDto
  extends Pick<TodoDocument, '_id' | 'todoTitle'> {}

export interface DeleteTodoDto extends Pick<TodoDocument, '_id'> {}
