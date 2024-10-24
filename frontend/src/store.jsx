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
} from './Reducers/ProductReducer'


const reducer=combineReducers({
    header: headerReducer,
    about: aboutReducer,
    social: socialReducer,
    contact:contactReducer,

    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,

    categoryList:CategoryListReducer,
    featuredItems:FeaturedItemsReducer,
    productList:productListReducer,
    
})

const userInfoFromStorage =localStorage.getItem('userInfo')?
    JSON.parse(localStorage.getItem('userInfo')):null

    
const initialState = {

    userLogin:{userInfo:userInfoFromStorage},
};

const middleware = [thunk];
const store = legacy_createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store;
