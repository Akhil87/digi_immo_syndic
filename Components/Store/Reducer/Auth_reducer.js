import { AUTH_SESSION, USER_DATA } from "../Actions/Action_types";

let initialState = {
  isLogin: null,
  userData: "",
  isLoginChecked: false
};

export const Auth_reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SESSION:
      return { ...state, isLogin: action?.payload, isLoginChecked: true };
    case USER_DATA:
      return { ...state, userData: action?.payload };
    default:
      return state;
  }
};
