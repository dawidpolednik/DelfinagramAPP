import { LOG_IN, LOG_OUT } from "../actions/loginActions";
import { GET_USER, UPDATE_USER, REMOVE_USER } from "../actions/userActions";
import {
  ADD_POST,
  GET_POSTS,
  DELETE_POST,
  EDIT_POST,
  SEARCH_POST
} from "../actions/postActions";
import {
  SEARCH_FRIEND,
  GET_FRIENDS,
  ADD_FRIEND,
  DELETE_FRIEND,
  GET_POSTS_FRIENDS,
  SET_USER_PROFILE_INFO,
  GET_OTHER_USER_POSTS,
  TOGGLE_SHOW_USER_POSTS
} from "../actions/friendActions";
import {
  SET_CHATKIT_USER,
  ADD_NEW_MESSAGES,
  SET_ROOMS,
  SET_CURRENT_ROOM,
  GET_MESSAGES_FROM_ROOM
} from "../actions/chatActions";

const ifTextContainFilter = (data, query) =>
  data ? data.toLowerCase().includes(query) : null;

const filterPosts = (data, filter) =>
  data && data.length > 0 && filter && filter.length > 0
    ? data.filter(post => {
        return (
          ifTextContainFilter(post.Title, filter) ||
          ifTextContainFilter(post.Text, filter)
        );
      })
    : data;
const extractFriendPosts = data =>
  data && data.length > 0
    ? data
        .map(element =>
          element.Posts.map(post => {
            post.Friend = element.Friend;
            return post;
          })
        )
        .reduce((previousValue, currentValue) => {
          return previousValue.concat(currentValue);
        })
    : null;

const reducer = (
  state = { authToken: null, posts: [], allFriends: [] },
  action
) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        authToken: action.payload.authToken
      };
    case LOG_OUT:
      return { ...state, authToken: null, user: null };
    case GET_USER:
      return {
        ...state,
        user: action.payload.user
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload.post, ...state.posts]
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        allPosts: action.payload.posts
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(
          onePost => onePost.Id !== action.payload.postToDel.Id
        )
      };
    case EDIT_POST:
      return {
        ...state,
        posts: state.posts.map(onePost =>
          onePost.Id === action.payload.editedPost.Id
            ? action.payload.editedPost
            : onePost
        )
      };
    case SEARCH_POST:
      return {
        ...state,
        posts: filterPosts(state.allPosts, action.payload.value),
        postsFriends: filterPosts(state.allPostsFriends, action.payload.value)
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload.user
      };
    case REMOVE_USER:
      return {
        state: null
      };
    case GET_FRIENDS:
      return {
        ...state,
        allFriends: action.payload.friends
      };
    case ADD_FRIEND:
      return {
        ...state,
        allFriends: [action.payload.friend, ...state.allFriends]
      };
    case SEARCH_FRIEND:
      return {
        ...state,
        matchingFriends: action.payload.matchingFriends
      };

    case DELETE_FRIEND:
      return {
        ...state,
        allFriends: state.allFriends.filter(
          friend => friend.Id !== action.payload.friendToDel.Id
        )
      };
    case GET_POSTS_FRIENDS:
      return {
        ...state,
        postsFriends: extractFriendPosts(action.payload.postsFriends),
        allPostsFriends: extractFriendPosts(action.payload.postsFriends)
      };
    case SET_USER_PROFILE_INFO:
      return {
        ...state,
        userProfileInfo: action.payload.userProfileInfo
      };
    case GET_OTHER_USER_POSTS:
      return {
        ...state,
        otherUserPosts: action.payload.otherUserPosts
      };
    case TOGGLE_SHOW_USER_POSTS:
      return {
        ...state,
        allFriends: state.allFriends.map(element => {
          return element.Id === action.payload.modifiedFriendData.Id
            ? action.payload.modifiedFriendData
            : element;
        })
      };
    case SET_CHATKIT_USER:
      return {
        ...state,
        chatkitCurrentUser: action.payload.chatkitCurrentUser
      };
    case ADD_NEW_MESSAGES:
      return {
        ...state,
        messages: action.payload.messages
      };
    case SET_ROOMS:
      return {
        ...state,
        rooms: action.payload.rooms
      };
    case SET_CURRENT_ROOM:
      return {
        ...state,
        currentRoom: action.payload.currentRoom
      };
    case GET_MESSAGES_FROM_ROOM:
      return {
        ...state,
        messages: [...state.messages, action.payload.messages]
      };
    default:
      return state;
  }
};
export default reducer;
