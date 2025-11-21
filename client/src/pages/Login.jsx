import React, { useContext, useState } from 'react'
import assets from '../assets/assets.js'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/App.Context.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

  const navigate = useNavigate()

  axios.defaults.withCredentials = true;


  const { BackendUrl, setIsLogin, getUserData } = useContext(AppContext)

  const [state, setState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (state === 'Sign Up') {
        const { data } = await axios.post(BackendUrl + '/api/user/register', { name, email, password });

        if (data.success) {
          setIsLogin(true);
          getUserData();
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(BackendUrl + '/api/user/login', { email, password });

        if (data.success) {
          setIsLogin(true);
          getUserData();
          navigate('/');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };



  return (
    <div className='flex items-center justify-center min-h-screen px-6
     bg-linear-to-br from-blue-200 to-purple-400'>

      <img onClick={() => navigate('/')} src={assets.logo} alt="" className='absolute left-5 top-5 cursor-pointer w-20' />

      <div className='bg-purple-400 p-10 rounded-lg shadow-lg w-full sm:w-96
      text-amber-50 text-sm'>

        <h2 className='text-4xl font-semibold text-center mb-5'>{state === 'Sign Up' ? 'Create Account' : 'Login  '}</h2>

        <p className='text-center text-sm mb-6'>{state === 'Sign Up' ? 'Create your Account' : 'Login Your account'}</p>

        <form onSubmit={handleSubmit}>

          {state === 'Sign Up' && (
            <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5
          rounded-full bg-amber-50 text-black'>

              <img src={assets.user} alt="" className='w-4' />
              <input onChange={e => setName(e.target.value)} className='outline-none' type="text" value={name} placeholder='USERNAME' />
            </div>
          )}

          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5
          rounded-full bg-amber-50 text-black'>

            <img src={assets.email} alt="" className='w-4' />
            <input onChange={e => setEmail(e.target.value)} className='outline-none' type="email" value={email} placeholder='EMAIL' />
          </div>

          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5
          rounded-full bg-amber-50 text-black'>

            <img src={assets.password} alt="" className='w-4' />
            <input onChange={e => setPassword(e.target.value)} className='outline-none' type="password" value={password} placeholder='PASSWORD' />
          </div>
          <button type='submit' className='w-full py-3 rounded-full bg-purple-950 font-medium text-[20px] cursor-pointer'>{state}</button>

        </form>

        {state === 'Sign Up' ? (<p className='text-center mt-3'>You have already have an Account?{' '}
          <span onClick={() => setState('Login')} className='cursor-pointer text-purple-600 underline'>Login Here</span>
        </p>
        ) : (<p className='text-center mt-3'>You don't have an Account{' '}
          <span onClick={() => setState('Sign Up')} className='cursor-pointer text-purple-600 underline'>Sign Up Here</span>
        </p>)}

      </div>
    </div>
  )
}

export default Login 