interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Meal Creator'],
  customerRoles: [],
  tenantRoles: ['Meal Creator', 'Calorie Tracker', 'Product Scanner'],
  tenantName: 'Organization',
  applicationName: 'JustProteins',
  addOns: ['notifications', 'file'],
};
