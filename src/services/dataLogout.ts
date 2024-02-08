import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const dataLogout = async (): Promise<any> => {
  try {
    const response = await axios.post(
      `${API_URL}/api/users/logout`,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default dataLogout;
