import * as yup from 'yup';

export const productValidationSchema = yup.object().shape({
  name: yup.string().required(),
  barcode: yup.string().required(),
  calories: yup.number().integer().required(),
  meal_id: yup.string().nullable(),
});
