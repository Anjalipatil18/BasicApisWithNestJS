import { NotFoundException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';

import {Course} from './courses.model';

@Injectable()
export class CoursesService {

    private courses: Course[]=[];
    
    constructor(
        @InjectModel('Course') private readonly courseModel:Model<Course>
    ){}

    async insertCourse(title:string, desc:string, author:string, url:string):Promise<Course>{
        const newCourse = new this.courseModel({
            title,
            description:desc,
            author,
            url
        });
       const result =await newCourse.save();
       return result
    }

    async getCourses(){
        const courses = await this.courseModel.find().exec();
        return courses.map(course=>({
            id:course.id,
            title:course.title,
            description:course.description,
            author:course.author,
            url:course.url
        }));
    }

    async getSingleCourse(courseId:string){
        const course = await this.findCourse(courseId);
        return {
            id:course.id,
            title:course.title,
            description:course.description,
            author:course.author,
            url:course.url
        };
    }

    async updateCourse(
        courseId:string,
        title:string,
        description:string,
        author:string,
        url:string
    ){
        const updatedCourse=await this.findCourse(courseId);
        if(title){
            updatedCourse.title=title;
        }
        if(description){
            updatedCourse.description=description;
        }
        if(author){
            updatedCourse.author=author;
        }
        if(url){
            updatedCourse.url=url;
        }
        updatedCourse.save();
    }

    async deleteCourse(courseId:string){
       const result = await this.courseModel.deleteOne({id:courseId}).exec();
       if(result.n===0){
           throw new NotFoundException('Could not find course: ');
       }
    }
    
    private async findCourse(id:string):Promise<Course>{
        let course;
        try{
            course = await this.courseModel.findById(id);
        }catch(errror){
            throw new NotFoundException('Could not find course: ');
        }
        if(!course){
            throw new NotFoundException('Could not find course: ');
        }
        return course;
    }
}

