export const initialLogin: LoginState = {
  PhoneNumber: {
    phone_number: "",
  },
  smsStatesOTP: {
    phone_number: "",
    otp: "",
  },
  smsStates: {
    phone_number: "",
    customer_code: "",
    otp: "",
  },
  code: {
    code1: "",
    code2: "",
    code3: "",
    code4: "",
    code5: "",
  },
};

export const LoginReducer = (state: LoginState, action: Action): LoginState => {
  switch (action.type) {
    case "setPhoneNumber":
      return {
        ...state,
        PhoneNumber: { ...state.PhoneNumber, [action.payload.key]: action.payload.value },
        smsStates: { ...state.smsStates, [action.payload.key]: action.payload.value },
      };
    case "setsmsStates":
      return {
        ...state,
        smsStates: { ...state.smsStates, [action.payload.key]: action.payload.value },
      };
    case "setsmsStatesOTP":
      return {
        ...state,
        smsStatesOTP: { ...state.smsStatesOTP, [action.payload.key]: action.payload.value },
      };
    case "setCode":
      return {
        ...state,
        code: { ...state.code, [action.payload.key]: action.payload.value },
      };
    case "setOtp":
      const { code } = state;
      const otp =
        code.code1 + code.code2 + code.code3 + code.code4 + code.code5;
      return {
        ...state,
        smsStatesOTP: { ...state.smsStatesOTP, otp: otp },
        smsStates: {...state.smsStates, otp: otp}
      };
    default:
      return state;
  }
};

// Types

export interface LoginState {
  PhoneNumber: {
    phone_number: string;
  };
  smsStatesOTP: {
    phone_number: string;
    otp: string;
  };
  smsStates: {
    phone_number: string;
    customer_code: string;
    otp: string;
  };
  code: {
    code1: string;
    code2: string;
    code3: string;
    code4: string;
    code5: string;
  };
}

export interface SetPhoneNumberAction {
  type: 'setPhoneNumber';
  payload: {
    key: string;
    value: string;
  };
}

export interface SetSmsStatesAction {
  type: 'setsmsStates';
  payload: {
    key: string;
    value: string;
  };
}

export interface SetSmsStatesOTPAction {
  type: 'setsmsStatesOTP';
  payload: {
    key: string;
    value: string;
  };
}

export interface SetCodeAction {
  type: 'setCode';
  payload: {
    key: string;
    value: string;
  };
}

export interface SetOtpAction {
  type: 'setOtp';
}

type Action = SetPhoneNumberAction | SetSmsStatesAction | SetSmsStatesOTPAction | SetCodeAction | SetOtpAction;