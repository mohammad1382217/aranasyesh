import axios, { AxiosError, CancelTokenSource } from "axios";
import axiosInstance from "./apiConfig";
import { Dispatch } from "react";
import { Action } from "./Slices/SelectDateSlice/SelectDate";

export const fetchSpecific_date = (
  dispatch: Dispatch<Action>,
  date: string
): (() => void) => {
  let cancelTokenSource: CancelTokenSource | null = null;

  try {
    cancelTokenSource = axios.CancelToken.source();
  } catch (error) {
    // Handle error if cancel token creation fails
    console.error("Failed to create cancel token:", error);
  }
  const fetch = async () => {
    let id = '';
    try {
      const response = await axiosInstance.get("ccp/", {
        // cancelToken: cancelTokenSource.token,
      });
       id = response.data[0].id;
    } catch (error) {console.log(error)}
    if (!cancelTokenSource) return; // Exit if cancel token is null
   
    if(date !== ''){
      try {
        const response = await axiosInstance.post(
          `/ccp/${id}/specific_date/`,{created_date:date},
          {
            cancelToken: cancelTokenSource.token,
          }
        );
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
    }
    else{
      try {
        const response = await axiosInstance.get(
          `/ccp/${id}/specific_date/`,
          {
            cancelToken: cancelTokenSource.token,
          }
        );
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
    }
  };

  fetch(); // Start fetching immediately

  // Return cleanup function
  return () => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel("Request canceled by cleanup");
    }
  };
};

//type

export interface Specific_date {
  first_name: string;
  last_name: string;
  phone_number: string;
  created: string;
  original_price: string;
  discount_price: string;
  discount: string;
}
