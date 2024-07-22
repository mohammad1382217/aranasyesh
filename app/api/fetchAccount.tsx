import axiosInstance from "./apiConfig";
import { AccountData, ProfileData } from '../api/authContext';


// Function to get user data
const getUserData = async (): Promise<AccountData> => {
  try {
    const response = await axiosInstance.get(`account/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

// Function to get profile data by user ID
const getProfile = async (userId: number): Promise<ProfileData> => {
  try {
    const response = await axiosInstance.get(`account/${userId}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching profile data for user ${userId}:, error`);
    throw error;
  }
};

const UserService = {
  getUserData,
  getProfile,
};

export default UserService;