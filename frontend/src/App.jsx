import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Screens/Public/Home';
import Login from './Screens/Public/Login';
import Register from './Screens/Public/Register';
import ProductByCategory from './Screens/Public/ProductByCategory'
import ProductList from './Screens/Public/ProductList'
import Product from './Screens/Public/Product'
import Sale from './Screens/Public/Sale'
import Profile from './Screens/Public/Profile'
import Password from './Screens/Public/Password'
import ShippingAddress from './Screens/Public/ShippingAddress'
import Cart from './Screens/Public/Cart'


function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home/>} exact/>
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Register/>} />
                <Route path='/products' element={<ProductList />} />
                <Route path='/product/:slug' element={<Product />} />
                <Route path="/cart/:id?" element={<Cart />} />
                <Route path='/category/:id/:name' element={<ProductByCategory />} />
                <Route path='/sale' element={<Sale />} />
                <Route path='/profile' element={<Profile/>} />
                <Route path='/password' element={<Password/>} />
                
                <Route path='/shipping-address' element={<ShippingAddress/>} />
            </Routes>
        </Router>
    );
}

export default App;
