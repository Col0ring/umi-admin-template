const baseUrl = '/api';
const mockApi = (url: string, method?: string) => {
  method = method ? method.toLocaleUpperCase() : 'GET';
  return `${method} ${baseUrl + url}`;
};

export default mockApi;
