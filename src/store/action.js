import { FETCH_POSTS, FETCH_POST, SORT_SAMPLE_DATA } from "./constains";

export const fetchPost = (payload) => ({ type: FETCH_POST, payload });
export const fetchPosts = (payload) => ({ type: FETCH_POSTS, payload });
export const sortSampleData = (payload) => ({
  type: SORT_SAMPLE_DATA,
  payload,
});
