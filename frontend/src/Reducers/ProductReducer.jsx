
import { 
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL,

    FEATURED_ITEMS_REQUEST,
    FEATURED_ITEMS_SUCCESS,
    FEATURED_ITEMS_FAIL,


} from '../Constants/ProductConstants'

export const CategoryListReducer = (state = { categories: [] }, action) => {
    switch (action.type) {
        case CATEGORY_LIST_REQUEST:
            return { loading: true, categories: [] };
        case CATEGORY_LIST_SUCCESS:
            return { loading: false, categories: action.payload };
        case CATEGORY_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const FeaturedItemsReducer = (state = { featuredItem: {featured_homes: [],featured_categories: []} }, action) => {
    switch (action.type) {
        case FEATURED_ITEMS_REQUEST:
            return {...state, loading: true };
        case FEATURED_ITEMS_SUCCESS:
            return { loading: false, featuredItem: action.payload };
        case FEATURED_ITEMS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const productListReducer = (state={products:[]},action)=>{
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return{loading:true,products:[]}
        case PRODUCT_LIST_SUCCESS:
            return{
                loading:false,
                products:action.payload.products,
                page:action.payload.page,
                pages:action.payload.pages,
            }
        case PRODUCT_LIST_FAIL:
            return{loading:false,error:action.payload}
        default:
            return state
    }
}