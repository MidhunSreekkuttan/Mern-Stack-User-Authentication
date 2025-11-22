import React, { useContext } from 'react'
import assets from '../assets/assets.js'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/App.Context.jsx'
import { toast } from 'react-toastify'
import axios from 'axios'

const Navbar = () => {

  const navigate = useNavigate()

  const logOut = async () => {

    try {

      axios.defaults.withCredentials = true

      const { data } = await axios.post(BackendUrl + '/api/user/logout')

      data.success && setIsLogin(false)
      data.success && setUserData(false)
      navigate('/')

    } catch (error) {

      toast.error(error.message)

    }
  }

  const { userData, BackendUrl, setUserData, setIsLogin } = useContext(AppContext)



  return (
    <div className='w-full h-[10vh] flex justify-between items-center p-4 absolute top-0px'>
      <img src={assets.logo} alt="" className='w-15' />

      {userData ?
        <div className='flex border border-none rounded-2xl py-1 px-3 cursor-pointer bg-black text-amber-50 relative group'>

          {userData.name[0].toUpperCase()}

          <div className='absolute hidden group-hover:block rounded top-0 right-0 pt-10 z-10 text-black'>
            <ul className='list-none m-0 p-2 bg-amber-50'>
              <li onClick={logOut}>LogOut</li>
            </ul>
          </div>

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