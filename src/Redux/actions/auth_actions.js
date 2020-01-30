import { SIGN_UP, SIGN_IN, SIGN_OUT } from "../types/auth_types";

export const user_signup = (user) => {
  return {
    type: SIGN_UP,
    payload: user
  };
};

export const user_signin = user => {
  return {
    type: SIGN_IN,
    payload: user
  };
};

export const user_signout = () => {
  return {
    type: SIGN_OUT,
    payload: []
  };
};