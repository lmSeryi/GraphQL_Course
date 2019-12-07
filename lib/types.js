'use strict'

const connectDB = require('./db')
const {ObjectID} = require('mongodb')

module.exports = {
    Course: {
        people: async ({ student }) => {
            let db
            let studentData
            let ids

            try{
                db = await connectDB()
                ids = student ? student.map(id => ObjectID(id)) : []
                studentData = ids.length > 0 
                ? await db.collection('students').find(
                        { _id: {$in : ids}} 
                    ).toArray()
                    : []
            }catch(e){
                console.error(e)
            }
            return studentData
        }
    }
}