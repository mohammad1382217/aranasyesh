import axios, { AxiosError, CancelTokenSource } from "axios";
import { Action } from "./Slices/HomeSlice/Home";
import { Dispatch } from "react";
import axiosInstance from "./apiConfig";

export const fetchSide = (dispatch: Dispatch<Action>): (() => void) => {
  let cancelTokenSource: CancelTokenSource | null = null;
  dispatch({ type: "Loading", payload: true });
  try {
    cancelTokenSource = axios.CancelToken.source();
  } catch (error) {
    // Handle error if cancel token creation fails
    console.error("Failed to create cancel token:", error);
  }

  const fetchData = async () => {
    if (!cancelTokenSource) return; // Exit if cancel token is null
    try {
      const response = await axiosInstance.get(`banner/side/`, {
        cancelToken: cancelTokenSource.token,
      });
      const data = response.data;
      dispatch({ type: "FETCH_SUCCESS_side", payload: data });
    } catch (error) {
      if (axios.isCancel(error as AxiosError)) {
              } else {
        // Handle error if it's not a cancellation error
        const errorMessage = (error as Error).message; // Type assertion
        dispatch({ type: "FETCH_ERROR", payload: errorMessage });
        console.log(errorMessage);
      }
    }
  };
  fetchData(); // Start fetching immediately
  dispatch({ type: "Loading", payload: false });

  // Return cleanup function
  return () => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel("Request canceled by cleanup");
    }
  };
};
