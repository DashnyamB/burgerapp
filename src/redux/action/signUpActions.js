import axios from "axios";

export const singupUser = (email, password) => {
  return function (dispatch) {
    dispatch(singupUserStart());
    const data = {
      email,
      password,
      returnSecureToken: true,
    };
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCEcdsNuBBM85l0lm4ft7UGyuV_M0ktpvM",
        data
      )
      .then((result) => {
        // localStorage  луу хадгална
        const token = result.data.idToken;
        const userId = result.data.localId;

        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        dispatch(singupUserSuccess(token, userId));
      })
      .catch((error) => {
        dispatch(singupUserError(error));
      });
    //
  };
};

export const singupUserStart = () => {
  return {
    type: "SIGNUP_USER_START",
  };
};
export const singupUserSuccess = (token, userId) => {
  return {
    type: "SIGNUP_USER_SUCCESS",
    token,
    userId,
  };
};
export const singupUserError = (error) => {
  return {
    type: "SIGNUP_USER_ERROR",
    error,
  };
};
