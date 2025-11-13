import * as Yup from 'yup';
import { boolean, string } from 'yup';
import { ERR } from './validationMsg';

export const addTaskSchema = Yup.object().shape({
  title: string()
    .required(ERR.name.required)
    .min(3, ERR.name.min)
    .max(50, ERR.name.max)
    .test(
      'no-whitespace',
      ERR.name.noSpace,
      value => !!value && value.trim().length > 0,
    ),

  description: string()
    .optional()
    .max(200, ERR.description.max)
    .min(3, ERR.description.min),

  completed: boolean().notRequired(),

  // date: date().required(ERR.date.required).typeError(ERR.date.type),
});
