import React from 'react'
import darkModeColors from './COLORS'
import { Avatar } from '@mui/material'
import AccountMenu from '../components/AccountMenu'
export default function Header() {
  return (
    <header className='h-[76px] bg-transparent fixed flex items-center top-[10px] w-[calc(100vw)] ' >
      <nav style={{
      }} className='shadow-md bg-white h-[60px] mt-5 justify-between items-center fixed flex p-4 top-0 rounded-full mx-14 w-[calc(100vw-56px-56px)] '>
        <select className='text-xs text-gray-700'>
          <option value="">Random Forest Classifier</option>
          <option value="">Naive Bayes</option>
          <option value="">Support Vector Machine</option>
          <option value="">Random Forest Classifier</option>
        </select>
        <AccountMenu/>
      </nav>
    </header>
  )
}
