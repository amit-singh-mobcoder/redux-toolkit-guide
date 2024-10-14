import React from 'react'
import {increment, decrement} from '../features/counter/counterSlice'
import { useDispatch, useSelector } from 'react-redux'

const Counter = () => {

    const count = useSelector(state => state.counter.value)
    const dispatch = useDispatch()

    const handleIncreaseCount = () => {
        dispatch(increment())
    }

    const handleDecreaseCount = () => {
        dispatch(decrement())
    }

  return (
    <div className='flex flex-col min-h-screen items-center justify-center gap-4 '>

        <p className='text-white font-extrabold text-[50px]'>Count : {count}</p>
        <div className='flex gap-2 p-2 border border-indigo-400  rounded-full'>
            <button onClick={handleIncreaseCount} className='bg-green-400 border border-green-800 rounded-full font-semibold px-2 py-1'>Increase count</button>
            <button onClick={handleDecreaseCount} className='bg-red-400 border border-red-800 rounded-full font-semibold px-2 py-1'>Decrease count</button>
        </div>

    </div>
  )
}

export default Counter