export function notNullUndefined(value: any): boolean {
  return value !== null && value !== undefined;
}

export function isArrayLength(array: any): boolean {
  return isArray(array) && array.length > 0;
}

export function isArray(array: any): boolean {
  return notNullUndefined(array) && Array.isArray(array);
}

export function notEmpty(value: any): boolean {
  return (
    notNullUndefined(value) && typeof value === 'string' && value?.trim() !== ''
  );
}
