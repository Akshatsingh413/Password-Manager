import React from 'react'

function Navbar() {
  return (
    <nav className='flex bg-slate-800 justify-around h-14 items-center text-white'>
        <div className='logo text-l'>
            <span className='text-green-700 font-bold text-xl'>&lt;</span>
            <span className='text-x font-bold'>Password</span>
            <span className='text-green-700 font-bold text-x'>OP/&gt;</span>
        </div>
        <ul className='flex gap-9 text-base'>
            <a href=""><li>Home</li></a>
            <a href=""><li>About</li></a>
            <a href=""><li>Contact Us</li></a>
        </ul>
    </nav>
  )
}

export default Navbar
