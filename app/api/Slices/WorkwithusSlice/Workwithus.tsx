export const initialWorkwithus: initialWorkwithusState = {
  RequestComapny: {
    phone_number: "",
    company_name: "",
    call_number: "",
    address: "",
    description: "",
  },
  RequestApp: {
    phone: "",
    name: "",
  },
  RequestSite: {
    phone_number: "",
    company_name: "",
  },
  error: {
    RequestComapny: {
      phone_number: "",
      company_name: "",
      call_number: "",
      address: "",
      description: "",
    },
    RequestApp: {
      phone: "",
      name: "",
    },
    RequestSite: {
      phone_number: "",
      company_name: "",
    },
  },
};

export const WorkwithusReducer = (
  state: initialWorkwithusState,
  action: Action
): initialWorkwithusState => {
  switch (action.type) {
    case "setRequestComapny":
      return {
        ...state,
        RequestComapny: {
          ...state.RequestComapny,
          [action.payload.key]: action.payload.value,
        },
      };
    case "setRequestapp":
      return {
        ...state,
        RequestApp: {
          ...state.RequestApp,
          [action.payload.key]: action.payload.value,
        },
      };
    case "setRequestsite":
      return {
        ...state,
        RequestSite: {
          ...state.RequestSite,
          [action.payload.key]: action.payload.value,
        },
      };
    case "FETCH_ERROR_Requestapp":
      return {
        ...state,
        error: {
          ...state.error,
          RequestApp:action.payload
        },
      };
    case "Reset":
      return {
        RequestComapny: {
          phone_number: "",
          company_name: "",
          call_number: "",
          address: "",
          description: "",
        },
        RequestApp: {
          phone: "",
          name: "",
        },
        RequestSite: {
          phone_number: "",
          company_name: "",
        },
        error: {
          RequestComapny: {
            phone_number: "",
            company_name: "",
            call_number: "",
            address: "",
            description: "",
          },
          RequestApp: {
            phone: "",
            name: "",
          },
          RequestSite: {
            phone_number: "",
            company_name: "",
          } 
      }
    };
    default:
      return state;
  }
};

// Types

export interface initialWorkwithusState {
  RequestComapny: RequestComapny;
  RequestApp: RequestApp;
  RequestSite:RequestSite;
  error: error;
}
export interface RequestComapny {
  phone_number: string;
  company_name: string;
  call_number: string;
  address: string;
  description: string;
}
export interface RequestApp {
  phone: string;
  name: string;
}
export interface RequestSite {
  phone_number: string;
  company_name: string;
}
export interface setRequestComapny {
  type: "setRequestComapny";
  payload: {
    key: string;
    value: string;
  };
}

export interface setRequestsite {
  type: "setRequestsite";
  payload: {
    key: string;
    value: string;
  };
}

export interface setRequestapp {
  type: "setRequestapp";
  payload: {
    key: string;
    value: string;
  };
}
export interface FETCH_ERROR_Requestapp {
  type: string;
  payload?: any;
}

export interface error {
    RequestComapny: any
    RequestApp:any
    RequestSite: any
}

type Action =
  | setRequestComapny
  | setRequestapp
  | setRequestsite
  | FETCH_ERROR_Requestapp;
