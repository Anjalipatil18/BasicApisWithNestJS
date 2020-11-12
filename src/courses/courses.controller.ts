import { Body, Controller, Delete, Get, Post, Param, Patch } from '@nestjs/common';
import {CoursesService} from './courses.service';

// handling request
@Controller('courses')    //Endpoint
export class CoursesController {
    constructor(private CoursesService:CoursesService){}

// For Adding the course from mongodb
    @Post()
    async addCourse(
        @Body('title') courseTitle:string,
        @Body('description') courseDesc:string, 
        @Body('author') courseAuthor:string,
        @Body('url') courseUrl:string,
    ){
        const generatedId = await this.CoursesService.insertCourse(
            courseTitle,
            courseDesc,
            courseAuthor,
            courseUrl
        );
        return {id:generatedId};
    }

// For Get all course from mongo
    @Get()
    async getAllCourses(){
        const courses = await this.CoursesService.getCourses();
        return courses;
    }

// For Get by id access data from mongo
    @Get(':id')
    getCourse(@Param('id') courseId:string){
        return this.CoursesService.getSingleCourse(courseId);
    }

// For update data by user choice from mongo
    @Patch(':id')
    async updateCourse(
        @Param('id') courseId:string,
        @Body('title') courseTitle:string,
        @Body('description') courseDesc:string,
        @Body('author') courseAuthor:string,
        @Body('url') courseUrl:string
    ){
        await this.CoursesService.updateCourse(courseId,courseTitle,courseDesc,courseAuthor,courseUrl)
        return null;    
    }

//For Delete the course By Id from mongo
    @Delete(':id')
    async removeCourse(
        @Param('_id') courseId:string
    ){
        await this.CoursesService.deleteCourse(courseId);
        return null;
    }
   
}


