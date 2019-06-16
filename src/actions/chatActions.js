export const SET_CHATKIT_USER = "SET_CHATKIT_USER";
export const ADD_NEW_MESSAGES = "GET_NEW_MESSAGES";
export const SET_ROOMS = "SET_ROOMS";
export const SET_CURRENT_ROOM = "SET_CURRENT_ROOM";
export const GET_MESSAGES_FROM_ROOM = "GET_MESSAGES_FROM_ROOM";

export const setChatkitUser = currentUser => ({
  type: SET_CHATKIT_USER,
  payload: {
    chatkitCurrentUser: currentUser
  }
});

export const addNewMessages = messages => ({
  type: ADD_NEW_MESSAGES,
  payload: {
    messages: messages
  }
});
export const setRooms = rooms => ({
  type: SET_ROOMS,
  payload: {
    rooms: rooms
  }
});
export const setCurrentRoom = room => ({
  type: SET_CURRENT_ROOM,
  payload: {
    currentRoom: room
  }
});
export const getMessagesFromRoom = messages => ({
  type: GET_MESSAGES_FROM_ROOM,
  payload: {
    messages: messages
  }
});
