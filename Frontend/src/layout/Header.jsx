import React from 'react'
import darkModeColors from './COLORS'
import { Avatar } from '@mui/material'
import AccountMenu from '../components/AccountMenu'
export default function Header() {
  return (
    <header className='h-[76px] border-blue-50 border-b-2 top-0 relative w-[calc(100vw-340px)] ' >
      <nav style={{
        background:darkModeColors.surface,
        borderColor:darkModeColors.border,
        borderBottom:"2px solid #292929"
      }} className='h-[75px] justify-between items-center fixed flex p-5 top-0 left-[280px] w-[calc(100vw-280px)] '>
        <select style={{
          color:darkModeColors.primaryText
        }} >
          <option value="">Random Forest Classifier</option>
        </select>
        <AccountMenu/>
      </nav>
    </header>
  )
}
