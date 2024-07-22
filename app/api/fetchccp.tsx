import axios, { AxiosError, CancelTokenSource } from "axios";
import axiosInstance from "./apiConfig";
import { Dispatch } from "react";

const fetchCCP = (dispatch: Dispatch<Action>): (() => void) => {
  let cancelTokenSource: CancelTokenSource | null = null;

  try {
    cancelTokenSource = axios.CancelToken.source();
  } catch (error) {
    // Handle error if cancel token creation fails
    console.error("Failed to create cancel token:", error);
  }

  const fetchCCPData = async () => {
    if (!cancelTokenSource) return; // Exit if cancel token is null
    try {
      const response = await axiosInstance.get("ccp/", {
        cancelToken: cancelTokenSource.token,
      });
      const data = response.data;
      dispatch({ type: "FETCH_SUCCESS_CCP", payload: data[0] });
      dispatch({ type: "FETCH_SUCCESS_CCPINFORMATION", payload: data });
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

  fetchCCPData(); // Start fetching immediately

  // Return cleanup function
  return () => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel("Request canceled by cleanup");
    }
  };
};

export default fetchCCP;

export interface Action {
  type: string;
  payload?: any;
}