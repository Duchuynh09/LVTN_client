import { FETCH_POSTS, FETCH_POST } from "./constains";

export const fetchPost = (payload) => ({ type: FETCH_POST, payload });
export const fetchPosts = (payload) => ({ type: FETCH_POSTS, payload });
