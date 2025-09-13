import axios from 'axios';

export const ApiKey = '1570b5f511b7f56e72eda7c4e15aee85';

export const posterImageUrl='https://image.tmdb.org/t/p/w500/';
export const backdropImageUrl='https://image.tmdb.org/t/p/w780/';

export const Api = axios.create({
  baseURL: 'https://api.tmdb.org/3/',
  timeout: 5000,
  params: {
    api_key: ApiKey // automatically add API key to every request
  }
});
