import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function CTA () {
  const [curr, setCurr] = useState(0)

  return (
    <main className='p-20 flex  bg-black'>
      <ol class=' overflow-hidden space-y-8'>
        <li class="relative flex-1 after:content-['']  after:w-0.5 after:h-full  after:bg-indigo-600 after:inline-block after:absolute after:-bottom-11 after:left-4 lg:after:left-5">
          <a
            href='https://pagedone.io/'
            class='flex items-start font-medium w-full  '
          >
            <span class='w-8 h-8 aspect-square bg-indigo-600 border-2 border-transparent rounded-full flex justify-center items-center mr-3 text-sm text-white lg:w-10 lg:h-10'>
              1
            </span>
            <div class='block'>
              <h4 class='text-base  text-indigo-600 mb-2'>
                Choose a Prediction Model
              </h4>
              <p class='text-sm text-gray-300 max-w-xs mb-4'>
                Choose a machine learning model for disease prediction. You can
                choose from:
                <br />
              </p>
              <ul class='flex flex-wrap gap-x-5 gap-y-1 w-full max-w-xl mb-4'>
                <li class='text-sm font-medium text-gray-400'>
                  Random Forest (RF) : A versatile and powerful ensemble method.
                </li>
                <br />
                <li class='text-sm font-medium text-gray-400'>
                  Support Vector Classifier (SVC): Effective in high-dimensional
                  spaces and for clear margin of separation.
                </li>
                <li class='text-sm font-medium text-gray-400'>
                  Naive Bayes: Simple and effective for large datasets with
                  independent features.
                </li>
              </ul>

              <div class='flex items-center gap-4 my-6'>
                <Link>
                  <button
                    class='rounded-md border border-transparent py-2 px-4 flex items-center text-center text-sm transition-all text-slate-600 bg-slate-100 focus:bg-slate-100 hover:bg-slate-50 cursor-pointer active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                    type='button'
                  >
                    Try now
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                      class='w-4 h-4 ml-1.5'
                    >
                      <path
                        fill-rule='evenodd'
                        d='M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z'
                        clip-rule='evenodd'
                      />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </a>
        </li>
        <li class="relative flex-1 after:content-[''] z-10  after:w-0.5 after:h-full after:z-0 after:bg-indigo-600 after:inline-block after:absolute after:-bottom-12 after:left-4 lg:after:left-5">
          <a class='flex items-center font-medium w-full  '>
            <span class='w-8 h-8 bg-indigo-600 text-gray-50 relative z-20 border-2 border-indigo-600 rounded-full flex justify-center items-center mr-3 text-sm lg:w-10 lg:h-10'>
              2
            </span>
            <div class='block'>
              <h4 class='text-base  text-indigo-600 mb-2'>Enter Symptoms</h4>
              <p class='text-sm text-gray-400 max-w-xs'>
                To provide an accurate prediction, list the symptoms you are
                experiencing.
              </p>
            </div>
          </a>
        </li>
        <li class='relative flex-1 '>
          <a class='flex items-start font-medium w-full  '>
            <span class='w-8 h-8 bg-indigo-600 text-gray-50 border-2 relative z-10 border-gray-900 rounded-full flex justify-center items-center mr-3 text-sm  lg:w-10 lg:h-10'>
              3
            </span>
            <div class='block'>
              <h4 class='text-base  text-indigo-600 mb-2'>Get Prediction</h4>
              <p class='text-sm text-gray-400 max-w-xs'>
                Based on the symptoms you entered, the model will analyze the
                data and provide a prediction about which disease you may be
                experiencing. This will help in deciding the next steps for
                diagnosis and treatment.
              </p>
            </div>
          </a>
        </li>
      </ol>
      <div className='flex gap-3 flex-col'>
        <h1 className='text-gray-200 ml-3'>Personlised View</h1>
        <img
          className='h-[300px] shadow-2xl border-[1px] border-sky-200 rounded-3xl'
          src='/Screenshot 2025-04-29 at 2.44.27 AM.png'
          alt=''
        />
        <img
          className='h-[300px] shadow-2xl border-[1px] border-sky-200 rounded-3xl'
          src='/Screenshot 2025-04-29 at 2.46.40 AM.png'
          alt=''
        />
      </div>
    </main>
  )
}
