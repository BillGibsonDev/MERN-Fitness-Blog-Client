import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

export const fetchPosts = () => axios.get(`${baseURL}/read`);
export const fetchPost = (id) => axios.get(`${baseURL}/post/${id}`);
export const createPost = (newPost) => axios.post(`${baseURL}/insert`, newPost);
