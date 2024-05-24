export const initialtransactionData: transactionDataState = {
  transactionData: [],
  error: null,
};

export const transactionDataReducer = (state: transactionDataState, action: Action): transactionDataState => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        transactionData: action.payload,
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
export interface transactionDataState {
  transactionData: transactionItem[];
  error: any;
}

export interface transactionItem {
  id:number;
  first_name:string;
  last_name:string;
  customer_code:string;
  created:string;
  original_price:string;
  discount_price:string;
  discount:string;
}

export interface Action {
  type: string;
  payload?: any;
}