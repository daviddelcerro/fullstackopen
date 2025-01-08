import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'


describe('Blog tests', () => {
    let container
    const usera = {
        username: 'Test User',
        name: 'Test User',
        id: '1234'
      }
      const blog = {
        title: 'Test Blog',
        author: 'Test Author',
        url: 'https://testblog.com',
        likes: 0,
        user: usera
      }
    
      const mockHandler = vi.fn()
      const mockHandleLike = vi.fn()

      beforeEach(() => {
        container = render(<Blog 
          blog={blog} 
          user={usera}
          handleLike={mockHandleLike}
          removeBlog={mockHandler}
          />).container
      })

    
    test('renders title and author', () => {
        const div = container.querySelector('.blog')
        expect(div).toHaveTextContent('Test Blog')
        expect(div).toHaveTextContent('Test Author')
        expect(div).not.toHaveTextContent('https://testblog.com')
        expect(div).not.toHaveTextContent('likes 0')
    })

    test('clicking the button show url and likes', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)
    
        const newDiv = container.querySelector('.blog')
        expect(newDiv).toHaveTextContent('Test Blog')
        expect(newDiv).toHaveTextContent('Test Author')
        expect(newDiv).toHaveTextContent('https://testblog.com')
        expect(newDiv).toHaveTextContent('likes 0')
    })

    test('clicking the like button twice', async () => {
        const user = userEvent.setup()
        const buttonview = screen.getByText('view')
        await user.click(buttonview)
        const button = screen.getByText('like')
        await user.click(button)
        await user.click(button)
    
        const newDiv = container.querySelector('.blog')
        expect(newDiv).toHaveTextContent('Test Blog')
        expect(newDiv).toHaveTextContent('Test Author')
        expect(newDiv).toHaveTextContent('https://testblog.com')
        expect(newDiv).toHaveTextContent('likes 2')
    })
})
