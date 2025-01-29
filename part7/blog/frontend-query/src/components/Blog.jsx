/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useContext, useState } from "react";
import blogService from "../services/blogs";
import BlogContext from "../context/BlogContext";
import NotificationContext from "../context/NotificationContext";
import LoginContext from "../context/LoginContext";
import { Link, useParams } from "react-router-dom";

const Blog = () => {
  const id = useParams().id;
  const [comment, setComment] = useState("");

  const [blogs, blogDispatch] = useContext(BlogContext);
  const blog = blogs.find((blog) => blog.id === id);

  if (!blog) {
    return null;
  }

  const [comments, setComments] = useState(blog.comments);

  const [likes, setLikes] = useState(blog.likes);

  const [notification, notificationDispatch] = useContext(NotificationContext);
  const [user, userDispatch] = useContext(LoginContext);

  const handleLike = () => {
    let newBlog = { ...blog, likes: likes + 1 };
    setLikes(likes + 1);
    blogService.update(blog.id, newBlog);
    blogDispatch({ type: "UPDATE_BLOG", payload: newBlog });
  };

  const addComment = () => {
    blogService.comment(blog.id, comment);
    setComment("");
    blogDispatch({
      type: "ADDCOMMENT_BLOG",
      payload: { blog, comments: [...comments, comment] },
    });
    setComments([...comments, comment]);
  };

  let number = 1;

  const handleRemove = () => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      return;
    }
    blogService.remove(blog.id);
    blogDispatch({ type: "REMOVE_BLOG", payload: blog });
    notificationDispatch({
      type: "SET_NOTIFICATION",
      payload: {
        message: `blog ${blog.title} by ${blog.author} removed`,
        color: "green",
      },
    });
    setTimeout(() => {
      notificationDispatch({ type: "REMOVE_NOTIFICATION" });
    }, 5000);
  };

  console.log(blog);
  console.log(user);
  return (
    <div
      data-testid="blog"
      className="space-y-4 bg-white p-4 mt-4 rounded-lg shadow-md border"
    >
      <div>
        <h2 className="text-2xl font-mono"> {blog.title} </h2>
      </div>
      <div className="font-mono">
        More info at :
        <Link
          className="font-mono hover:underline text-sky-600 p-2"
          to={blog.url}
        >
          {blog.url}
        </Link>
      </div>
      <div className="font-mono">
        Likes : {likes}
        <button
          className="ml-2 font-mono bg-sky-600 text-white px-2 py-1 rounded-lg hover:bg-sky-700"
          data-testid="like-button"
          onClick={handleLike}
        >
          Like 💖
        </button>
        <div className="font-mono">Added by {blog.user.name}</div>
      </div>
      <div>
        {(user.id === blog.user.id || user.id === blog.user) && (
          <button
            className="font-mono border border-red-600 text-red-600 px-2 py-1 rounded-lg hover:bg-red-600 hover:text-white"
            data-testid="remove-button"
            onClick={handleRemove}
          >
            Remove
          </button>
        )}
      </div>
      <div>
        <input
          placeholder="comment"
          className="font-mono border border-gray-300 rounded-lg"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className="font-mono ml-2 bg-sky-600 text-white px-2 py-1 rounded-lg hover:bg-sky-700"
          onClick={addComment}
        >
          Add comment 💬
        </button>
      </div>
      <div>
        <h3 className="font-mono text-xl">Comments : </h3>
        {comments.map((comment) => (
          <div className="font-mono" key={comment}>
            {comment}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
