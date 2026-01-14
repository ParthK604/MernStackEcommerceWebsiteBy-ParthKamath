import React from 'react'
import { useNavigate } from 'react-router-dom'

function Success() {
  const navigate=useNavigate();
    return (
    <>
    <div className='mx-auto text-center justify-center'>
      Signed In Succesfully .. Please Go to the Login page to Login
    </div>
    <button onClick={()=>{navigate("/login")}} className='p-2 bg-amber-200 mx-auto w-fit h-fit'>Login</button>
     </>
  )
}

export default Success
