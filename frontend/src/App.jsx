import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Header from './Component/Header'
import NavBar from './Component/NavBar'

import Home from './Screens/Public/Home';


function App() {
    return (
        <Router>
        <Header/>
        <NavBar/>

        <main className='py-3'>
            <Routes>
                <Route path='/' element={<Home/>} exact/>
            </Routes>
        </main>
        </Router>
    );
}

export default App;
