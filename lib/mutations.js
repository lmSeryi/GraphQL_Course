'use strict'

const connectDB = require('./db')
const {ObjectID} = require('mongodb')

module.exports = {
    createCourse: async (root, {input}) => {
        const defaults= {
            teacher: '',
            topic: ''
        }

        const newCourse = Object.assign(defaults, input)
        let db
        let course

        try {
            db = await connectDB()
            course = await db.collection('courses').insertOne(newCourse)
            newCourse._id = course.insertedId
        } catch (e) {
            console.error(e)
        }

        return newCourse
    },
    editCourse: async(root, { _id, input }) => {
        let course
        let db

        try{
            db = await connectDB()
            await db.collection('courses')
                .findOneAndUpdate(
                    { _id: ObjectID(_id) }, 
                    { $set: input },
                    { new: true, returnOriginal: false }
                )
            course = await db.collection('courses')
                .findOne(
                    { _id: ObjectID(_id) }
                ) 
        }catch(e){
            console.error(e)
        }
        return course
    },
    removeCourse: async(root, { _id }) =>{
        let db

        try{
            db = await connectDB()
            await db.collection('courses').deleteOne({_id: ObjectID(_id)})
        }catch(e){
            console.error(e)
        }
    },
    createStudent: async (root, {input}) => {
        let db
        let student

        try {
            db = await connectDB()
            student = await db.collection('students').insertOne(input)
            input._id = student.insertedId
        } catch (e) {
            console.error(e)
        }

        return input
    },
    editStudent: async(root, { _id, input }) => {
        let student
        let db

        try{
            db = await connectDB()
            await db.collection('students')
                .updateOne(
                    { _id: ObjectID(_id) }, 
                    { $set: input }
                )
            student = await db.collection('students')
                .findOne(
                    { _id: ObjectID(_id) }
                ) 
        }catch(e){
            console.error(e)
        }
        return student
    },
    removeStudent: async(root, { _id }) =>{
        let db

        try{
            db = await connectDB()
            await db.collection('students').deleteOne({_id: ObjectID(_id)})
        }catch(e){
            console.error(e)
        }
    },
    addStudent: async(root, { courseID, studentID }) =>{
        let db
        let student, course

        try{
            db = await connectDB()
            course = await db.collection('courses')
                .findOne({_id: ObjectID(courseID)})
            student = await db.collection('students')
                .findOne({_id:ObjectID(studentID)})
            
            if(!course || !student) throw new Error('El curso o el estudiante no existe')

            await db.collection('courses').updateOne(
                { _id:ObjectID(courseID) },
                { $addToSet: {student: ObjectID(studentID)} }
            )

        }catch(e){
            console.log(e)
        }
        return course
    }
}
