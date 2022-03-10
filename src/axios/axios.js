import axios from 'axios';

export const requestMethods = {
  DELETE: 'DELETE',
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
};

const axiosFetch = async ({ data, method, url }) => {
  try {
    const response = await axios({
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('POST-APP-FE-TOKEN')}`,
      },
      method: method,
      url,
    });
    return response.data;
  } catch (error) {
    return undefined;
  }
};

export default axiosFetch;
