'use strict'
const courses = [
    {
        _id: 'anyid',
        title: 'My Title',
        teacher: 'My Teacher',
        description: 'A description',
        topic: 'programming'
    },
    {
        _id: 'anyid2',
        title: 'My Title 2',
        teacher: 'My Teacher',
        description: 'A description',
        topic: 'programming'
    },
    {
        _id: 'anyid3',
        title: 'My Title 3',
        teacher: 'My Teacher',
        description: 'A description',
        topic: 'programming'
    },
]

module.exports = {
    Query: {
        getCourses: () => courses,
        getCourse: (root, args) => {
            const course = courses.find(course => course._id===args.id)
            return course
        }
    },
    
  }
  