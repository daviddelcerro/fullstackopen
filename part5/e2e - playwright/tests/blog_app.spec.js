const { test, expect, describe, beforeEach } = require('@playwright/test');

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
            data: {
                username: 'root',
                name: 'Superuser',
                password: '123456789'
            }
        })

        await page.goto('http://localhost:5173/')
    })
    test('Login form is shown ', async ({ page }) => {
        await page.goto('http://localhost:5173/')
        await page.getByTestId('toggle-button').click()

        await expect(page.getByTestId('username-input')).toBeVisible()
        await expect(page.getByTestId('password-input')).toBeVisible()
    })
    test('User can login', async ({ page }) => {
        await page.goto('http://localhost:5173/')
        await page.getByTestId('toggle-button').click()

        await page.getByTestId('username-input').fill('root')
        await page.getByTestId('password-input').fill('123456789')
        await page.getByTestId('login-button').click()


       
        
    })
    test('Failed log in', async ({ page }) => {
        await page.goto('http://localhost:5173/')
        await page.getByTestId('toggle-button').click()

        await page.getByTestId('username-input').fill('root')
        await page.getByTestId('password-input').fill('12345678')
        await page.getByTestId('login-button').click()
        await expect(page.getByTestId('notification')).toHaveText('wrong credentials')
    })

})

describe('When logged in', () => {
        beforeEach(async ({ page, request }) => {
            console.log('beforeEach')
            await request.post('http://localhost:3003/api/testing/reset')
            await request.post('http://localhost:3003/api/users', {
                data: {
                    username: 'root',
                    name: 'Superuser',
                    password: '123456789'
                }
            })
            await request.post('http://localhost:3003/api/users', {
                data: {
                    username: 'normaluser',
                    name: 'normaluser',
                    password: '123456'
                }
            })
            await page.goto('http://localhost:5173/')
            await page.getByTestId('toggle-button').click()
            await page.getByTestId('username-input').fill('root')
            await page.getByTestId('password-input').fill('123456789')
            await page.getByTestId('login-button').click()
            console.log('afterEach')
        })
        test('A blog can be created', async ({ page }) => {
            await page.getByTestId('toggle-button').click()
            await page.getByTestId('title-input').fill('Test blog')
            await page.getByTestId('author-input').fill('Test author')
            await page.getByTestId('url-input').fill('www.test.com')
            await page.getByTestId('create-blog-button').click()
            
            await expect(page.getByTestId('notification')).toHaveText('a new blog Test blog by Test author added')
        })
        test('A blog can be liked', async ({ page }) => {
            await page.getByTestId('toggle-button').click()
            await page.getByTestId('title-input').fill('Test blog')
            await page.getByTestId('author-input').fill('Test author')
            await page.getByTestId('url-input').fill('www.test.com')
            await page.getByTestId('create-blog-button').click()

            await expect(page.getByTestId('notification')).toHaveText('a new blog Test blog by Test author added')
            await page.getByTestId('view-button').click()
            await page.getByTestId('like-button').click()
            await expect(page.getByText('likes 1')).toBeVisible()
            
        })

        test('A blog can be removed', async ({ page }) => {
            await page.getByTestId('toggle-button').click()
            await page.getByTestId('title-input').fill('Test blog')
            await page.getByTestId('author-input').fill('Test author')
            await page.getByTestId('url-input').fill('www.test.com')
            await page.getByTestId('create-blog-button').click()


            await expect(page.getByTestId('notification')).toHaveText('a new blog Test blog by Test author added')
            await expect(page.getByText('Test Blog Test Author')).toBeVisible()
            page.on('dialog', dialog => dialog.accept())
            await page.getByTestId('view-button').click()
            await page.getByTestId('remove-button').click()
            await page.waitForTimeout(5000)
            await expect(page.getByText('Test Blog')).not.toBeVisible()
        })

        test('Only the creator can remove a blog', async ({ page }) => {
            //Blog created by root
            await page.getByTestId('toggle-button').click()
            await page.getByTestId('title-input').fill('Test blog')
            await page.getByTestId('author-input').fill('Test author')
            await page.getByTestId('url-input').fill('www.test.com')
            await page.getByTestId('create-blog-button').click()
            await expect(page.getByText('Test Blog Test Author')).toBeVisible()
            //Logout and login as user
            await page.getByTestId('logout-button').click()
            await page.getByTestId('toggle-button').click()
            await page.getByTestId('username-input').fill('normaluser')
            await page.getByTestId('password-input').fill('123456')
            await page.getByTestId('login-button').click()
            //See the blog
            await page.waitForTimeout(5000)
            await page.getByTestId('view-button').click()
            await expect(page.getByTestId('remove-button')).not.toBeVisible()

        })
})

