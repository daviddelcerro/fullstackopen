/* eslint-disable no-unused-vars */

import { useState } from "react";
import blogService from "../services/blogs";
import NotificationContext from "../context/NotificationContext";
import BlogContext from "../context/BlogContext";
import { useContext } from "react";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const [notification, notificationDispatch] = useContext(NotificationContext);
  const [blogs, blogsDispatch] = useContext(BlogContext);

  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const onAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const onUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const addBlog = async (event) => {
    event.preventDefault();
    const blog = {
      title: title,
      author: author,
      url: url,
    };
    const response = await blogService.create(blog);
    blogsDispatch({ type: "ADD_BLOG", payload: response });
    notificationDispatch({
      type: "SET_NOTIFICATION",
      payload: {
        message: `a new blog ${response.title} by ${response.author} added`,
        color: "green",
      },
    });
    setTimeout(() => {
      notificationDispatch({ type: "REMOVE_NOTIFICATION" });
    }, 5000);

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <div className="flex items-center justify-center mt-10">
        <h2 className="text-2xl font-bold mb-4 center">Create a new blog</h2>
      </div>
      <div>
        <form className="space-y-4" onSubmit={addBlog}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              title:
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              name="title"
              data-testid="title-input"
              placeholder="title"
              value={title}
              onChange={onTitleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              author:
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              name="author"
              data-testid="author-input"
              placeholder="author"
              value={author}
              onChange={onAuthorChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              url:
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              name="url"
              data-testid="url-input"
              placeholder="url"
              value={url}
              onChange={onUrlChange}
            />
          </div>
          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors"
            type="submit"
            data-testid="create-blog-button"
          >
            create
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
