import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    JwtModule.register({
      secretOrPrivateKey: 'thisIsAnotherSecretPrivateKey',
    }),
    MongooseModule.forRoot(
      'mongodb+srv://vehiclerentalapp:vehiclerentalapp@cluster0.qao8v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
      {
        connectionName: 'TodoApp',
      },
    ),
    UserModule,
    AuthModule,
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
