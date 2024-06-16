import axios, { AxiosError, CancelTokenSource } from "axios";
import { Dispatch } from "react";
import axiosInstance from "./apiConfig";

export const fetchCities = (
  dispatch: Dispatch<Action>,
  Province: string
): (() => void) => {
  let cancelTokenSource: CancelTokenSource | null = null;
  const formData = new FormData();
  formData.append("province_name" , Province);

  try {
    cancelTokenSource = axios.CancelToken.source();
  } catch (error) {
    // Handle error if cancel token creation fails
    console.error("Failed to create cancel token:", error);
  }

  const fetchData = async () => {
    if (!cancelTokenSource) return; // Exit if cancel token is null
    try {
      const url = `account/city/`;
      const response = await axiosInstance.post(url,formData, {
        cancelToken: cancelTokenSource.token,
      });
      const data = response.data;
      dispatch({ type: "FETCH_SUCCESS", payload: data });
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

export interface Action {
  type: string;
  payload?: any;
}