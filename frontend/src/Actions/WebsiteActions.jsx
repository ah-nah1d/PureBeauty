
import axios from 'axios';

import { 
    FETCH_HEADERS_REQUEST,
    FETCH_HEADERS_SUCCESS,
    FETCH_HEADERS_FAILURE,
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
