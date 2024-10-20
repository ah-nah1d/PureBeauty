import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



import Home from './Screens/Public/Home';
import Login from './Screens/Public/Login';
import Register from './Screens/Public/Register';


function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home/>} exact/>
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Register/>} />
            </Routes>
        </Router>
    );
}

export default App;
