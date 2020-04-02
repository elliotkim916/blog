import React, { useReducer } from 'react';
import createDataContext from './createDataContext';

const blogReducer = (state, action) => {
  switch(action.type) {
    case 'add_blogpost':
      return [...state, { title: `Blog Post #${state.length + 1}` }];
    default:
      return state;
  }
};

const addBlogPost = (dispatch) => {
  return () => {
    dispatch({type: 'add_blogpost'});
  };
};

export const { Context, Provider } = createDataContext(blogReducer, { addBlogPost }, []);

// Provider is within the BlogContext object
// Provider is whats going to accept some information, 
// and whatever information we provide it will make available to our child components