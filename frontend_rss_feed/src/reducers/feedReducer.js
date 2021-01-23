import { REQUEST, SUCCESS, FAILURE } from "../actions/http-actions";
import { GET_FEED } from "../actions/feed-actions";

const feedReducer = (state, action) => {
    switch(action.type) {
        case `${GET_FEED}_${REQUEST}`:
            return {...state, isLoading: true, isError: false};
        case `${GET_FEED}_${SUCCESS}`:
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            };
        case `${GET_FEED}_${FAILURE}`:
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        default:
            return {...state, isLoading: false, isError: false};
    }
}

export default feedReducer;

