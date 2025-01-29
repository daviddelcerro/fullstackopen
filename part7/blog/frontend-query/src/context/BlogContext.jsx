import { createContext, useReducer } from "react";

const blogReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_BLOGS":
      console.log(action.payload);
      return action.payload;
    case "ADD_BLOG":
      return [...state, action.payload];
    case "REMOVE_BLOG":
      return state.filter((blog) => blog.id !== action.payload.id);
    case "LIKE_BLOG":
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      );
    case "ADDCOMMENT_BLOG":
      return state.map((blog) =>
        blog.id === action.payload.id
          ? action.payload
          : { ...blog, comments: action.payload.comments }
      );
    default:
      return state;
  }
};

export const BlogContext = createContext();

export const BlogContextProvider = (props) => {
  const [blogs, blogDispatch] = useReducer(blogReducer, []);
  return (
    <BlogContext.Provider value={[blogs, blogDispatch]}>
      {props.children}
    </BlogContext.Provider>
  );
};

export default BlogContext;
