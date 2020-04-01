import React, { useState } from 'react';

const BlogContext = React.createContext();

export const BlogProvider = ({ children }) => {
  const [blogPosts, setBlogPosts] = useState([]);

  const addBlogPost = () => {
    setBlogPosts([...blogPosts, { title: `Blog Post #${blogPosts.length + 1}` }]);
  }

  return ( // if we pass an object in value, it wont render, will error out
    <BlogContext.Provider value={{ data: blogPosts, addBlogPost }}> 
      {children} 
    </BlogContext.Provider>
  );
};

export default BlogContext;

// Provider is within the BlogContext object
// Provider is whats going to accept some information, 
// and whatever information we provide it will make available to our child components