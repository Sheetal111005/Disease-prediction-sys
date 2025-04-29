import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import grokDarkMode from '../layout/COLORS'

export default function Header ({ currUser ,showProfile}) {
  return (
    <nav className=' z-40 p-4 shadow-sm bg-black text-white w-full h-[60px] flex justify-between top-0 '>
      <span className='text-sm'>Medi Bot</span>

      <div className='flex items-center gap-2'>
        <Link to={'/chat'}>
          <button
            style={{
              background: grokDarkMode.accent,
              color: grokDarkMode.primaryText
            }}
            class='flex items-center rounded-md cursor-pointer py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800  focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
            type='button'
          >
            Chat
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              class='w-4 h-4 ml-1.5'
            >
              <path
                fill-rule='evenodd'
                d='M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z'
                clip-rule='evenodd'
              />
            </svg>
          </button>
        </Link>
        <img className='rounded-full h-[40px] w-[40px] cursor-pointer' onClick={showProfile} src={currUser?.image} />
      </div>
    </nav>
  )
}
