/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import Blog from "./components/Blog";
import UsersPage from "./components/UsersPage";
import User from "./components/User";
import blogService from "./services/blogs";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import NotificationContext from "./context/NotificationContext";
import BlogContext from "./context/BlogContext";
import LoginContext from "./context/LoginContext";
import { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import "./App.css";

const App = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);
  const [blog, blogDispatch] = useContext(BlogContext);

  const [user, userDispatch] = useContext(LoginContext);

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => blogDispatch({ type: "SET_BLOGS", payload: blogs }));
  }, [blogDispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userDispatch({ type: "LOGIN", payload: user });
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    blogService.setToken(null);
    userDispatch({ type: "LOGOUT" });
  };

  const Menu = () => {
    const navigate = useNavigate();
    return (
      <header className="flex shadow-lg py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative z-50 rounded-xl border shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4 w-full">
          <div className="max-lg:hidden lg:!block max-lg:w-full max-lg:fixed max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50">
            <ul className="lg:flex lg:gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
              <li className="max-lg:border-b max-lg:py-3 px-3">
                <button
                  className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  onClick={() => navigate("/")}
                >
                  blogs
                </button>
              </li>
              <li className="max-lg:border-b max-lg:py-3 px-3">
                <button
                  className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  onClick={() => navigate("/users")}
                >
                  users
                </button>
              </li>
            </ul>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <a className="lg:absolute max-lg:left-10 lg:top-2/4 lg:left-2/4 lg:-translate-x-1/2 lg:-translate-y-1/2 max-sm:hidden">
              <img
                src="https://png.pngtree.com/png-vector/20230304/ourmid/pngtree-colorful-blog-speech-bubble-vector-png-image_6633021.png"
                alt="logo"
                className="w-20 h-20"
              />
            </a>
          </div>
          <div className="flex items-center ml-auto space-x-6">
            {user.name} logged in
            <button
              className="ml-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              data-testid="logout-button"
              onClick={handleLogout}
            >
              logout
            </button>
          </div>
        </div>
      </header>
    );
  };

  const BlogPage = () => {
    return (
      <div className="bg-white p-4 rounded-xl border shadow-md">
        <ul className="border border-gray-300 rounded overflow-hidden shadow-md mb-4">
          {blog.map((blog) => (
            <li
              className="px-4 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-300 transition-all duration-300 ease-in-out"
              key={blog.id}
            >
              -{" "}
              <Link
                className="hover:underline"
                key={blog.id}
                to={`/blogs/${blog.id}`}
              >
                {blog.title}
              </Link>
            </li>
          ))}
        </ul>
        <div>
          <Togglable buttonLabel="new blog">
            <BlogForm />
          </Togglable>
        </div>
      </div>
    );
  };

  if (user === null) {
    return (
      <div className="bg-no-repeat bg-cover bg-[url(https://codetheweb.blog/assets/img/posts/css-advanced-background-images/cover.jpg)] p-4 h-screen flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-xl border  shadow-md p-8 mx-auto">
          <h1 className="text-3xl font-bold mb-16 text-center ">Blog app</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            log in to application
          </h2>
          <div>
            <Notification message={notification} />
          </div>
          <Togglable buttonLabel="login">
            <LoginForm />
          </Togglable>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-no-repeat bg-cover bg-[url(https://codetheweb.blog/assets/img/posts/css-advanced-background-images/cover.jpg)] p-4 h-screen">
        <div>
          <Notification message={notification} />
        </div>
        <div>
          <Router>
            <Menu />
            <div className="text-3xl font-bold underline">
              <h2>blog app</h2>
            </div>
            <Routes>
              <Route path="/" element={<BlogPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/users/:id" element={<User />} />
              <Route path="/blogs/:id" element={<Blog />} />
            </Routes>
          </Router>
        </div>
      </div>
    );
  }
};

export default App;
