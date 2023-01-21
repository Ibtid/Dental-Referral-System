import { IOption } from '../../interfaces/common';

export const reactSelectFilterConfig = {
  ignoreCase: true,
  ignoreAccents: true,
  stringify: (option: IOption) => `${option.label}`,
  matchFrom: 'any' as const,
  trim: true,
};
