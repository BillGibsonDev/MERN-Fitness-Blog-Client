import axios from 'axios';

const baseURL = 'https://therealdealfit.herokuapp.com';

export const fetchPosts = () => axios.get(`${baseURL}/read`);
export const fetchPost = (id) => axios.get(`${baseURL}/post/${id}`);
export const createPost = (newPost) => axios.post(`${baseURL}/insert`, newPost);
