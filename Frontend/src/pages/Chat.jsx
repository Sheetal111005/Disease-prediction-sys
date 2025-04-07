import React, { useState } from 'react'
import Layout from '../layout/Layout'
import ChatBox from '../components/ChatBox';
import ChatArea from '../components/ChatArea';
const Chat = () => {

  const [Messages, setMessages] = useState([]);
  return (
    <section className='flex flex-col h-full w-[100vw-280px]'>
      <ChatArea/>
      <ChatBox/>
    </section>
    
  )
}

export default Layout(Chat);