export const GET_USER = "GET_USER";
export const UPDATE_USER = "UPDATE_USER";
export const REMOVE_USER = "REMOVE_USER";

export const removeUser = () => {
  return {
    type: REMOVE_USER
  };
};
export const updateUser = data => {
  return {
    type: UPDATE_USER,
    payload: {
      user: data
    }
  };
};
export const getUser = data => {
  return {
    type: GET_USER,
    payload: {
      user: {
        GivenName: data.GivenName,
        Name: data.Name,
        Id: data.Id,
        Photo: data.Photo
      }
    }
  };
};
export const fetchUser = authToken => {
  return dispatch => {
    return fetch(`https://delfinkitrainingapi.azurewebsites.net/api/user`, {
      method: "GET",
      headers: {
        "X-ZUMO-AUTH": authToken
      }
    })
      .then(r => r.json())
      .then(resp => {
        return dispatch(getUser(resp));
      });
  };
};
export const fetchUpdatedUser = (authToken, user, photo) => {
  let formData = new FormData();
  if (photo) {
    formData.append("photo", photo);
  }
  formData.append("user", JSON.stringify(user));
  return dispatch => {
    return fetch(`https://delfinkitrainingapi.azurewebsites.net/api/user`, {
      method: "PUT",
      headers: {
        "X-ZUMO-AUTH": authToken
      },
      body: formData
    })
      .then(response => response.json())
      .then(r => {
        console.log(r);
        return dispatch(updateUser(r));
      });
  };
};
export const fetchRemoveUser = authToken => dispatch => {
  fetch(`https://delfinkitrainingapi.azurewebsites.net/api/user`, {
    method: "DELETE",
    headers: {
      "X-ZUMO-AUTH": authToken
    }
  });
  return dispatch(removeUser());
};

