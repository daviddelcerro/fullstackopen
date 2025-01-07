const BlogForm = ({ onSubmit, handleTitleChange, handleUrlChange, handleAuthorChange, title, author, url }) => {
    return (
        <div>
        <div>
            <h2>create a new blog</h2>
        </div>
        <div>
            <form onSubmit={onSubmit}>
            <div>
                title:
                <input name="title" value={title} onChange={handleTitleChange} />
            </div>
            <div>
                author:
                <input name="author" value={author} onChange={handleAuthorChange} />
            </div>
            <div>
                url:
                <input name="url" value={url} onChange={handleUrlChange} />
            </div>
            <button type="submit">create</button>
        </form>
        </div>
        </div>
    )
}

export default BlogForm