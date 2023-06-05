import axios from 'axios';

const devENV = process.env.NODE_ENV !== 'production';

const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;

const API = axios.create({
  baseURL: `${devENV ? REACT_APP_DEV_API : REACT_APP_PROD_API}`,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer: ${
      JSON.parse(localStorage.getItem('profile')).token
    }`;
  }
  return req;
});

export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);
export const googleSignIn = (result) => API.post('/users/googleSignIn', result);

export const createTour = (tourData) => API.post('/tours', tourData);
export const getTours = (page) => API.get(`/tours?page=${page}`);
export const getTour = (id) => API.get(`/tours/${id}`);
export const getUserTours = (id) => API.get(`/tours/userTours/${id}`);
export const searchTours = (query) =>
  API.get(`/tours/searchTours?searchQuery=${query}`);
export const searchToursByTag = (tag) =>
  API.get(`/tours/searchToursByTag/${tag}`);
export const getRelatedToursByTags = (tags) =>
  API.get(`/tours/relatedToursByTags/${tags}`);

export const deleteTour = (id) => API.delete(`/tours/deleteTour/${id}`);
export const updateTour = (id, tourData) =>
  API.patch(`/tours/updateTour/${id}`, tourData);
export const likeTour = (id) => API.patch(`/tours/like/${id}`);
export const contact = (formData) => API.post(`/contact`, formData);
