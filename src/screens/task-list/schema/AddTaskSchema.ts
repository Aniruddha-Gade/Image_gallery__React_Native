import * as Yup from 'yup';
import { boolean, date, string } from 'yup';
import { ERR } from './validationMsg';

export const addTaskSchema = Yup.object().shape({
  title: string().required(ERR.name.required).min(3, ERR.name.min),

  description: string()
    .optional()
    .max(200, ERR.description.max)
    .min(3, ERR.description.min),

  status: boolean().required(ERR.status.required),

  date: date().required(ERR.date.required).typeError(ERR.date.type),
});
