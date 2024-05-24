import axios, { AxiosError, CancelTokenSource } from "axios";
import axiosInstance from "./apiConfig";

export const postSiteWorkwithus = (Object: CompanyWorkwithus): (() => void) => {
  let cancelTokenSource: CancelTokenSource | null = null;

  try {
    cancelTokenSource = axios.CancelToken.source();
  } catch (error) {
    // Handle error if cancel token creation fails
    console.error("Failed to create cancel token:", error);
  }

  const PostRequsetSite = async () => {
    if (!cancelTokenSource) return; // Exit if cancel token is null

    try {
      const response = await axiosInstance.post("request/banner/site/", Object, {
        cancelToken: cancelTokenSource.token,
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

  PostRequsetSite(); // Start fetching immediately

  // Return cleanup function
  return () => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel("Request canceled by cleanup");
    }
  };
};

// type
export interface CompanyWorkwithus {
    phone_number: string;
    company_name: string;
}
