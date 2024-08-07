import React from 'react'
import Loreal from '../assets/icons/logo.png'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <Link className='fixed top-0 left-0 right-0 flex flex-col justify-center items-center w-full h-20 bg-[#34333A] z-50' to={'/menu'}>
        <img src={Loreal} alt="Loreal" className='h-10 w-auto' />
    </Link>
  )
}

export default Header