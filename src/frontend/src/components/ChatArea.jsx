import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { ArrowUpward, MapsUgc, Pause, Send, Stop } from '@mui/icons-material'
import { Icon, IconButton } from '@mui/material'
import lightTheme from '../layout/COLORS'
export default function ChatArea () {
  const [messages, setMessages] = useState([])
  // [
  //   { text: 'Hello! What symptoms are you experiencing today?', sender: 'bot' }
  // ]
  const [input, setInput] = useState('')
  const [showSuggestions, setShowSuggestion] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const symptomList = [
    'itching',
    'skin_rash',
    'joint_pain',
    'vomiting',
    'fatigue',
    'cough',
    'high_fever',
    'headache',
    'yellowish_skin',
    'nausea',
    'loss_of_appetite',
    'abdominal_pain',
    'diarrhoea',
    'chest_pain',
    'dizziness',
    'excessive_hunger',
    'swelling_joints',
    'loss_of_balance',
    'irritability',
    'painful_walking',
    'prognosis'
  ]

  const quickMessages = [
    'itching,skin_rash ',

    'yellowish_skin,nausea,loss_of_appetite,vomiting,fatigue',

    'high_fever,headache,abdominal_pain,diarrhoea,fatigue',

    'high_fever,chills,vomiting,joint_pain,nausea',

    'excessive_hunger,fatigue,irritability,painful_walking',

    'joint_pain,swelling_joints,painful_walking,fatigue',

    'high_fever,headache,skin_rash,nausea,joint_pain',

    'cough,fatigue,headache,high_fever',

    'abdominal_pain,diarrhoea,vomiting,loss_of_appetite',

    'dizziness,loss_of_balance,irritability,headache'
  ]

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSend = async () => {
    if (!input.trim()) return
    setMessages(prev => [...prev, { text: input, sender: 'user' }])
    setInput('')
    setIsTyping(true)

    try {
      const res = await axios.post('http://localhost:5000/predict', {
        symptoms: input
      })
      const msg = await axios.post('http://localhost:3000/get-res', {
        disease: res.data.final_prediction
      })
      const reply = msg.data.response

      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            text: `${reply}.`,
            sender: 'bot'
          }
        ])
        setIsTyping(false)
      }, 1000)
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          text: "Oops! Couldn't fetch diagnosis. Please try again.",
          sender: 'bot'
        }
      ])
      setIsTyping(false)
    }
  }

  const handleQuickMessage = async msg => {
    setMessages(prev => [...prev, { text: msg, sender: 'user' }])
    setIsTyping(true)

    try {
      const res = await axios.post('http://localhost:5000/predict', {
        symptoms: msg
      })
      const reply = res.data.final_prediction

      setTimeout(() => {
        setMessages(prev => [
          ...prev,

          {
            text: reply
              ? `Based on your symptoms, it might be ${reply}.`
              : 'Sorry failed to generate output',
            sender: 'bot'
          }
        ])
        setIsTyping(false)
      }, 1000)
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          text: "Oops! Couldn't fetch diagnosis. Please try again.",
          sender: 'bot'
        }
      ])
      setIsTyping(false)
    }
  }

  const filteredSuggestions = symptomList.filter(
    symptom =>
      symptom.toLowerCase().includes(input.toLowerCase()) &&
      !input
        .toLowerCase()
        .split(',')
        .map(s => s.trim())
        .includes(symptom.toLowerCase()) &&
      input.trim() !== ''
  )

  const addSymptom = symptom => {
    const currentSymptoms = input.split(',').map(s => s.trim().toLowerCase())
    if (!currentSymptoms.includes(symptom.toLowerCase())) {
      setInput(symptom)
    }
  }

  return (
    <div
      style={{ background: lightTheme.background }}
      className=' h-[calc(100vh)] pt-[100px] px-4 md:px-[180px] flex flex-col pb-52 overflow-y-auto'
    >
      <div className='flex-1 h overflow-scroll justify-end flex flex-col pb-10  max-h-[650px]'>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex mb-2 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`rounded-xl  text-gray-400  py-2 text-sm max-w-[70%] whitespace-pre-wrap ${
                msg.sender === 'user'
                  ? ' flex gap-3 flex-row-reverse '
                  : 'flex gap-1'
              }`}
            >
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className='flex justify-start mb-2'>
            <span className='text-sm text-[#3d5a5b] flex gap-1 items-center'>
              <span className='dot-flash' />
              <span className='dot-flash' style={{ animationDelay: '0.2s' }} />
              <span className='dot-flash' style={{ animationDelay: '0.4s' }} />
            </span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className='w-[100%] left-0 fixed bottom-44 justify-center flex flex-wrap gap-2 z-50'>
        {/* {quickMessages.map((msg, i) => (
          <button
            key={i}
            className='bg-[#f0fbf9] hover:bg-[#2ab7a9] hover:text-white text-[#0f3d3e] text-xs px-7 cursor-pointer py-3 rounded-full transition'
            onClick={() => handleQuickMessage(msg)}
          >
            {msg}
          </button>
        ))} */}
      </div>

      {filteredSuggestions.length > 0 && (
        <div className='fixed bottom-[160px] left-1/2 -translate-x-1/2 w-[90%] md:w-[60%] bg-white rounded-xl shadow-md p-2 flex flex-wrap gap-2 z-50'>
          {filteredSuggestions.slice(0, 6).map((symptom, index) => (
            <button
              key={index}
              className='bg-[#d0f0ec] hover:bg-[#2ab7a9] hover:text-white text-[#0f3d3e] text-xs px-3 py-1 rounded-full transition'
              onClick={() => addSymptom(symptom)}
            >
              {symptom}
            </button>
          ))}
        </div>
      )}

      {messages.length <= 0 && (
        <>
          <div
            className='fixed bottom-[55%] w-full left-0 flex flex-col items-center'
            style={{
              color: lightTheme.primaryText
            }}
          >
            <h1 className='text-3xl font-bold'>
              Hello User ! How may we help you ?
            </h1>
            <br />
            <h1 className='text-2xl font-bold'> Please Enter your symptoms</h1>
          </div>
        </>
      )}

      <div
        className={`${
          messages.length > 0 ? 'bottom-20' : 'bottom-[40%]'
        } fixed   left-1/2 transform  -translate-x-1/2 w-[90%] md:w-[60%] flex items-center gap-2 z-50`}
      >
        <input
          type='text'
          placeholder='Describe your symptoms (e.g. headache, cough)...'
          style={{
            background: lightTheme.accent,
            color: lightTheme.primaryText
          }}
          className='flex-1 border-[.5px] border-gray-500 py-6 px-6 text-sm rounded-2xl  shadow-md focus:outline-none focus:ring-0 outline-none'
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <IconButton
          sx={{
            background: lightTheme.accent,
            color: lightTheme.primaryText,
            height: 40,
            width: 40
          }}
          onClick={handleSend}
        >
          {!isTyping ? (
            <ArrowUpward color='inherit' />
          ) : (
            <Stop color='inherit' />
          )}
        </IconButton>{' '}
        {messages.length > 0 && (
          <>
            <IconButton
            onClick={()=>{setShowSuggestion(!showSuggestions)}}
              sx={{
                background: lightTheme.accent,
                color: lightTheme.primaryText,
                height: 40,
                width: 40
              }}
            >
              <MapsUgc />
            </IconButton>
          </>
        )}
      </div>



      <div
        className={`w-[100%] left-0 fixed ${
          !showSuggestions ? 'hidden' : 'bottom-[22%] '
        } justify-center flex flex-wrap px-16  gap-2 z-50`}
      >
        {quickMessages.map((msg, i) => (
          <button
            key={i}
            style={{
              background: lightTheme.background,
              color: lightTheme.primaryText
            }}
            className='text-xs border-[.1px] hover:scale-105 transition-all duration-75 ease-in hover:shadow-md border-gray-500 cursor-pointer p-2 px-3 rounded-full'
            onClick={() => {handleQuickMessage(msg);setShowSuggestion(false)}}
          >
            {msg}
          </button>
        ))}
      </div>

      <div
        className={`w-[100%] left-0 fixed ${
          messages.length > 0 ? 'hidden' : 'bottom-[22%]'
        } justify-center px-16 flex flex-wrap gap-2 z-50`}
      >
        {quickMessages.map((msg, i) => (
          <button
            key={i}
            style={{
              background: lightTheme.background,
              color: lightTheme.primaryText
            }}
            className='text-xs border-[.1px] hover:scale-105 transition-all duration-75 ease-in hover:shadow-md border-gray-500 cursor-pointer p-2 px-3 rounded-full'
            onClick={() => handleQuickMessage(msg)}
          >
            {msg}
          </button>
        ))}
      </div>

      <style>{`
        .dot-flash {
          width: 6px;
          height: 6px;
          background: #3d5a5b;
          border-radius: 50%;
          display: inline-block;
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0% { opacity: 0.2; }
          20% { opacity: 1; }
          100% { opacity: 0.2; }
        }
      `}</style>
    </div>
  )
}
