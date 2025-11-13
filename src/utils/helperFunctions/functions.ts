import { InputObject } from '../../types/typs';
import { notNullUndefined } from '../Validations';

export const removeEmptyKeys = (obj: InputObject): InputObject =>
  Object.keys(obj).reduce((acc, key) => {
    const value = obj[key];
    if (notNullUndefined(value) && value !== '') {
      if (typeof value === 'string') {
        if (value.trim() !== '') {
          acc[key] = value.trim();
        }
      } else {
        acc[key] = value;
      }
    }
    return acc;
  }, {} as InputObject);
