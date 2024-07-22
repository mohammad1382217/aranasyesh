import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance, { getCookie } from "../../api/apiConfig";
import axios, { AxiosError, CancelTokenSource } from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../api/authContext";

const TransactionPage = () => {
  const showToastMessage = (message: string) => {
    toast.success(message, {
      position: "top-center",
    });
  };

  const showToastErrorMessage = (message: string) => {
    toast.error(message, {
      position: "top-center",
    });
  };
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const Authority = searchParams.get("Authority");
  const Status = searchParams.get("Status");
  const navigate = useNavigate();

  const formData = new FormData();
  formData.append("authority", Authority!);
  formData.append("status", Status!);
  const { dispatch } = useAuth();

  useEffect(() => {
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
        const response = await axiosInstance.post(
          `product/transaction/${getCookie("uuid")}/verify/`,
          formData,
          {
            cancelToken: cancelTokenSource.token,
          }
        );
        const data = response.data;
        if (data.message === "تراکنش موفق!") {
          showToastMessage(data.message);
          dispatch({type: "SET_ACCOUNT", payload: null});
          navigate("/BuySubscription");
        } else {
          showToastErrorMessage(data.message);
          navigate("/BuySubscription");
        }
      } catch (error) {
        if (axios.isCancel(error as AxiosError)) {
          console.log("Request canceled by cleanup");
        } else {
          // Handle error if it's not a cancellation error
          const errorMessage = (error as Error).message; // Type assertion
          console.log(errorMessage);
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
  }, []);

  // انجام عملیات مربوطه بر اساس Authority و Status

  return (
    <div className="min-h-screen p-10 flex flex-col items-center justify-center gap-5"></div>
  );
};

export default TransactionPage;
