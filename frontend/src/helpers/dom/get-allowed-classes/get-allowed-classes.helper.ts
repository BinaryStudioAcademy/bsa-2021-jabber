import clsx, { ClassValue } from 'clsx';

const getAllowedClasses = (...classes: ClassValue[]): string => {
  return clsx(classes);
};

export { getAllowedClasses };
