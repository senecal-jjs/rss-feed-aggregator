import { useEffect } from "react";
import { getFeeds } from "../actions/feed-actions";
import feedReducer from "../reducers/feedReducer";

const useFeed = () => {
    const [state, dispatch] = useReducer(feedReducer, {
        isLoading: false,
        isError: false,
        data: {}
    });

    useEffect(() => {
        let didCancel = false;

        dispatch(feedActions.)
    })
}