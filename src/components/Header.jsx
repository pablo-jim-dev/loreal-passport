import Loreal from '../assets/icons/logo.png'
import { Link } from 'react-router-dom'
import { Button } from '@nextui-org/react'
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate, useLocation } from 'react-router-dom';
const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  console.log("location: ", location.pathname);
  
  return (
    <div className='fixed top-0 left-0 right-0 flex flex-col justify-center items-center w-full h-20 bg-[#34333A] z-50'>
      <div className='flex flex-row justify-between items-center w-full px-4'>
        <div className='flex flex-1'>
          {location.pathname === '/' || location.pathname === '/menu' ? (<></>) : (<Button isIconOnly className='' onClick={() => navigate(-1)}><IoChevronBackOutline size={20} /></Button>)}
        </div>
        <Link className='flex flex-1 justify-center items-center' to={'/menu'}>
          <img src={Loreal} alt="Loreal" className='h-10 w-auto' />
        </Link>
        <div className='flex flex-1'></div>
      </div>
    </div>
  )
}

export default Header