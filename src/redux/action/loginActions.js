import axios from "axios";

export const loginUser = (email, password) => {
  return function (dispatch) {
    dispatch(loginStart());

    const data = {
      email,
      password,
      returnSecureToken: true,
    };
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCEcdsNuBBM85l0lm4ft7UGyuV_M0ktpvM",
        data
      )
      .then((result) => {
        // localStorage  луу хадгална
        const token = result.data.idToken;
        const userId = result.data.localId;
        const expiresIn = result.data.expiresIn;
        const expireDate = new Date(new Date().getTime() + expiresIn * 1000);
        const refreshToken = result.data.refreshToken;

        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("expireDate", expireDate);

        dispatch(loginSuccess(token, userId));
        dispatch(autoLogoutAfterMillisec(expiresIn * 1000));
      })
      .catch((error) => {
        dispatch(loginError(error));
      });
    //
  };
};
export const loginStart = () => {
  return {
    type: "LOGIN_USER_START",
  };
};
export const loginSuccess = (token, userId) => {
  return {
    type: "LOGIN_USER_SUCCESS",
    token,
    userId,
  };
};
export const loginError = (error) => {
  return {
    type: "LOGIN_USER_ERROR",
    error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expireDate");
  localStorage.removeItem("refreshToken");
  return {
    type: "LOGOUT",
  };
};
export const autoLogoutAfterMillisec = (ms) => {
  return function (dispatch) {
    // https://securetoken.googleapis.com/v1/token?key=[API_KEY]
    // axios
    //   .post(
    //     "https://securetoken.googleapis.com/v1/token?key=AIzaSyCEcdsNuBBM85l0lm4ft7UGyuV_M0ktpvM",
    //     {
    //       grant_type: "refresh_token",
    //       refresh_token: localStorage.getItem("refreshToken"),
    //     }
    //   )
    //   .then((result) => {
    //     // localStorage  луу хадгална
    //     const token = result.data.id_token;
    //     const userId = result.data.user_id;

    //     localStorage.setItem("token", token);
    //     localStorage.setItem("userId", userId);
    //     localStorage.setItem("refreshToken", refreshToken);
    //     localStorage.setItem("expireDate", expireDate);

    //     dispatch(loginSuccess(token, userId));
    //   })
    //   .catch((error) => {
    //     dispatch(loginError(error));
    //   });

    setTimeout(() => {
      dispatch(logout());
    }, ms);
  };
};
