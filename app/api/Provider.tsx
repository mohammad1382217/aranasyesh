// CategoryProvider.tsx
import React, { useState, ReactNode, useEffect } from "react";
import Context from "./context";
import axios, { AxiosError, CancelTokenSource } from "axios";
import axiosInstance from "./apiConfig";
import { category } from "./Slices/HomeSlice/Home";

interface ProviderProps {
  children: ReactNode;
}

const Provider = ({ children }: ProviderProps) => {
  const [categoryData, setCategoryData] = useState<category[]>([]);
  const [isCategoryLoading, setIsCategoryLoading] = useState<boolean>(false);

  useEffect(() => {
    let cancelTokenSource: CancelTokenSource | null = null;

    try {
      cancelTokenSource = axios.CancelToken.source();
    } catch (error) {
      // Handle error if cancel token creation fails
      console.error("Failed to create cancel token:", error);
    }

    const fetchCategory = async () => {
      if (!cancelTokenSource) return; // Exit if cancel token is null
      try {
        const response = await axiosInstance.get("category/", {
          cancelToken: cancelTokenSource.token,
        });
        const data = response.data;
        setCategoryData(data);
      } catch (error) {
        if (axios.isCancel(error as AxiosError)) {
          console.log("Request canceled by cleanup");
        }
      }
    };

    fetchCategory(); // Start fetching immediately

    // Return cleanup function
    return () => {
      if (cancelTokenSource) {
        cancelTokenSource.cancel("Request canceled by cleanup");
      }
    };
  }, []);

  return (
    <Context.Provider
      value={{
        categoryData,
        setCategoryData,
        isCategoryLoading,
        setIsCategoryLoading,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
