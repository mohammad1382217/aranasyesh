export const initialCities: CitiesState = {
  Cities: [],
  error: null,
};

export const CitiesReducer = (state: CitiesState, action: Action): CitiesState => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        Cities: action.payload,
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

export interface CitiesState {
  Cities: string[];
  error: any;
}

export interface Action {
  type: string;
  payload?: any;
}