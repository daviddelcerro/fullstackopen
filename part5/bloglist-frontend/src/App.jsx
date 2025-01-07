import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState(null)

  const Notification = ({message}) => {
    if (message === null) {
      return null
    }
    return (
      <div className="notification">
        {message}
      </div>
    )
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('wrong credentials')
      setNotification('wrong credentials')
      setTimeout(() => {
        setNotification(null)
      },5000)
    }
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      const blogObject = {
        title: title,
        author: author,
        url: url,
      }
      await blogService.create(blogObject)
      setBlogs(blogs.concat(blogObject))
      setTitle('')
      setAuthor('')
      setUrl('')
      setNotification(`a new blog ${title} by ${author} added`)
      setTimeout(() => {
        setNotification(null)
      },5000)
    } catch (exception) {
      console.log('error creating new blog')
    }
}

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <div>
          <Notification message={notification} />
        </div>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password' 
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login-button' type="submit">login</button>
        </form>
      </div>
    )
  }
  else {
    return (
      <div>
        <h2>blogs</h2>
        <div>
          <Notification message={notification} />
        </div>
        <div>
          {user.name} logged in
          <button id='logout-button' onClick={handleLogout}>logout</button>
        </div>
        <div>
          <h2>create new blog</h2>
          <form onSubmit={handleNewBlog}>
            <div>
              title: <input id='title' onChange={({ target }) => setTitle(target.value)}/>
            </div>
            <div>
              author: <input id='author' onChange={({ target }) => setAuthor(target.value)}/>
            </div>
            <div> 
              url: <input id='url' onChange={({ target }) => setUrl(target.value)} />
            </div>
            <button id='create-button' type="submit">create</button>
          </form>
        </div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }


}

export default App