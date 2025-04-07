import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Send } from '@mui/icons-material'
import { IconButton } from '@mui/material'

export default function ChatArea () {
  const [messages, setMessages] = useState([
    { text: 'Hello! What symptoms are you experiencing today?', sender: 'bot' }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const symptomList = [
    'itching', 'skin_rash', 'joint_pain', 'vomiting', 'fatigue',
    'cough', 'high_fever', 'headache', 'yellowish_skin', 'nausea',
    'loss_of_appetite', 'abdominal_pain', 'diarrhoea', 'chest_pain',
    'dizziness', 'excessive_hunger', 'swelling_joints', 'loss_of_balance',
    'irritability', 'painful_walking', 'prognosis'
  ]

  const quickMessages = [
    'I have a fever', 'I feel tired', 'I have a headache',
    'I feel dizzy', 'My stomach hurts'
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
      const reply = res.data.final_prediction

      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            text: `Based on your symptoms, it might be *${reply}*.`,
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
            text: reply ? `Based on your symptoms, it might be ${reply}.`:'Sorry failed to generate output',
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
    <div className='bg-teal-50 from-teal-50 via-teal-100 to-teal-50 [#e6f2f0] h-[calc(100vh)] pt-[0px] px-4 md:px-[180px] flex flex-col pb-52 overflow-y-auto'>
      <div className='flex-1 overflow-y-auto justify-end flex flex-col pb-10 h-[550px]'>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex mb-2 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`rounded-xl  text-gray-800 px-4 py-2 text-sm max-w-[70%] whitespace-pre-wrap ${
                msg.sender === 'user'
                  ? ' flex gap-3 flex-row-reverse'
                  : 'flex gap-1'
              }`}
            >
            <p>{msg.sender}</p> : <p>{msg.text}</p>
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

      <div className='fixed bottom-24 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[60%] flex gap-2 z-50'>
        <input
          type='text'
          placeholder='Describe your symptoms (e.g. headache, cough)...'
          className='flex-1 p-3 px-6 text-sm rounded-full bg-[#fff] shadow-md focus:outline-none focus:ring-0 outline-none'
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <IconButton
          
          onClick={handleSend}
        >
          <Send/>
        </IconButton>
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
