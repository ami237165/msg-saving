import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from './schemas/msg.schema';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://127.0.0.1:27017/",{
      dbName: 'msgDB'
    }),
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
