import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const CourseSchema = new mongoose.Schema({
    title:{type:String, required:true},
    description:{type:String, required:true},
    author:{type:String, required:true},
    url:{type:String, required:true}
})

export interface Course extends Document {
      id:string;
      title:string;
      description:string;
      author:string;
      url:string;
}