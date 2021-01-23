import { ajaxGet } from "./ajax";

export const GET_FEED = "GET_FEED";

const FEED_CONTEXT = "/api/v1/feeds/get-feeds";

export const getFeeds = (dispatch) => {
    console.log("get feeds called")
    ajaxGet(GET_FEED, dispatch, FEED_CONTEXT);
}