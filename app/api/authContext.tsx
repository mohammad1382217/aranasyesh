import React, { createContext, useContext, useReducer, useEffect, Dispatch } from "react";
import UserService from "../api/fetchAccount";
import { deleteCookie } from "./apiConfig";
import { useNavigate } from "react-router-dom";

export interface AccountData {
  previous: null;
  page: number;
  next: null;
  results: {
    id: number;
    full_name: string;
    phone_number: string;
    email: string;
    subscription: {
      is_buy: boolean;
      remain: string;
      name: string;
    };
    permission: {
      is_staff: boolean;
      is_owner: boolean;
      company_url: string;
      company_id: string;
    };
  }[];
}

export interface ProfileData {
  first_name: string | null;
  last_name: string | null;
  birth_date: string | null;
  email: string | null;
  province: string | null;
  city: string | null;
  address: string | null;
  phone_number: string;
  qr_code: string;
  representative_code: string;
  customer_code: number;
  discounts: discount[];
}

interface discount {
  company: string;
  created: string;
  original_price: number;
  discount_price: number;
  discount: number;
}

interface AuthState {
  isAdmin: boolean;
  isLoading: boolean;
  isLoggedIn: boolean;
  updateProfile: boolean;
  profile: ProfileData | null;
  account: AccountData | null;
}

const initialState: AuthState = {
  isAdmin: JSON.parse(localStorage.getItem("isAdmin") || "false"),
  isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn") || "false"),
  updateProfile: false,
  isLoading: false,
  profile: null,
  account: null,
};

type AuthAction =
  | { type: "SET_ADMIN"; payload: boolean }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_PROFILE"; payload: ProfileData | null }
  | { type: "SET_ACCOUNT"; payload: AccountData | null }
  | { type: "SET_LOGGED_IN"; payload: boolean }
  | { type: "SET_UPDTAE_PROFILE"; payload: boolean };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SET_ADMIN":
      return { ...state, isAdmin: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_PROFILE":
      return { ...state, profile: action.payload };
    case "SET_ACCOUNT":
      return { ...state, account: action.payload };
    case "SET_LOGGED_IN":
      return { ...state, isLoggedIn: action.payload };
    case "SET_UPDTAE_PROFILE":
      return { ...state, updateProfile: action.payload };
    default:
      return state;
  }
};

interface AuthContextType extends AuthState {
  dispatch: Dispatch<AuthAction>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        if (state.isLoggedIn || state.updateProfile) {
          const userData: AccountData = await UserService.getUserData();
          dispatch({ type: "SET_ACCOUNT", payload: userData });
          const isAdmin = userData.results[0]?.permission?.is_owner ?? false;
          dispatch({ type: "SET_ADMIN", payload: isAdmin });

          if (userData.results[0]?.id) {
            const profileData = await UserService.getProfile(userData.results[0].id);
            dispatch({ type: "SET_PROFILE", payload: profileData });
            dispatch({ type: "SET_LOGGED_IN", payload: true });
          }
        }
      } catch (error) {
        console.error("Error fetching user data or profile:", error);
        dispatch({ type: "SET_ADMIN", payload: false });
        dispatch({ type: "SET_PROFILE", payload: null });
        dispatch({ type: "SET_LOGGED_IN", payload: false });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    fetchData();
  }, [state.isLoggedIn, dispatch, state.updateProfile]);

  // Save isAdmin and isLoggedIn to localStorage
  useEffect(() => {
    localStorage.setItem("isAdmin", JSON.stringify(state.isAdmin));
    localStorage.setItem("isLoggedIn", JSON.stringify(state.isLoggedIn));
  }, [state.isAdmin, state.isLoggedIn]);

  const logout = () => {
    const navigate = useNavigate();
    deleteCookie("accessToken");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("isLoggedIn");
    dispatch({ type: "SET_ADMIN", payload: false });
    dispatch({ type: "SET_PROFILE", payload: null });
    dispatch({ type: "SET_ACCOUNT", payload: null });
    dispatch({ type: "SET_LOGGED_IN", payload: false });
    navigate("/");
  };
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};