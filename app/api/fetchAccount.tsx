import axiosInstance from "./apiConfig";


const UserService = {
  getUserData: async () => {
    try {
      const response = await axiosInstance.get("account/");
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }
};

export default UserService;
