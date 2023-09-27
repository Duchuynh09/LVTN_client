import { FETCH_POSTS, FETCH_POST } from "./constains";
export const initState = {
  posts: [],
  post: {},
};
function reducer(state, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case FETCH_POST:
      return {
        ...state,
        post: action.payload,
      };
    default:
      throw new Error("Invalid action");
  }
}
export default reducer;
