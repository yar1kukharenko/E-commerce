const isDevelopment = process.env.NODE_ENV === 'development';

export const devLog = (...args: unknown[]): void => {
  if (isDevelopment) {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
};
