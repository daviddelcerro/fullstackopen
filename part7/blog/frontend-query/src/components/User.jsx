import userService from "../services/users";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.getAll().then((users) => setUsers(users));
  }, []);

  const id = useParams().id;
  const user = users.find((user) => user.id === id);
  if (!user) {
    return null;
  }
  return (
    <div className="space-y-4 bg-white p-4 mt-4 rounded-lg shadow-md border">
      <h2 className="text-2xl">User : {user.username}</h2>
      <h3 className="text-xl">Added blogs</h3>
      <ul className="border border-gray-300 rounded overflow-hidden shadow-md">
        {user.blogs.map((blog) => (
          <li
            className="px-4 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-300 transition-all duration-300 ease-in-out"
            key={blog.id}
          >
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
