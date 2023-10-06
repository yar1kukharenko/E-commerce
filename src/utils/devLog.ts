const isDevelopment = process.env.NODE_ENV === 'development';

export const devLog = (...args: unknown[]): void => {
  if (isDevelopment) {
    devLog(...args);
  }
};
