import axios, { AxiosError, CancelTokenSource } from "axios";
import { Action } from "./Slices/HomeSlice/Home";
import { Dispatch } from "react";
import axiosInstance from "./apiConfig";

export const fetchFAQ = (dispatch: Dispatch<Action>): (() => void) => {
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
      const response = await axiosInstance.get("faq/", {
        cancelToken: cancelTokenSource.token,
      });
      const data = response.data;
      dispatch({ type: "FETCH_SUCCESS", payload: data });
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

  fetchData(); // Start fetching immediately

  // Return cleanup function
  return () => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel("Request canceled by cleanup");
    }
  };
};
