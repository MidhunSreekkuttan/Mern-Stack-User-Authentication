import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Header from '../components/Header.jsx'

const Home = () => {
  return (
    <div className=' items-center justify-center min-h-screen bg-[url("/fireworksBg.png")] bg-cover bg-center'>
      <Navbar />
      <Header />
    </div>
  )
}

export default Home