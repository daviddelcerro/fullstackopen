const { test, after, beforeEach, describe} = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

const api = supertest(app)

let token = ''

beforeEach(async () => {
    await User.deleteMany({})

    await api.post('/api/users')
        .send({ username: 'test', name: 'Test User', password: 'test' })
        .expect(201)
        .expect('Content-Type', /application\/json/)

    await api.post('/api/login')
        .send({ username: 'test', name: 'Test User', password: 'test' })
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .then(response => {
            token = response.body.token
        })

    await Blog.deleteMany({})

    for (let blog of helper.initialBlogs) {
        await api.post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(blog)
            .expect(201)

        
    }
})

describe('when there is initially one user in db', () => {
    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: '123456789',
        }

        await api.post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()

        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)

        assert(usernames.includes(newUser.username))
    })
    test('creation fails with proper statuscode and message if username already taken', async () => {
        const userInDb = {
            username: 'root',
            name: 'Superuser',
            password: '123456789',
        }

        await api.post('/api/users')
            .send(userInDb)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: '123456789',
        }

        const result = await api.post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()

        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
})
})

describe('when there are initially some blogs saved', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('there are two blogs', async () => {
        const response = await api.get('/api/blogs')

        assert.strictEqual(response.body.length, 2)
    })

    test('returned blogs have an id property', async () => {
        const response = await api.get('/api/blogs')
        const keys = Object.keys(response.body[0])
        assert(keys.includes('id'))
    })
})
describe('adding a new blog', () => {
    test('a valid blog can be added', async () => {
        const newBlog = {
            title: 'Test 3',
            author: 'Test Author',
            url: 'http://test3.com',
            likes: 2,
        }

        await api.post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        const titles = response.body.map(blog => blog.title)

        assert(titles.includes('Test 3'))
        assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
    })

    test('if likes property is missing, it defaults to 0', async () => {
        const newBlog = {
            title: 'Test 4',
            author: 'Test Author 2',
            url: 'http://test4.com'
        }

        const response = await api.post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(response.body.likes, 0)
    })
    test('if title and url properties are missing, return 400', async () => {
        const newBlog = {
            author: 'Test Author 2',
            likes: 5
        }
    
        await api.post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(400)
    })
})



describe('deleting a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api.delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    })
})

describe('updating a blog', () => {    
    test('succeeds with status code 200 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        await api.put(`/api/blogs/${blogToUpdate.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ likes: 10 })
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()

        assert.strictEqual(blogsAtEnd[0].likes, 10)
    })
})



after(async () => {
    await mongoose.connection.close()
})