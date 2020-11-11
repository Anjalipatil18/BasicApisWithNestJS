import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import { CoursesController } from './courses.controller';
import { CourseSchema } from './courses.model';
import { CoursesService } from './courses.service';

@Module({
  imports:[
    MongooseModule.forFeature([{name:'Course',schema:CourseSchema}])
  ],
  controllers: [CoursesController],
  providers: [CoursesService]
})
export class CoursesModule {}
