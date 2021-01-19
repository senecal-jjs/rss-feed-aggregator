import { ajaxGet } from "./ajax";

export const SUBMIT_FEED_SEARCH = "SUBMIT_FEED_SEARCH";

const FEED_SEARCH_CONTEXT = "/api/v1/search-feeds";

export const submitFeedSearch = (searchTerm) => async (dispatch) => {
    ajaxGet(SUBMIT_FEED_SEARCH, dispatch, `${FEED_SEARCH_CONTEXT}?searchTerm=${searchTerm}`)
}