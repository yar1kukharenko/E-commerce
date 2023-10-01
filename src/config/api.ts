const DEV_API_URL = 'https://api.escuelajs.co/api/v1/';
const PROD_API_URL = 'https://api.escuelajs.co/api/v1/';

export const getApiUrl = (path: string, isDev = true) => `${isDev ? DEV_API_URL : PROD_API_URL}${path}`;
