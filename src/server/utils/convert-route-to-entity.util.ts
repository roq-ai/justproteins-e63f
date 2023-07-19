const mapping: Record<string, string> = {
  'favorite-meals': 'favorite_meal',
  meals: 'meal',
  organizations: 'organization',
  products: 'product',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
