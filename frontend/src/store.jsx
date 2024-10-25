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

import { 
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderListMyReducer,
    orderListReducer,
    orderDeliverReducer,
} from './Reducers/OrderReducer'


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


    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    orderListMy:orderListMyReducer,
    orderList:orderListReducer,
    orderDeliver:orderDeliverReducer,
    
})

const cartItemFromStorage =localStorage.getItem('cartItems')?
    JSON.parse(localStorage.getItem('cartItems')):[]

const userInfoFromStorage =localStorage.getItem('userInfo')?
    JSON.parse(localStorage.getItem('userInfo')):null

const shippingAddressFromStorage =localStorage.getItem('shippingAddress')?
    JSON.parse(localStorage.getItem('shippingAddress')):{}
    
const initialState = {
    cart:{
        cartItems:cartItemFromStorage,
        shippingAddress:shippingAddressFromStorage,
    },
    userLogin:{userInfo:userInfoFromStorage},
};

const middleware = [thunk];
const store = legacy_createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store;
