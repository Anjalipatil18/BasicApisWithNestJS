import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [CoursesModule,
            MongooseModule.forRoot(
            'mongodb+srv://testDemo:test1@cluster0.mmvv8.mongodb.net/nestjs-demo?retryWrites=true&w=majority'
           )
          ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
