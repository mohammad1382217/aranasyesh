// userReducer.ts

export const RESET_USER = "RESET_USER";
export const FETCH_PROFILE_SUCCESS = "FETCH_PROFILE_SUCCESS";
export const SET_EDIT_PROFILE = "SET_EDIT_PROFILE";
export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";

export interface discount {
  company: string;
  created: string;
  original_price: number;
  discount_price: number;
  discount: number;
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

export interface UserState {
  editProfile: ProfileData | null;
}

export const initialUser: UserState = {
  editProfile: {
    first_name: null,
    last_name: null,
    birth_date: null,
    email: null,
    province: null,
    city: null,
    address: null,
    phone_number: "",
    qr_code: "",
    representative_code: "",
    customer_code: 0,
    discounts: [],
  },
};

export type UserAction =
  | { type: typeof RESET_USER }
  | { type: typeof FETCH_PROFILE_SUCCESS; payload: ProfileData }
  | { type: typeof SET_EDIT_PROFILE; payload: {key: string , value: string} }
  | { type: typeof FETCH_DATA_FAILURE };

export const userReducer = (
  state: UserState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case RESET_USER:
      return {
        editProfile: {
          first_name: null,
          last_name: null,
          birth_date: null,
          email: null,
          province: null,
          city: null,
          address: null,
          phone_number: "",
          qr_code: "",
          representative_code: "",
          customer_code: 0,
          discounts: [],
        },
      };
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        editProfile: action.payload,
      };
    case SET_EDIT_PROFILE:
      const { key, value } = action.payload;
      return {
        ...state,
        editProfile: { ...state.editProfile!, [key]: value },
      };
    case FETCH_DATA_FAILURE:
      // انجام عملیات موردنظر در صورت شکست در دریافت داده از API
      return state;
    default:
      return state;
  }
};

export default userReducer;
