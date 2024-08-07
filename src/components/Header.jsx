import React from 'react'
import Loreal from '../assets/icons/logo.png'

const Header = () => {
  return (
    <div className='fixed top-0 left-0 right-0 flex flex-col justify-center items-center w-full h-20 bg-[#34333A] z-50'>
        <img src={Loreal} alt="Loreal" className='h-10 w-auto' />
    </div>
  )
}

export default Header