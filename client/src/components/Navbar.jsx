import React, { useContext } from 'react'
import assets from '../assets/assets.js'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/App.Context.jsx'

const Navbar = () => {

  const navigate = useNavigate()

  const { userData, BackendUrl, setUserData, setIsLogin } = useContext(AppContext)

  return (
    <div className='w-full h-[10vh] flex justify-between items-center p-4 absolute top-0px'>
      <img src={assets.logo} alt="" className='w-15' />

      {userData ?
        <div>
          {userData.name[0].toUpperCase()}
        </div>
        :
        <button onClick={() => navigate('/login')}
          className='flex items-center gap-2 border border-gray-500 rounded-full px-4 py-2
        text-black hover:bg-red-400 transition-all cursor-pointer'>Login <img src={assets.userIcon} alt=""
            className='w-[15px]' /></button>
      }
    </div>
  )
}

export default Navbar