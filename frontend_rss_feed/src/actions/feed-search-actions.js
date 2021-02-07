import { ajaxGet } from "./ajax";

export const SUBMIT_FEED_SEARCH = "SUBMIT_FEED_SEARCH";

const FEED_SEARCH_CONTEXT = "/api/v1/feeds/search-feeds";

export const submitFeedSearch = (dispatch, searchTerm) => {
    ajaxGet(SUBMIT_FEED_SEARCH, dispatch, `${FEED_SEARCH_CONTEXT}?searchTerm=${searchTerm}`)
}