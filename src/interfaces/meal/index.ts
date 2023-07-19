import { FavoriteMealInterface } from 'interfaces/favorite-meal';
import { ProductInterface } from 'interfaces/product';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface MealInterface {
  id?: string;
  name: string;
  calories: number;
  water: number;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  favorite_meal?: FavoriteMealInterface[];
  product?: ProductInterface[];
  organization?: OrganizationInterface;
  _count?: {
    favorite_meal?: number;
    product?: number;
  };
}

export interface MealGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  organization_id?: string;
}
