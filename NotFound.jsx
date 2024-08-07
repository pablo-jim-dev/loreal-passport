import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/')
  }, [])

  return (
    <div className='mt-20'>
      <h1 className='text-3xl text-center'>404 Not Found</h1>
    </div>
  )
}

export default NotFound