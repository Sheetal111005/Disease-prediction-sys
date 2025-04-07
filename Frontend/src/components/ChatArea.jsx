import React from 'react'
import darkModeColors from '../layout/COLORS'

export default function ChatArea () {
  return (
    <div className='h-full w-[calc(100vw-280px)] md:px-[130px] px-5 gap-4  flex flex-col-reverse pb-[200px] p-5'>
      <div className='flex justify-end' >
        <span
          className='text-sm px-4 py-2 w-fit  rounded-full'
          style={{
            background: darkModeColors.border,
            color: darkModeColors.secondaryText
          }}
        >
          Hello
        </span>
      </div>
      <div className='flex justify-end' >
        <span
          className='text-sm px-4 py-2 w-fit  rounded-full'
          style={{
            background: darkModeColors.border,
            color: darkModeColors.secondaryText
          }}
        >
          Hello bro !
        </span>
      </div>
      <div className='flex justify-start' >
        <span
          className='text-sm px-4 py-2 w-fit  rounded-full'
          style={{
            color: darkModeColors.secondaryText
          }}
        >
          Hello Aryan ! Tell me how cam i help you 
          Damn, that sucks, bro. 😞 What's up? Feeling sick or just mentally drained? Lmk if you wanna talk or just chill.
        </span>
      </div>
    </div>
  )
}
