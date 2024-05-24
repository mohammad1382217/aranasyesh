export const initialHome: HomeState = {
  isShowModalHandler: false,
  category: [],
  categoryItems: [],
  error: null,
  loading: false
};

export const HomeReducer = (state: HomeState, action: Action): HomeState => {
  switch (action.type) {
    case "setIsShowModalLogin":
      return {
        ...state,
        isShowModalHandler: action.payload,
      };
    case "FETCH_SUCCESS_CATEGORY":
      return {
        ...state,
        category: action.payload,
      };
    case "Loading_CATEGORY":
      return {
        ...state,
        loading: action.payload,
      };
    case "FETCH_ERROR_CATEGORY":
      return {
        ...state,
        error: action.payload,
      };
    case "FETCH_SUCCESS_CATEGORYITEMS":
      return {
        ...state,
        categoryItems: action.payload,
      };
    case "Loading_CATEGORYITEMS":
      return {
        ...state,
        loading: action.payload,
      };
    case "FETCH_ERROR_CATEGORYITEMS":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Types

export interface HomeState {
  isShowModalHandler: boolean;
  category: category[];
  categoryItems: categoryItems[];
  error: any;
  loading: boolean
}

export interface category {
  id: number;
  icon: string;
  name: string;
  show_name: string;
  image: string;
  sub_categories: subCategory[];
}

interface categoryItems {
  company_image1: string;
  company_name: string;
  discount: number;
  id: number;
  max_discount: number;
  rate: number;
}
interface subCategory {
  id: number;
  name: string;
}

export interface Action {
  type: string;
  payload?: any;
}
