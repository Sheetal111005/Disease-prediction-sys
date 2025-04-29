import React, { useState, useEffect } from 'react'
import { AddBox } from '@mui/icons-material'
import { Button } from '@mui/material'

export default function Profiles ({ currHandler }) {
  const [profiles, setProfiles] = useState([])
  const [profileImage, setProfileImage] = useState(null)
  const [profileName, setProfileName] = useState([])
  const [loader, setLoader] = useState(false);
  // Load profiles from localStorage when component mounts
  useEffect(() => {
    const data = localStorage.getItem('profiles')
    if (!data) return
    const storedProfiles = JSON.parse(data)
    if (storedProfiles && Array.isArray(storedProfiles)) {
      setProfiles(storedProfiles)
    }
  }, [])

  // Update localStorage whenever profiles change
  useEffect(() => {
    if (profiles.length == 0) return
    localStorage.setItem('profiles', JSON.stringify(profiles))
    console.log("profile saved")
    setLoader(false);
    // window.location.href = '/';
  }, [profiles])

  const handleImageChange = e => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const addProfile = () => {
    if (profileImage && profileName.trim() !== '') {
      const newProfile = {
        name: profileName,
        image: profileImage
      }
      setProfiles(prevProfiles => [...prevProfiles, newProfile])
      setLoader(true)
      setProfileImage(null) // Reset after adding
      setProfileName('')
    } else {
      alert('Please select an image and enter a name.')
    }
  }

  if (loader)
    return (
      <div className='flex justify-center items-center bg-black'>
        {' '}
        <div className='loader'></div>
      </div>
    )
  return (
    <div className='bg-black items-center justify-center min-h-screen w-screen flex flex-col text-gray-50 p-4'>
      {profileImage && (
        <div className='absolute  z-50 backdrop-blur-xs flex justify-center items-center h-screen w-screen'>
          <div className='flex gap-4 flex-col items-center'>
            <img
              src={profileImage}
              className='h-[60px] w-[60px] rounded-full'
              alt=''
            />
            <input
              type='text'
              value={profileName}
              onChange={e => setProfileName(e.target.value)}
              class='w-full bg-transparent placeholder:text-gray-50 text-gray-50 text-sm border border-gray-50 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow'
              placeholder='Name here'
            />
            <Button
              sx={{
                fontSize: 9
              }}
              variant='contained'
              onClick={addProfile}
              className='mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg'
            >
              Add Profile
            </Button>
          </div>
        </div>
      )}

      <div className='mt-6 grid items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
        {profiles.map((profile, index) => (
          <div
            key={index}
            onClick={() => {
              currHandler(index)
            }}
            className='flex cursor-pointer flex-col items-center justify-start  p-4 rounded-lg'
          >
            <div className='bg-gray-300 rounded-full w-24 h-24 flex justify-center items-center overflow-hidden'>
              <img
                src={profile.image}
                alt={`Profile ${index}`}
                className='w-full h-full object-cover rounded-full'
              />
            </div>
            <p className='mt-2 text-center'>{profile.name}</p>
          </div>
        ))}
        <div className='backdrop-blur-2xl mb-7 bg-opacity-50 border h-[100px] w-[100px] rounded-full flex justify-center items-center'>
          <label htmlFor='profile-upload' className='cursor-pointer'>
            <AddBox fontSize='large' />
          </label>
          <input
            id='profile-upload'
            type='file'
            accept='image/*'
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>
      </div>
    </div>
  )
}
