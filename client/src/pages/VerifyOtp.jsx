import React, { useContext, useEffect } from 'react'
import assets from '../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AppContext } from '../context/App.Context'
import { useNavigate } from 'react-router-dom'

const VerifyOtp = () => {

  axios.defaults.withCredentials = true;

  const { BackendUrl, getUserData, isLogin, userData } = useContext(AppContext)

  const navigate = useNavigate()

  const inputRefs = React.useRef([])

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus()
    }
  }
  const handleDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }
  const handlePaste = (e) => {
    const paste = e.clipBoardData.getData('text')
    const pasteArray = paste.split('')
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char
      }
    })
  }

  const submitHandler = async (e) => {

    e.preventDefault()
    try {

      const otpArray = inputRefs.current.map(e => e.value)
      const otp = otpArray.join('')

      const { data } = await axios.post(BackendUrl + '/api/user/verify-email', { otp })

      if (data.success) {
        toast.success(data.message)
        getUserData()
        navigate('/')
      } else {
        toast.error(data.message)
      }

    } catch (error) {

      toast.error(error.message)

    }
  }

  useEffect(() => {
    isLogin && userData && userData.isVerified && navigate('/')
  }, [isLogin, userData])

  return (
    <div className='flex items-center justify-center min-h-screen
     bg-linear-to-br from-blue-200 to-purple-400'>

      <img onClick={() => navigate('/')} src={assets.logo} alt="" className='absolute left-5 top-5 cursor-pointer w-20' />

      <form onSubmit={submitHandler} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Email Verify OTP</h1>
        <p className='text-center mb-6 text-indigo-300'>Enter the 6 Digit Code in your Mail ID</p>

        <div className='flex justify-between mb-8' onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index) => (
            <input type="text" maxLength='1' key={index} required
              ref={e => inputRefs.current[index] = e}
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleDown(e, index)}
              className='w-12 h-12 bg-amber-400 text-white text-center text-xl rounded-md' />
          ))}
        </div>

        <button className='w-full py-3 text-white bg-linear-to-r from-indigo-500 to-indigo-900 rounded-full cursor-pointer '>Verify Email</button>
      </form>
    </div>
  )
}

export default VerifyOtp