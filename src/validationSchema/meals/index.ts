import * as yup from 'yup';

export const mealValidationSchema = yup.object().shape({
  name: yup.string().required(),
  calories: yup.number().integer().required(),
  water: yup.number().integer().required(),
  organization_id: yup.string().nullable(),
});
