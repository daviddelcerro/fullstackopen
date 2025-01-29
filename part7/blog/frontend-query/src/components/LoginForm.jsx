/* eslint-disable no-unused-vars */
import LoginContext from "../context/LoginContext";
import NotificationContext from "../context/NotificationContext";
import { useState, useContext } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";

const LoginForm = () => {
  const [user, loginDispatch] = useContext(LoginContext);
  const [notification, notificationDispatch] = useContext(NotificationContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = ({ target }) => {
    setUsername(target.value);
  };
  const handlePasswordChange = ({ target }) => {
    setPassword(target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);

    try {
      const user = await loginService.login({
        username,
        password,
      });
      loginDispatch({ type: "LOGIN", payload: user });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);
      console.log("wrong credentials");
      notificationDispatch({
        type: "SET_NOTIFICATION",
        payload: {
          message: "wrong credentials",
          color: "red",
        },
      });
      setTimeout(() => {
        notificationDispatch({ type: "REMOVE_NOTIFICATION" });
      }, 5000);
    }
  };

  return (
    <div>
      <form className="space-y-4" onSubmit={handleLogin}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            username
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            type="username"
            name="username"
            data-testid="username-input"
            placeholder="Your username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            password
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            name="password"
            data-testid="password-input"
            placeholder="********"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors"
          type="submit"
          data-testid="login-button"
        >
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
