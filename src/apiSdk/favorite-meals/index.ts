import axios from 'axios';
import queryString from 'query-string';
import { FavoriteMealInterface, FavoriteMealGetQueryInterface } from 'interfaces/favorite-meal';
import { GetQueryInterface } from '../../interfaces';

export const getFavoriteMeals = async (query?: FavoriteMealGetQueryInterface) => {
  const response = await axios.get(`/api/favorite-meals${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createFavoriteMeal = async (favoriteMeal: FavoriteMealInterface) => {
  const response = await axios.post('/api/favorite-meals', favoriteMeal);
  return response.data;
};

export const updateFavoriteMealById = async (id: string, favoriteMeal: FavoriteMealInterface) => {
  const response = await axios.put(`/api/favorite-meals/${id}`, favoriteMeal);
  return response.data;
};

export const getFavoriteMealById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/favorite-meals/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFavoriteMealById = async (id: string) => {
  const response = await axios.delete(`/api/favorite-meals/${id}`);
  return response.data;
};
