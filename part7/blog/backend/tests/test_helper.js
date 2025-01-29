const blog = require('../models/blog')
const Blog = require('../models/blog')
const User = require('../models/user')

const initialUsers = [
    {
        username: 'Test',  
        name: 'Test User',
        password: 'test',
    },
]
const initialBlogs = [
    {
        title: 'Test Blog 1',
        author: 'Test User',
        url: 'https://testblog1.com/',
        likes: 7
        
    },
    {
        title: 'Test Blog 2',
        author: 'Test User',
        url: 'https://testblog2.com/',
        likes: 5
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