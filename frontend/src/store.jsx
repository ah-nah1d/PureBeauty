import { legacy_createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import {
    headerReducer
} from './Reducers/WebsiteReducer'
import {  
    userLoginReducer,
    userRegisterReducer,
} from './Reducers/UserReducer'
import {  
    CategoryListReducer
} from './Reducers/ProductReducer'


const reducer=combineReducers({
    header: headerReducer,

    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,

    CategoryList:CategoryListReducer,
})

const userInfoFromStorage =localStorage.getItem('userInfo')?
    JSON.parse(localStorage.getItem('userInfo')):null

const initialState = {

    userLogin:{userInfo:userInfoFromStorage},
};

const middleware = [thunk];
const store = legacy_createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store;
