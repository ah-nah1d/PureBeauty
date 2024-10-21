import React,{useState,useEffect} from 'react'
import { Link,useNavigate,useLocation } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux'



import { register } from '../../Actions/UserActions'

import NavBar from '../../Component/NavBar'
import Footer from '../../Component/Footer'
import Loader from '../../Component/Loader'
import Message from '../../Component/Message'

function Register() {
    const [name,setName] =useState('')
    const [email,setEmail] =useState('')
    const [password,setPassword] =useState('')
    const [confirmPassword,setConfirmPassword] =useState('')
    const [message,setMessage] =useState('')
    const dispatch =useDispatch()
    const navigate =useNavigate()
    const location =useLocation()
    const redirect = new URLSearchParams(location.search).get('redirect')||'/';
    const userLogin =useSelector(state=>state.userLogin)
    const {loading,error,userInfo} =userLogin

    useEffect(()=>{
        if (userInfo){
            navigate(redirect)
        }
    },[navigate,userInfo,redirect])
    const submitHandler= (e) =>{
        e.preventDefault()
        if (password!=confirmPassword){
            setMessage('Passwords do not match')
        }else {
            dispatch(register(name,email,password))
        }
    }
    return (
        <div className="h-screen flex flex-col">
            <div className="h-[15%]">
                <NavBar />
            </div>
            <div className="flex mt-2 flex-col items-center justify-center space-y-6">
                <p className="text-4xl font-bold text-black">Sign Up</p>
                <form className="w-full max-w-md">
                <div className="my-5">
                    <label
                        htmlFor="Name"
                        className="block mb-2 text-sm font-medium text-black"
                    >
                    Name
                    </label>
                    <input
                        type="text"
                        id="Name"
                        className="w-full border border-gray-400 text-sm rounded-lg block p-3"
                        placeholder="Enter Your Name"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        required
                    />
                </div>
                <div className="my-5">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-black"
                    >
                    Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-full border border-gray-400 text-sm rounded-lg block p-3"
                        placeholder="Enter Your Email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="my-5">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-black"
                    >
                    Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full border border-gray-400 text-sm rounded-lg block p-3"
                        placeholder="Enter Your Password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="my-5">
                    <label
                        htmlFor="confirmPassword"
                        className="block mb-2 text-sm font-medium text-black"
                    >
                    Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="w-full border border-gray-400 text-sm rounded-lg block p-3"
                        placeholder="Enter Your Password Again"
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                {message && <Message variant='error'>{message}</Message>}
                <div className="flex justify-center">
                    <button onClick={submitHandler} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg bg-gradient-to-br from-gray-600 to-black hover:text-gray-300">
                    <span className="relative px-5 py-2.5 transition-all bg-black rounded-md hover:bg-opacity-0">
                        Register
                    </span>
                    </button>
                </div>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-gray-700">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-500 font-semibold hover:underline">
                        Click here to login
                        </Link>
                    </p>
                </div>
            </div>
            <Footer/>
            </div>
    )
}

export default Register