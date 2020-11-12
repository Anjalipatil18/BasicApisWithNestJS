import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [CoursesModule,
            MongooseModule.forRoot(
            process.env.MONGO_URL
           )
          ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
