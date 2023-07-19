import * as yup from 'yup';

export const favoriteMealValidationSchema = yup.object().shape({
  user_id: yup.string().nullable(),
  meal_id: yup.string().nullable(),
});
