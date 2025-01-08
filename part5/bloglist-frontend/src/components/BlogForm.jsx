import PropTypes from 'prop-types'
import { useState } from 'react'


const BlogForm = ({ onSubmit }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const onTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const onAuthorChange = (event) => {
        setAuthor(event.target.value)
    }

    const onUrlChange = (event) => {
        setUrl(event.target.value)
    }
    
    const addBlog = async (event) => {
        event.preventDefault()
        const blog = {
            title: title,
            author: author,
            url: url
        }
        onSubmit(blog)
        setTitle('')
        setAuthor('')
        setUrl('')
    }
  
    return (
    <div>
      <div>
        <h2>create a new blog</h2>
      </div>
      <div>
        <form onSubmit={addBlog}>
          <div>
                title:
            <input name="title" placeholder="title" value={title} onChange={onTitleChange} />
          </div>
          <div>
                author:
            <input name="author" placeholder='author' value={author} onChange={onAuthorChange} />
          </div>
          <div>
                url:
            <input name="url" placeholder='url' value={url} onChange={onUrlChange} />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    </div>
  )
}

BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default BlogForm