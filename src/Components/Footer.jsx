import React from 'react'

function Footer() {
  return (
    <footer className='bg-slate-800 bottom-0 text-white text-center flex flex-col justify-center text-xs absolute w-full items-center'>
        <div className='logo text-l'>
            <span className='text-green-700 font-bold'>&lt;</span>
            <span className='text-x font-bold'>Password</span>
            <span className='text-green-700 font-bold'>OP/&gt;</span>
        </div>
        <div>
            <p className='text-white text-xs flex'>Created by Akshat</p>
        </div>
    </footer>
  )
}

export default Footer
