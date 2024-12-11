import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema()
export class Todo {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop()
  todoTitle: string;

  @Prop()
  isComplete: boolean;
}

export type TodoDocument = HydratedDocument<Todo>;

export const TodoSchema = SchemaFactory.createForClass(Todo);
