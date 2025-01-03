const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (request, response) => {
    const { username, name, password, blogs } = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username :username,
        name : name || username,
        passwordHash : passwordHash,
        blogs: blogs || [],

    })
    try {
        const savedUser = await user.save()
        response.status(201).json(savedUser)
    } catch (exception) {
        response.status(400).json({ error: 'username must be unique' })
    }
});


usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
    response.json(users.map(user => user.toJSON()))
})

module.exports = usersRouter