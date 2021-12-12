import axios from 'axios';

export const fetchPosts = () => axios.get(`http://localhost:5000/649783wqewqewqqqqqq4020/Posts`);
export const fetchPost = (postId) => axios.get(`${process.env.REACT_APP_GET_POST_URL}/${postId}`);
export const createPost = (newPost) => axios.post(`${process.env.REACT_APP_GET_POST_URL}`, newPost);
