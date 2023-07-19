import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getFavoriteMealById, updateFavoriteMealById } from 'apiSdk/favorite-meals';
import { Error } from 'components/error';
import { favoriteMealValidationSchema } from 'validationSchema/favorite-meals';
import { FavoriteMealInterface } from 'interfaces/favorite-meal';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { MealInterface } from 'interfaces/meal';
import { getUsers } from 'apiSdk/users';
import { getMeals } from 'apiSdk/meals';

function FavoriteMealEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<FavoriteMealInterface>(
    () => (id ? `/favorite-meals/${id}` : null),
    () => getFavoriteMealById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: FavoriteMealInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateFavoriteMealById(id, values);
      mutate(updated);
      resetForm();
      router.push('/favorite-meals');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<FavoriteMealInterface>({
    initialValues: data,
    validationSchema: favoriteMealValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Favorite Meal
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'user_id'}
              label={'Select User'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.email}
                </option>
              )}
            />
            <AsyncSelect<MealInterface>
              formik={formik}
              name={'meal_id'}
              label={'Select Meal'}
              placeholder={'Select Meal'}
              fetcher={getMeals}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'favorite_meal',
    operation: AccessOperationEnum.UPDATE,
  }),
)(FavoriteMealEditPage);
