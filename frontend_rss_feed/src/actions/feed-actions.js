import { ajaxGet } from "./ajax";

export const FETCH = "FETCH";

const FEED_CONTEXT = "/api/v1/get-feeds";

export const getFeeds = () => async (dispatch) => {
    ajaxGet(FETCH, dispatch, FEED_CONTEXT);
}