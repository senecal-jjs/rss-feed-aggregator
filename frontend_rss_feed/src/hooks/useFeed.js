import { useEffect, useReducer } from "react";
import { getFeeds } from "../actions/feed-actions";
import feedReducer from "../reducers/feedReducer";

const useFeed = () => {
    const [state, dispatch] = useReducer(feedReducer, {
        isLoading: false,
        isError: false,
        data: { feeds: [] }
    });

    useEffect(() => {
        let didCancel = false;

        dispatch(getFeeds())
    }, [dispatch]);

    return state
}

export default useFeed;