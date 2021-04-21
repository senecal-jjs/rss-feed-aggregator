import { REQUEST, SUCCESS, FAILURE } from "../actions/http-actions";
import { EXPLORE_FEED } from "../actions/feed-actions";

const exploreFeedReducer = (state, action) => {
    switch(action.type) {
        case `${EXPLORE_FEED}_${REQUEST}`:
            return {...state, isLoading: true, isError: false};
        case `${EXPLORE_FEED}_${SUCCESS}`:
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            };
        case `${EXPLORE_FEED}_${FAILURE}`:
            return {
                ...state,
                isLoading: false, 
                isError: true,
            };
        default:
            return {...state, isLoading: false, isError: false};
    }
}

export default exploreFeedReducer;