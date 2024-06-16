import axios, { AxiosError, CancelTokenSource } from "axios";
import axiosInstance from "./apiConfig";

export const postPhoneNumber = async(Object: phoneNumber) => {
  const cancelTokenSource: CancelTokenSource | null = null;

  try {
    const response = await axiosInstance.post("account/", Object, {
      cancelToken: cancelTokenSource!.token,
    });
    const data = response.data;
    return data;
  } catch (error) {
    if (axios.isCancel(error as AxiosError)) {
      console.log("Request canceled by cleanup");
    } else {
      // Handle error if it's not a cancellation error
      // const errorMessage = (error as Error).message; // Type assertion
      // return({ type: "FETCH_ERROR", payload: errorMessage });
    }
  }
};

// type
export interface phoneNumber {
  phone_number: string;
}
