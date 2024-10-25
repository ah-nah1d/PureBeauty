import { legacy_createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import {
    headerReducer,
    aboutReducer,
    socialReducer,
    contactReducer,
} from './Reducers/WebsiteReducer'
import {  
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
} from './Reducers/UserReducer'
import {  
    CategoryListReducer,
    FeaturedItemsReducer,
    productListReducer,
    productDetailsReducer,
    productReviewCreateReducer,
} from './Reducers/ProductReducer'
import { cartReducer } from './Reducers/CartReducer'


const reducer=combineReducers({
    header: headerReducer,
    about: aboutReducer,
    social: socialReducer,
    contact:contactReducer,

    cart:cartReducer,

    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,

    categoryList:CategoryListReducer,
    featuredItems:FeaturedItemsReducer,
    productList:productListReducer,
    productDetails:productDetailsReducer,
    productReviewCreate:productReviewCreateReducer,
    
})

const cartItemFromStorage =localStorage.getItem('cartItems')?
    JSON.parse(localStorage.getItem('cartItems')):[]

const userInfoFromStorage =localStorage.getItem('userInfo')?
    JSON.parse(localStorage.getItem('userInfo')):null

    
const initialState = {
    cart:{
        cartItems:cartItemFromStorage,
    },
    userLogin:{userInfo:userInfoFromStorage},
};

const middleware = [thunk];
const store = legacy_createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store;
