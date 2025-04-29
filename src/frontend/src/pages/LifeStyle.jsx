import { useState } from 'react'
import axios from 'axios'
import { Button, Icon, IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'
import { motion } from 'framer-motion'
export default function Home ({ setLifestyle, setMenu }) {
  const featureNames = [
    'Age',
    'Gender',
    'Height (cm)',
    'Weight (kg)',
    'BMI',
    'Daily Steps',
    'Calories Intake',
    'Hours of Sleep',
    'Heart Rate',
    'Exercise Hours/Week',
    'Smoker (0/1)',
    'Alcohol Consumption/Week',
    'Diabetic (0/1)',
    'Heart Disease (0/1)',
    'Systolic BP',
    'Diastolic BP'
  ]

  const closeAll = () => {
    setMenu(false)
    setLifestyle(false)
  }
  const defaultValues = [
    56, 0, 164, 81, 30.72, 5134, 1796, 8.6, 102, 8.1, 0, 7, 0, 0, 137, 72
  ]

  const [features, setFeatures] = useState(defaultValues)
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (index, value) => {
    const updatedFeatures = [...features]
    updatedFeatures[index] = value
    setFeatures(updatedFeatures)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      setLoading(true)
      const numericFeatures = features.map(Number) // Convert all to numbers
      const response = await axios.post('http://127.0.0.1:5001/predict', {
        features: numericFeatures
      })
      setLoading(true)
      const { prediction } = response.data
      if (prediction === 0) setResult('Low Risk')
      else if (prediction === 1) setResult('Moderate Risk')
      else if (prediction === 2) setResult('High Risk')
      else setResult('Unknown Risk Level')
    } catch (error) {
      console.error(error)
      setResult('Error predicting risk.')
    } finally {
      setTimeout(()=> {
        setLoading(false);
      } ,3000)
    }
  }

  return (
    <div className='fixed flex-col h-screen w-screen top-0 z-50 flex justify-center items-center'>
      <div className='flex justify-start w-[50vw] px-5 items-start'>
        <h1 className='text-3xl font-bold mb-6 text-gray-50 -800'>
          Lifestyle Risk Predictor
        </h1>
        <IconButton
          onClick={closeAll}
          sx={{ flex: 1, display: 'flex', justifyContent: 'end' }}
        >
          <Close
            sx={{
              color: '#fff'
            }}
          />
        </IconButton>
      </div>
      <div className='z-50   w-[50vw]  h-[80vh] overflow-scroll rounded-2xl '>
        <form
          onSubmit={handleSubmit}
          className='w-full max-w-2xl bg-black shadow-lg rounded-lg p-6 space-y-4'
        >
          {features.map((feature, index) => (
            <div key={index} className='flex flex-col'>
              <label className='text-gray-50 text-xs mb-1 font-medium'>
                {featureNames[index]}
              </label>
              {index === 1 ||
              index === 10 ||
              index === 11 ||
              index === 12 ||
              index === 13 ? (
                <select
                  value={feature}
                  onChange={e => handleChange(index, e.target.value)}
                  class='w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-50 text-slate-50 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow'
                  placeholder='Type here...'
                  required
                >
                  {index === 1 ? (
                    <>
                      <option value={0}>Male</option>
                      <option value={1}>Female</option>
                    </>
                  ) : (
                    <>
                      <option value={0}>No</option>
                      <option value={1}>Yes</option>
                    </>
                  )}
                </select>
              ) : (
                <input
                  type='number'
                  step='any'
                  value={feature}
                  onChange={e => handleChange(index, e.target.value)}
                  class='w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-50 text-slate-50 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow'
                  placeholder='Type here...'
                  required
                />
              )}
            </div>
          ))}
          {/* <button
    type="submit"
    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition duration-200"
    disabled={loading}
  >
    {loading ? 'Predicting...' : 'Predict Risk'}
  </button> */}
          <Button type='submit' fullWidth variant='contained'>
            Submit
          </Button>
        </form>
      </div>
      {result && (
        <div className='fixed items-center justify-center text-gray-50 z-50 flex   top-0 h-screen w-screen  backdrop-blur-sm'>
          <div className='p-5 relative h-[100px] w-[300px] '>
            <IconButton sx={{position:"absolute",right:"10px",top:"10px",color:"#fff"}} onClick={() => {setResult(false)}}>
              <Close  />
            </IconButton>
           {
            loading ? <div className='flex justify-center w-full' ><div className='loader'></div></div>:  <p className='text-gray-50 mt-5 text-center'>{'You are at ' + result}</p>
           }
          </div>
        </div>
      )}
    </div>
  )
}
