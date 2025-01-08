import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'



const Blog = ({ blog, user, handleRemove, handleLike }) => {

  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikePre = () => {
    let newBlog = { ...blog, likes: likes + 1 }
    setLikes(newBlog.likes)

    handleLike(newBlog)

  }

  const handleRemovePre = () => {
    handleRemove(blog)
  }

  if (visible) {
    return (
      <div className="blog" style={blogStyle}>
        <div>
          {blog.title}
          <button onClick={() => setVisible(false)}>hide</button>
        </div>
        <div>
          {blog.author}
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          likes {likes}
          <button onClick={handleLikePre}>like</button>
        </div>
        <div>
          {user.name === blog.user.name &&  (
            <button onClick={handleRemovePre}>remove</button>
          )}

        </div>
      </div>
    )
  }else {
    return (
      <div className='blog' style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={() => setVisible(true)}>view</button>
      </div>
    )
  }

}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleRemove: PropTypes.func.isRequired
}

export default Blog