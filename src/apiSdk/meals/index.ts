import axios from 'axios';
import queryString from 'query-string';
import { MealInterface, MealGetQueryInterface } from 'interfaces/meal';
import { GetQueryInterface } from '../../interfaces';

export const getMeals = async (query?: MealGetQueryInterface) => {
  const response = await axios.get(`/api/meals${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createMeal = async (meal: MealInterface) => {
  const response = await axios.post('/api/meals', meal);
  return response.data;
};

export const updateMealById = async (id: string, meal: MealInterface) => {
  const response = await axios.put(`/api/meals/${id}`, meal);
  return response.data;
};

export const getMealById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/meals/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteMealById = async (id: string) => {
  const response = await axios.delete(`/api/meals/${id}`);
  return response.data;
};
