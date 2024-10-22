import axios from 'axios';
import { 
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL,

    FEATURED_ITEMS_REQUEST,
    FEATURED_ITEMS_SUCCESS,
    FEATURED_ITEMS_FAIL,

    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
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


export const FeaturedItems = () => async (dispatch) => {
    try {
        dispatch({ type:FEATURED_ITEMS_REQUEST });

        const { data } = await axios.get('http://127.0.0.1:8000/api/products/featured-items/');

        dispatch({
            type:FEATURED_ITEMS_SUCCESS,
            payload: data.featuredItem,
        });
    } catch (error) {
        dispatch({
            type:FEATURED_ITEMS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const listProducts = (keyword='',page=1) =>async(dispatch)=>{
    try{
        dispatch({type:PRODUCT_LIST_REQUEST})
        const {data} =await axios.get(`http://127.0.0.1:8000/api/products/?keyword=${keyword}&page=${page}`)
        dispatch({
            type:PRODUCT_LIST_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type:PRODUCT_LIST_FAIL,
            payload:error.response && error.response.data.detail?error.response.data.detail:error.message,
        })
    }
}