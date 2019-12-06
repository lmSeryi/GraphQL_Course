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
        _id: 'anyid',
        title: 'My Title 2',
        teacher: 'My Teacher',
        description: 'A description',
        topic: 'programming'
    },
    {
        _id: 'anyid',
        title: 'My Title 3',
        teacher: 'My Teacher',
        description: 'A description',
        topic: 'programming'
    },
]

module.exports = {
    getCourses: () => courses
  }
  