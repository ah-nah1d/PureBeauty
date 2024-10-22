import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



import Home from './Screens/Public/Home';
import Login from './Screens/Public/Login';
import Register from './Screens/Public/Register';
import Category from './Screens/Public/Category'
import ProductList from './Screens/Public/ProductList'


function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home/>} exact/>
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Register/>} />
                <Route path='/products' element={<ProductList />} />
                <Route path='/product/:slug' element={<Category />} />
            </Routes>
        </Router>
    );
}

export default App;
