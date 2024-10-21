
import axios from 'axios';

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
} from '../Constants/WebsiteConstants'

export const fetchHeaders = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_HEADERS_REQUEST });

        const {data} = await axios.get('http://127.0.0.1:8000/api/website/headers/');
        dispatch({ 
            
            type: FETCH_HEADERS_SUCCESS, 
            payload: data
        });
    } catch (error) {

        dispatch({
            
            type:FETCH_HEADERS_FAILURE,
            payload:error.response
            && error.response.data.detail
            ? error.response.data.detail:error.message,
        })
    }
};

export const fetchAbout = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_ABOUT_REQUEST });

        const {data} = await axios.get('http://127.0.0.1:8000/api/website/about/');
        dispatch({ 
            
            type: FETCH_ABOUT_SUCCESS, 
            payload: data
        });
    } catch (error) {

        dispatch({
            
            type:FETCH_ABOUT_FAILURE,
            payload:error.response
            && error.response.data.detail
            ? error.response.data.detail:error.message,
        })
    }
};

export const fetchSocial = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_SOCIAL_REQUEST });

        const {data} = await axios.get('http://127.0.0.1:8000/api/website/social/');
        dispatch({ 
            
            type: FETCH_SOCIAL_SUCCESS, 
            payload: data
        });
    } catch (error) {

        dispatch({
            type:FETCH_SOCIAL_FAILURE,
            payload:error.response
            && error.response.data.detail
            ? error.response.data.detail:error.message,
        })
    }
};



export const fetchContact = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_CONTACT_REQUEST });

        const {data} = await axios.get('http://127.0.0.1:8000/api/website/contact/');
        dispatch({ 
            
            type: FETCH_CONTACT_SUCCESS, 
            payload: data
        });
    } catch (error) {

        dispatch({
            type:FETCH_CONTACT_FAILURE,
            payload:error.response
            && error.response.data.detail
            ? error.response.data.detail:error.message,
        })
    }
};
