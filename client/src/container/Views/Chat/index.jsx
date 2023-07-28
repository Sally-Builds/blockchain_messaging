import React from 'react'
import List from '../../../components/List'
import ChatArea from '../../../components/chat_area'
import Details from '../../../components/Details'

const Chat = () => {
  return (
    <div className='grid grid-cols-12 h-screen'>

            <div className='col-span-4 p-2 border-double border-r-2 h-full'>
                <List />
            </div>

            <div className='col-span-8'>
            {/* chat <area shape="" coords="" href="" alt="" /> */}

            {/* <ChatArea /> */}
            <Details></Details>
            </div>

        </div>
  )
}

export default Chat