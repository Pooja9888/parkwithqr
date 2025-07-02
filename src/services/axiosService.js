import axios from 'axios';

const axiosPostToken = async (url, payload, token) => {
  try {
    const headers = {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`,
    };

    const response = await axios.post(url, payload, { headers });
    return response.data;
  } catch (error) {
    console.log('Axios POST error:', error.response?.data || error.message);
    throw error;
  }
};

const axiosGetToken = async (url, token) => {
  try {
    const headers = {
      'Authorization': `Bearer ${token}`,
    };

    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.log('Axios GET error:', error.response?.data || error.message);
    throw error;
  }
};

export { axiosPostToken, axiosGetToken };
