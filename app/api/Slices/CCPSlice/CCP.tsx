export const initialCCP: CCPState = {
  CCPInformation: [],
  CCP: {
    id: 1,
    company_name: "",
    company_image1: "",
    company_image2: "",
    company_image3: "",
    company_image4: "",
    company_image5: "",
    video: null,
    description: "",
    address: "",
    call_number: "",
    eita: "",
    instagram: "",
    telegram: "",
  }
  // error: null,
};

export const CCPReducer = (state: CCPState, action: Action): CCPState => {
  switch (action.type) {
    case "setCCP":
      const {key, value} = action.payload;
      return {
        ...state,
        CCP: { ...state.CCP, [key]: value },
      };
    case "FETCH_SUCCESS_CCP":
      return {
        ...state,
        CCP: action.payload,
        // error: null,
      };
    case "FETCH_SUCCESS_CCPINFORMATION":
      return {
        ...state,
        CCPInformation: action.payload,
        // error: null,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        // error: action.payload,
      };
    default:
      return state;
  }
};

// Types

export interface CCPState {
  CCPInformation: CCP[];
  CCP: CCP;
  // error: any;
}

interface CCP {
  id: number;
  company_name: string;
  company_image1: string;
  company_image2: string;
  company_image3: string;
  company_image4: string;
  company_image5: string;
  video: null;
  description: string;
  address: string;
  call_number: string;
  eita: string;
  instagram: string;
  telegram: string;
}

export interface Action {
  type: string;
  payload?: any;
}
