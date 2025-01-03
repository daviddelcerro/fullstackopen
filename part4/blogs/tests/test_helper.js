const blog = require('../models/blog')
const Blog = require('../models/blog')
const User = require('../models/user')

const initialUsers = [
    {
        username: 'Arto',  
        name: 'Arto Hellas',
        password: 'hellas',
    },
]
const initialBlogs = [
    {
        title: 'Test Blog 1',
        author: 'Arto Hellas',
        url: 'https://testblog1.com/',
        likes: 7,
        user:'6778694509e2187096318c8e'
        
    },
    {
        title: 'Test Blog 2',
        author: 'Arto Hellas',
        url: 'https://testblog2.com/',
        likes: 5,
        user:'6778694509e2187096318c8e'
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon', author: 'John2 Doe', url: 'https://testblog3.com/', likes: 12 })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}
const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs,
    initialUsers,
    nonExistingId,
    blogsInDb,
    usersInDb
}