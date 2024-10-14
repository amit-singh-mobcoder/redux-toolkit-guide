import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className='flex flex-col gap-2 min-h-screen items-center justify-center '>
        <h1 className='font-extrabold text-[50px] text-[#ba8fff]'>Redux Toolkit</h1>
        <div className='flex gap-2 border border-slate-200 rounded-full p-2'>
            <Link to='/counter' className='border text-white bg-[#ba8fff] rounded-full px-2 py-1 font-semibold'>Counter</Link>
            <Link to='/todos' className='border text-white bg-[#ba8fff] rounded-full px-2 py-1 font-semibold'>Todos</Link>
        </div>
    </div>
  )
}

export default LandingPage