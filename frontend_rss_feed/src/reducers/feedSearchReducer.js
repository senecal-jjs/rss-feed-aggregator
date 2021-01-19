import { REQUEST, SUCCESS, FAILURE } from "../actions/http-actions";
import { SUBMIT_FEED_SEARCH } from "../actions/feed-search-actions";

const feedSearchReducer = (state, action) => {
    switch(action.type) {
        case `${SUBMIT_FEED_SEARCH}_${REQUEST}`:
            return {...state, isLoading: true, isError: false};
        case `${SUBMIT_FEED_SEARCH}_${SUCCESS}`:
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            };
        case `${SUBMIT_FEED_SEARCH}_${FAILURE}`:
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        default:
            return {...state, isLoading: false, isError: false};
    }
}

export default feedSearchReducer;