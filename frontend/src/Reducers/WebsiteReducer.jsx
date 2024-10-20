import { 
    FETCH_HEADERS_REQUEST,
    FETCH_HEADERS_SUCCESS,
    FETCH_HEADERS_FAILURE,
} from '../Constants/WebsiteConstants';

export const headerReducer = (state = {headers:[]}, action = {}) => {
    
    switch (action.type) {
        case FETCH_HEADERS_REQUEST:
            return { 
                ...state,
                loading: true,
            };
        case FETCH_HEADERS_SUCCESS:
            return {
                loading: false, 
                headers: action.payload,
            };
        case FETCH_HEADERS_FAILURE:
            return {
                loading: false,
                headers: [],
                error: action.payload ,
            };
        default:
            return state;
    }
};
