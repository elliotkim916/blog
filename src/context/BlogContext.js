import React, { useReducer } from 'react';
import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

const blogReducer = (state, action) => {
  console.log(state);
  switch(action.type) {
    case 'get_blogposts':
      return action.payload;
    case 'edit_blogpost':
      return state.map((blogPost) => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
      });
    case 'delete_blogpost':
      return state.filter((blogPost) => blogPost.id !== action.payload);
    // case 'add_blogpost':
    //   return [...state, { id: Math.floor(Math.random() * 99999), title: action.payload.title, content: action.payload.content }];
    default:
      return state;
  }
};

// these functions first need to be called in the Provider which passes dispatch in
const getBlogPosts = (dispatch) => {
  return async () => {
    const response = await jsonServer.get('/blogposts');
    dispatch({ type: 'get_blogposts', payload: response.data });
  };
};

const addBlogPost = (dispatch) => {
  return async (title, content, callback) => {
    await jsonServer.post('/blogposts', { title, content });
    // dispatch({ type: 'add_blogpost', payload: { title, content } });
    if (callback) {
      callback();
    }
  };
};

const deleteBlogPost = (dispatch) => {
  return async (id) => {
    await jsonServer.delete(`/blogposts/${id}`);
    dispatch({ type: 'delete_blogpost', payload: id });
  };
};

const editBlogPost = (dispatch) => {
  return async (id, title, content, callback) => {
    await jsonServer.put(`/blogposts/${id}`, {
      title, content
    });
    dispatch({ type: 'edit_blogpost', payload: { id, title, content }});
    if (callback) {
      callback();
    }
  };
};

// this createDataContext function made it a lot easier to set up different types of resources 
// if we ever want to have some other kind of resource in our app
// this function gives us back our Context object and our Provider
// Provider is used inside the App.js file
// Context object will be used inside of any component
export const { Context, Provider } = createDataContext(
  blogReducer, 
  { getBlogPosts, addBlogPost, deleteBlogPost, editBlogPost }, 
  []
);

// Provider is within the BlogContext object
// Provider is whats going to accept some information, 
// and whatever information we provide it will make available to our child components