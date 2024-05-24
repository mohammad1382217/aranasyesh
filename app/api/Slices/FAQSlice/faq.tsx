export const initialFAQ: FAQState = {
  FAQ: [],
  // error: null,
};

export const FAQReducer = (state: FAQState, action: Action): FAQState => {
  switch (action.type) {
    // case "setFAQ":
    //   return {
    //     ...state,
    //     FAQ: action.payload,
    //   };
    case "FETCH_SUCCESS":
      return {
        ...state,
        FAQ: action.payload,
      };
    default:
      return state;
  }
};

// Types

export interface FAQState {
  FAQ: FAQ[];
  // error: any;
}

export interface FAQ {
  category: string;
  question: string;
  answer: string;
}

export interface Action {
  type: string;
  payload?: any;
}
