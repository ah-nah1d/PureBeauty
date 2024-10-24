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


    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
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


export const listProductDetails = (id) =>async(dispatch)=>{
    try{
        dispatch({type:PRODUCT_DETAILS_REQUEST})
        const {data} =await axios.get(`http://127.0.0.1:8000/api/products/${id}/`)
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response && error.response.data.detail?error.response.data.detail:error.message,
        })
    }
}


export const createProductReview = (productId,review) =>async(dispatch,getState)=>{
    try{
        dispatch({type:PRODUCT_CREATE_REVIEW_REQUEST})

        const {
            userLogin:{userInfo},
        }=getState()

        const config ={
            headers:{
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} =await axios.post(
            `http://127.0.0.1:8000/api/products/${productId}/reviews/`,
            review,
            config
        )
        dispatch({
            type:PRODUCT_CREATE_REVIEW_SUCCESS,
            payload:data,
        })

    }catch(error){
        dispatch({
            type:PRODUCT_CREATE_REVIEW_FAIL,
            payload:error.response && error.response.data.detail?error.response.data.detail:error.message,
        })
    }
}
