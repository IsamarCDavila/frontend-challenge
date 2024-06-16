import axios from 'axios';

export const fetchUserData = async () => {
  try {
    const response = await axios.get('https://rimac-front-end-challenge.netlify.app/api/user.json');
    return response.data;
  } catch (error) {
    console.error('Error fetching user data', error);
    throw error;
  }
};
