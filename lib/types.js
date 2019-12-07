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
    },
    Person: {
        __resolveType: (person, context, info) =>{
            if(person.phone) {
                return 'Monitor'
            }
            return 'Student'
        }
    },
    GlobalSearch: {
        __resolveType: (item, context, info) =>{
            if(item.title){
                return 'Course'
            }
            if(item.phone){
                return 'Monitor'
            }
            return 'Student'
        }
    }
}