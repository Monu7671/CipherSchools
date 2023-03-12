import React, { useContext, useState } from 'react'
import { AppContext } from '../providers/AppProvider'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
const SignInModal = () => {
    const { showSignInModal, setShowSignInModal, userData, setUserData } = useContext(AppContext)

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [isSignup, setIsSignup] = useState(false)

    const signUpHandler = async () => {
        if (!email || !password || !name) return alert('Fill all details')
        try {
            const res = await axios.post(BASE_URL + 'user/create', { name, email, password })
            if (res.status == 200) {
                setUserData(res.data)
                setShowSignInModal(false)
            }
        } catch (error) {
            console.log(error)
            alert("Couldn't sign up")
        }

    }

    const signInHandler = async () => {
        if (!email || !password) return alert('Fill all details')
        try {
            const res = await axios.post(BASE_URL + 'user/login', { email, password })
            if (res.status == 200) {
                setUserData(res.data)
                setShowSignInModal(false)
            } else if (res.status == 400) {
                alert('Invalid credentials')
            }
        } catch (error) {
            console.log(error)
            alert("Couldn't signin")
        }
    }

    return (
        <>

            <div className=" flex py-12 bg-gray-500/50  transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
                <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                    <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">

                        <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">{isSignup ? 'Sign Up' : "Sign In"}</h1>
                        {isSignup && <>
                            <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Name</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} id="name" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Type your name here" />
                        </>}
                        <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} id="name" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="email" />
                        <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">password</label>
                        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} id="name" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="password" />


                        <div className="flex items-center justify-start w-full">
                            <button onClick={() => { isSignup ? signUpHandler() : signInHandler() }} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm">Submit</button>
                            <button onClick={() => setShowSignInModal(false)} className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm" onclick="modalHandler()">Cancel</button>
                        </div>
                        {isSignup ? <p className='mt-5 text-slate-600 text-xs' >Already registered? <span className='text-blue-600 cursor-pointer' onClick={() => setIsSignup(!isSignup)} >Sign In</span></p>
                            : <p className='mt-5 text-slate-600 text-xs' >New User? <span className='text-blue-600 cursor-pointer' onClick={() => setIsSignup(!isSignup)} >Sign Up</span></p>}
                    </div>
                </div>
            </div>

        </>
    )
}

export default SignInModal