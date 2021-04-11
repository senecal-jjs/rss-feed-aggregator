import { useEffect, useReducer } from "react";
import { submitFeedSearch } from "../actions/feed-search-actions";
import feedSearchReducer from "../reducers/feedSearchReducer";

const useFeedSearch = (searchTerm) => {
    const [state, dispatch] = useReducer(feedSearchReducer, {
        isLoading: false,
        isError: false,
        data: {'feeds': []}
    });

    useEffect(() => {
        submitFeedSearch(dispatch, searchTerm)
    }, [dispatch, searchTerm]);

    return state
}

export default useFeedSearch;