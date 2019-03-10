import wretch from 'wretch';

import { BASE_URL } from '../constants';

export const customersApi = wretch(`${BASE_URL}/customers`);
export const productApi = wretch(`${BASE_URL}/products`);
export const baseApi = wretch(BASE_URL);
