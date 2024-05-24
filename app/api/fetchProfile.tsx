import axios, { AxiosError, CancelTokenSource } from "axios";
import { Dispatch } from "react";
import axiosInstance from "./apiConfig";
import { UserAction } from "./Slices/UserSlice/userReducer";

export const fetchProfile = (
  dispatch: Dispatch<UserAction>,
  Id: number
): (() => void) => {
  let cancelTokenSource: CancelTokenSource | null = null;

  try {
    cancelTokenSource = axios.CancelToken.source();
  } catch (error) {
    // Handle error if cancel token creation fails
    console.error("Failed to create cancel token:", error);
  }

  const fetchData = async () => {
    if (!cancelTokenSource) return; // Exit if cancel token is null
    try {
      const response = await axiosInstance.get(`account/${Id}/`, {
        cancelToken: cancelTokenSource.token,
      });
      const data = response.data;
      dispatch({ type: "FETCH_PROFILE_SUCCESS", payload: data });
    } catch (error) {
      if (axios.isCancel(error as AxiosError)) {
        console.log("Request canceled by cleanup");
      }
    }
  };

  fetchData(); // Start fetching immediately

  // Return cleanup function
  return () => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel("Request canceled by cleanup");
    }
  };
};
