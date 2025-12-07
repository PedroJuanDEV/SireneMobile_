// Configura a URL base da API para uso no app (Expo Go usa o IP do host)
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.8:3000/api';

export default API_BASE_URL;
