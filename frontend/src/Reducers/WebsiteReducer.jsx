import { 
    FETCH_HEADERS_REQUEST,
    FETCH_HEADERS_SUCCESS,
    FETCH_HEADERS_FAILURE,
    
    FETCH_ABOUT_REQUEST,
    FETCH_ABOUT_SUCCESS,
    FETCH_ABOUT_FAILURE,

    FETCH_SOCIAL_REQUEST,
    FETCH_SOCIAL_SUCCESS,
    FETCH_SOCIAL_FAILURE,

    FETCH_CONTACT_REQUEST,
    FETCH_CONTACT_SUCCESS,
    FETCH_CONTACT_FAILURE,
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

export const aboutReducer = (state = {abouts:[]}, action = {}) => {
    
    switch (action.type) {
        case FETCH_ABOUT_REQUEST:
            return { 
                ...state,
                loading: true,
            };
        case FETCH_ABOUT_SUCCESS:
            return {
                loading: false, 
                abouts: action.payload,
            };
        case FETCH_ABOUT_FAILURE:
            return {
                loading: false,
                abouts: [],
                error: action.payload ,
            };
        default:
            return state;
    }
};

export const socialReducer = (state = {socials:[]}, action = {}) => {
    
    switch (action.type) {
        case FETCH_SOCIAL_REQUEST:
            return { 
                ...state,
                loading: true,
            };
        case FETCH_SOCIAL_SUCCESS:
            return {
                loading: false, 
                socials: action.payload,
            };
        case FETCH_SOCIAL_FAILURE:
            return {
                loading: false,
                socials: [],
                error: action.payload ,
            };
        default:
            return state;
    }
};


export const contactReducer = (state = {contacts:[]}, action = {}) => {
    
    switch (action.type) {
        case FETCH_CONTACT_REQUEST:
            return { 
                ...state,
                loading: true,
            };
        case FETCH_CONTACT_SUCCESS:
            return {
                loading: false, 
                contacts: action.payload,
            };
        case FETCH_CONTACT_FAILURE:
            return {
                loading: false,
                contacts: [],
                error: action.payload ,
            };
        default:
            return state;
    }
};
