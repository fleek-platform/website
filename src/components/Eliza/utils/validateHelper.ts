import { ZodError, ZodObject, type ZodRawShape } from 'zod';
import { formatZodError } from './transformData';

type ValidateZodArgs<T extends ZodRawShape> = {
  payload: any;
  schema: ZodObject<T>;
};

export const validateZod = <T extends ZodRawShape>({
  payload,
  schema,
}: ValidateZodArgs<T>) => {
  try {
    return Boolean(schema.parse(payload));
  } catch (e) {
    if (e instanceof ZodError) {
      return formatZodError(e);
    } else {
      console.warn(e);
      return false;
    }
  }
};
