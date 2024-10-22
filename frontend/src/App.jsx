import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



import Home from './Screens/Public/Home';
import Login from './Screens/Public/Login';
import Register from './Screens/Public/Register';
import ProductByCategory from './Screens/Public/ProductByCategory'
import ProductList from './Screens/Public/ProductList'
import Sale from './Screens/Public/Sale'


function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home/>} exact/>
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Register/>} />
                <Route path='/products' element={<ProductList />} />
                <Route path='/category/:id/:name' element={<ProductByCategory />} />
                <Route path='/sale' element={<Sale />} />
                {/* <Route path='/product/:slug' element={<ProductByCategory />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
