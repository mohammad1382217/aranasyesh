import axios, { AxiosError, CancelTokenSource } from "axios";
import axiosInstance from "./apiConfig";

const postRepresentativeCode = async(
  RepresentativeCode: RepresentativeCode
) => {
  let cancelTokenSource: CancelTokenSource | null = null;

  try {
    cancelTokenSource = axios.CancelToken.source();
  } catch (error) {
    // Handle error if cancel token creation fails
    console.error("Failed to create cancel token:", error);
  }

  if (!cancelTokenSource) return; // Exit if cancel token is null

  try {
    const response = await axiosInstance.post(
      "discount/create/",
      RepresentativeCode,
      {
        cancelToken: cancelTokenSource.token,
      }
    );
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

export default postRepresentativeCode;

// type
export interface RepresentativeCode {
  representative_code: string;
}
