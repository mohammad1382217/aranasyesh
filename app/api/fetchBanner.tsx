import axios, { AxiosError, CancelTokenSource } from "axios";
import { Action } from "./Slices/BannersSlice/Banners";
import { Dispatch } from "react";
import axiosInstance from "./apiConfig";

export const fetchBanner = (dispatch: Dispatch<Action>): (() => void) => {
  let cancelTokenSource: CancelTokenSource | null = null;
  dispatch({ type: "Loading", payload: true });

  try {
    cancelTokenSource = axios.CancelToken.source();
  } catch (error) {
    // Handle error if cancel token creation fails
    console.error("Failed to create cancel token:", error);
  }
  const fetchBanner = async () => {
    if (!cancelTokenSource) return; // Exit if cancel token is null
    try {
      const response = await axiosInstance.get("banner/", {
        cancelToken: cancelTokenSource.token,
      });
      const data = response.data;
      dispatch({ type: "FETCH_SUCCESS_main", payload: data });
    } catch (error) {
      if (axios.isCancel(error as AxiosError)) {
        console.log("Request canceled by cleanup");
      } else {
        // Handle error if it's not a cancellation error
        const errorMessage = (error as Error).message; // Type assertion
        dispatch({ type: "FETCH_ERROR", payload: errorMessage });
      }
    }
  };
  fetchBanner();

  dispatch({ type: "Loading", payload: false });

  // Return cleanup function
  return () => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel("Request canceled by cleanup");
    }
  };
};
