import React, { useContext } from 'react'
import assets from '../assets/assets.js'
import { AppContext } from '../context/App.Context.jsx'

const Header = () => {

  const { userData } = useContext(AppContext)

  return (
    <div className='flex flex-col items-center'>
      <img src={assets.headerIcon} alt="" className='w-50 aspect-square m-25' />
      <h1 className='-mt-10 text-[25px]'>Hi {userData ? userData.name : "Annaaaaaaaa"}!</h1>
      <h2 className='m-20 text-5xl'>Welcome to Out Zone</h2>
      <button className='border border-amber-600 rounded-full px-3 py-4 hover:bg-black
         hover:text-amber-50 transition-all'>Get Started</button>
    </div>
  )
}

export default Header