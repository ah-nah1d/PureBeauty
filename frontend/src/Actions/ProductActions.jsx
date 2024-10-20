import axios from 'axios';
import { 
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL
} from '../Constants/ProductConstants';

export const listCategories = () => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_LIST_REQUEST });

        const { data } = await axios.get('http://127.0.0.1:8000/api/products/categories/');

        dispatch({
            type: CATEGORY_LIST_SUCCESS,
            payload: data.categories,
        });
    } catch (error) {
        dispatch({
            type: CATEGORY_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};
