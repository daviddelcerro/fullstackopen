const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    response.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 });
    if (blog) {
        response.json(blog.toJSON());
    } else {
        response.status(404).end();
    }
});

blogsRouter.post('/', async (request, response,next) => {
    if (!request.body.title || !request.body.url || !request.body.author) {
        return response.status(400).json({ error: 'title or url missing' });
    }
    if (!request.token) {
        return response.status(401).json({ error: 'token missing' });
    }
    
    const user = request.user

    const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes || 0,
        user: user.id
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);

    

});

blogsRouter.delete('/:id', async (request, response) => {
    
    const blog = await Blog.findById(request.params.id);
    if (blog.user.toString() !== request.user.id.toString()) {
        return response.status(401).json({ error: 'unauthorized user' });
    }else{
        await Blog.findByIdAndDelete(request.params.id);
        response.status(204).end();
    }
    
});

blogsRouter.put('/:id', async (request, response) => {
    const user = request.user;
    const blog = await Blog.findById(request.params.id);
    if (blog.user.toString() !== user.id.toString()) {
        return response.status(401).json({ error: 'unauthorized user' });
    }else{
        const blog = {
            likes: request.body.likes
        };
    
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
        response.json(updatedBlog);
    }
    

});

module.exports = blogsRouter;