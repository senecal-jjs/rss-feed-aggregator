import { ajaxGet } from "./ajax";

export const GET_FEED = "GET_FEED";

const FEED_CONTEXT = "/api/v1/get-feeds";

export const getFeeds = () => async (dispatch) => {
    ajaxGet(GET_FEED, dispatch, FEED_CONTEXT);
}