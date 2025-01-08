import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'

describe('BlogForm tests', () => {
    test('new blog created', async () => {
        const blog = {
            title: 'Test Blog',
            author: 'Test Author',
            url: 'https://testblog.com'
        }
        
        const user = userEvent.setup()
        const onSubmit = vi.fn()
        render(<BlogForm onSubmit={onSubmit} handleTitleChange={() => {}} 
        handleUrlChange={() => {}} 
        handleAuthorChange={() => {}}
        title="" author="" url="" 
        handleLike={() => {}} removeBlog={() => {}}/>)
        const title = screen.getByPlaceholderText('title')
        const author = screen.getByPlaceholderText('author')
        const url = screen.getByPlaceholderText('url')

        await user.type(title, blog.title)
        await user.type(author, blog.author)
        await user.type(url, blog.url)

        const button = screen.getByText('create')
        await user.click(button)
        
        expect(onSubmit.mock.calls).toHaveLength(1)
        expect(onSubmit.mock.calls[0][0]).toEqual(blog)
    })
})