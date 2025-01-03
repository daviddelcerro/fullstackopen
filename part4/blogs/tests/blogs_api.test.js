const { test, after, beforeEach, describe} = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    await Blog.insertMany(helper.initialBlogs)
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
            likes: 2
        }

        await api.post('/api/blogs')
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
            url: 'http://test4.com',
        }

        const response = await api.post('/api/blogs')
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
            .send(newBlog)
            .expect(400)
    })
})



describe('deleting a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api.delete(`/api/blogs/${blogToDelete.id}`)
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
            .send({ likes: 10 })
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()

        assert.strictEqual(blogsAtEnd[0].likes, 10)
    })
})

after(async () => {
    await mongoose.connection.close()
})