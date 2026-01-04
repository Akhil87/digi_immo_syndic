import { AUTH_SESSION, USER_DATA } from "./Action_types";

export const login_action = (payload) => {
  return {
    type: AUTH_SESSION,
    payload
  };
};

export const user_data_action = (payload) => {
  return {
    type: USER_DATA,
    payload
  };
};
