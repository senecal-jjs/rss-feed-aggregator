import { ajaxGet } from "./ajax";

const FETCH = "FETCH";

const FEED_CONTEXT = "/get-feeds";

export const getFeeds = () => async (dispatch) => {
    ajaxGet(FETCH, dispatch, FEED_CONTEXT);
}