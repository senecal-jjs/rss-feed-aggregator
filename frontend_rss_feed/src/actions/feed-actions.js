import { ajaxGet } from "./ajax";

export const GET_FEED = "GET_FEED";
export const EXPLORE_FEED = "EXPLORE_FEED";

const FEED_CONTEXT = "/api/v1/feeds/get-feeds";
const EXPLORE_FEED_CONTEXT = "api/v1/feeds/explore-feed"

export const getFeeds = (dispatch) => {
    ajaxGet(GET_FEED, dispatch, FEED_CONTEXT);
}

export const exploreFeed = (dispatch, channelId) => {
    ajaxGet(EXPLORE_FEED, dispatch, `${EXPLORE_FEED_CONTEXT}/${channelId}`);
}