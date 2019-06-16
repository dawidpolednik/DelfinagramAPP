export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";

export const logIn = data => ({
  type: LOG_IN,
  payload: {
    authToken: data.authenticationToken
  }
});

export const logOut = () => {
  return {
    type: LOG_OUT
  };
};

export const fetchAuthToken = data => {
  return dispatch => {
    return fetch(
      "https://delfinkitrainingapi.azurewebsites.net/.auth/login/google",
      {
        method: "POST",
        headers: { "content-type": "Application/JSON" },
        body: JSON.stringify({
          id_token: data.tokenId
        })
      }
    )
      .then(response => response.json())
      .then(resp => {
        sessionStorage.setItem("authToken", resp.authenticationToken);
        dispatch(logIn(resp));
      })
      .catch(err => {
        throw err;
      });
  };
};
