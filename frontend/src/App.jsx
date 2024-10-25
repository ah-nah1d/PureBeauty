import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Screens/Home';
import Login from './Screens/Login';
import Register from './Screens/Register';
import ProductByCategory from './Screens/ProductByCategory'
import ProductList from './Screens/ProductList'
import Product from './Screens/Product'
import Sale from './Screens/Sale'
import Profile from './Screens/Profile'
import Password from './Screens/Password'
import ShippingAddress from './Screens/ShippingAddress'
import Cart from './Screens/Cart'
import Shipping from './Screens/Shipping'
import PaymentScreen from './Screens/Payment';


function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home/>} exact/>
                <Route path='/login' element={<Login/>} />
                <Route path='/gister' element={<Register/>} />
                <Route path='/products' element={<ProductList />} />
                <Route path='/product/:slug' element={<Product />} />
                <Route path="/cart/:id?" element={<Cart />} />
                <Route path='/category/:id/:name' element={<ProductByCategory />} />
                <Route path='/payment' element={<PaymentScreen />} />
                <Route path='/sale' element={<Sale />} />
                <Route path='/profile' element={<Profile/>} />
                <Route path='/password' element={<Password/>} />
                <Route path='/shipping' element={<Shipping/>} />
                <Route path='/shipping-address' element={<ShippingAddress/>} />
            </Routes>
        </Router>
    );
}

export default App;
