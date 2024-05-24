export const initialBanner: BannerState = {
  main: [],
  side: [],
  special: [],
  restaurant: [],
  services: [],
  art_edu: [],
  beauty: [],
  sportive: [],
  treatment: [],
  CategoreyCompany: { previous: null, page: 1, next: null, results: [] },
  error: null,
  loading: {
    screen:true,
    special: true,
    main: true,
    side: true,
  },

};

export const BannerReducer = (
  state: BannerState,
  action: Action
): BannerState => {
  switch (action.type) {
    case "Loading":
      return {
        ...state,
        loading: {
          ...state.loading,
          screen: false, 
        },
      };
    case "FETCH_SUCCESS_main":
      return {
        ...state,
        main: action.payload,
        loading: {
          ...state.loading,
          main: false, 
        },
      };
    case "FETCH_SUCCESS_side":
      return {
        ...state,
        side: action.payload,
        loading: {
          ...state.loading,
          side: false, 
        },
      };
    case "FETCH_SUCCESS_special":
      return {
        ...state,
        special: action.payload,
        loading: {
          ...state.loading,
          special: false, 
        },
      };
    case "FETCH_SUCCESS_restaurant":
      return {
        ...state,
        restaurant: action.payload,
      };
    case "FETCH_SUCCESS_services":
      return {
        ...state,
        services: action.payload,
      };
    case "FETCH_SUCCESS_art_edu":
      return {
        ...state,
        art_edu: action.payload,
      };
    case "FETCH_SUCCESS_beauty":
      return {
        ...state,
        beauty: action.payload,
      };
    case "FETCH_SUCCESS_sportive":
      return {
        ...state,
        sportive: action.payload,
      };
    case "FETCH_SUCCESS_treatment":
      return {
        ...state,
        treatment: action.payload,
      };
    case "FETCH_SUCCESS_CategoreyCompany":
      return {
        ...state,
        CategoreyCompany: action.payload,
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

export interface main {
  image: string;
}
export interface side {
  image: string;
  link: string;
}
export interface loading {
  screen:boolean;
  main: boolean;
  side: boolean;
  special: boolean;
}
export interface CardCompany {
  id: string;
  company_name: string;
  discount: number;
  max_discount: number;
  rate: number;
  company_image1: string;
}

export interface BannerState {
  loading: loading;
  main: Array<main>;
  side: Array<side>;
  special: Array<CardCompany>;
  restaurant: Array<CardCompany>;
  services: Array<CardCompany>;
  art_edu: Array<CardCompany>;
  beauty: Array<CardCompany>;
  sportive: Array<CardCompany>;
  treatment: Array<CardCompany>;
  CategoreyCompany: categoryCopanies;
  error: any;
}
export interface categoryCopanies {
  previous: string | null;
  page: number;
  next: string | null;
  results: Array<CardCompany>;
}
export interface Action {
  type: string;
  payload?: any;
}
