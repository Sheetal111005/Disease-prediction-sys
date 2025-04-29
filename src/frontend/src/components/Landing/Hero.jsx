import React from 'react'

export default function Hero () {
  return (
    <div className='flex flex-col h-[calc(100vh-60px)] py-10 overflow-visible text-white bg-black gap-6 w-full justify-center items-center relative'>
      <div>
        <h1 className='text-3xl font-bold text-center mb-4'>
          Disease & Lifestyle Risk Prediction
        </h1>
        <p className='text-center text-lg mb-6'>
          Our model predicts health risks based on your disease history and
          lifestyle data.
        </p>
      </div>

      {/* Video Section */}
      <video
        className='h-[400px] w-auto  shadow-2xl rounded-lg mt-6'
        autoPlay
        loop
        muted
        src='/Screen Recording 2025-04-29 at 1.05.04 AM.mov'
      ></video>

      {/* Overlapping Image Boxes */}
      <div className='absolute bg-white text-gray-800 h-[70px] rounded-sm -rotate-12  w-[70px] flex justify-center items-center text-xs left-8 top-[280px]'>
        <img src='/i/i.png' alt='' />
      </div>
      <div className='absolute bg-white text-gray-800 h-[70px] rounded-sm -rotate-12  w-[70px] flex justify-center items-center text-xs left-24 bottom-[120px]'>
        <img src='/i/i2.png' alt='' />
      </div>
      <div className='absolute bg-white text-gray-800 h-[70px] rounded-sm rotate-12  w-[70px] flex justify-center items-center text-xs right-32 top-[280px]'>
        <img src='/i/i3.png' alt='' />
      </div>
      <div className='absolute p-2 bg-white text-gray-800 h-[75px] rounded-sm rotate-12  w-[75px] flex justify-center items-center text-xs right-32 bottom-[120px]'>
        <img src='/i/i4.png' alt='' />
      </div>
    </div>
  )
}
