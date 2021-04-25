import { useEffect, useReducer } from "react";
import { exploreFeed } from "../actions/feed-actions";
import exploreFeedReducer from "../reducers/exploreFeedReducer";

const useFeedExplore = (channelId) => {
    const [state, dispatch] = useReducer(exploreFeedReducer, {
        isLoading: false,
        isError: false,
        data: {}
    });

    useEffect(() => {
        exploreFeed(dispatch, channelId)
    }, [dispatch, channelId]);

    return state
}

export default useFeedExplore;