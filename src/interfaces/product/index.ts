import { MealInterface } from 'interfaces/meal';
import { GetQueryInterface } from 'interfaces';

export interface ProductInterface {
  id?: string;
  name: string;
  barcode: string;
  calories: number;
  meal_id?: string;
  created_at?: any;
  updated_at?: any;

  meal?: MealInterface;
  _count?: {};
}

export interface ProductGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  barcode?: string;
  meal_id?: string;
}
