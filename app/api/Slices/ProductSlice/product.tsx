export const initialProduct: ProductState = {
  product: [],
  ZARINPAL: {
    url: "",
    uuid: "",
  },
  // error: null,
};

export const ProductReducer = (
  state: ProductState,
  action: Action
): ProductState => {
  switch (action.type) {
    case "FETCH_SUCCESS_PRODUCT":
      return {
        ...state,
        product: action.payload,
      };
    case "FETCH_SUCCESS_ZARINPAL":
      return {
        ...state,
        ZARINPAL: action.payload,
      };

    default:
      return state;
  }
};

// Types

export interface ProductState {
  product: product[];
  ZARINPAL: ZARINPAL;
  // error: any;
}

export interface ZARINPAL {
  url: string;
  uuid: string;
}
export interface product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface Action {
  type: string;
  payload?: any;
}
