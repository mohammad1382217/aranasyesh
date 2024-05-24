export const initialDiscountHistory: DiscountHistoryState = {
  DiscountHistory: [],
  discountCode: {
    representative_code: "",
  },
  error: null,
};

export const DiscountHistoryReducer = (
  state: DiscountHistoryState,
  action: Action
): DiscountHistoryState => {
  switch (action.type) {
    case "setDiscountCode":
      return {
        ...state,
        discountCode: {
          ...state.discountCode,
          [action.payload.key]: action.payload.value,
        },
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        DiscountHistory: action.payload,
        error: null,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Types
export interface DiscountHistoryState {
  DiscountHistory: Array<string>;
  discountCode: {
    representative_code: string;
  };
  error: any;
}

export interface Action {
  type: string;
  payload?: any;
}
