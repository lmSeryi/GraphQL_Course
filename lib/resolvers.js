'use strict'

const connectDb = require('./db')
const {ObjectID} = require('mongodb')

module.exports = {
    Query: {
        getCourses: async () => {
            let db, courses = []
            try{
                db = await connectDb()
                courses = await db.collection('courses').find().toArray()
            }catch(e){
               console.error(e)
            }
            return courses
        
        },
        getCourse: async (root, {id}) => {
            let db, course
            try{
                db = await connectDb()
                course = await db.collection('courses').findOne({_id: ObjectID(id)})
            }catch(e){
               console.error(e)
            }
            return course
        }
    }
}


/* module.exports = {
    Query: {
        getCourses: () => courses,
        getCourse: (root, args) => {
            const course = courses.find(course => course._id===args.id)
            return course
        }
    },
    
  } */