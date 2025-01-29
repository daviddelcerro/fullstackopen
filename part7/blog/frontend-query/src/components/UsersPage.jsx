import { useEffect, useState } from "react";
import userService from "../services/users";
import { Link } from "react-router-dom";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    userService.getAll().then((users) => setUsers(users));
  }, []);

  return (
    <div className="flex  items-center justify-center">
      <table className="w-1/5 bg-white shadow-md rounded-xl ">
        <thead>
          <tr className="bg-blue-gray-100 text-gray-700">
            <th className="py-3 px-4 text-left">Users</th>
            <th className="py-3 px-4 text-left">Blogs created</th>
          </tr>
        </thead>
        <tbody className="text-blue-gray-900">
          {users.map((user) => (
            <tr
              className="border-b border-blue-gray-200 last:border-none"
              key={user.id}
            >
              <td className="py-3 px-4">
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td className="py-3 px-15 ">{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
