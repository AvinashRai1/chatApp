import React from 'react';
import Conversation from './Conversation'; 
import useGetConversation from '../../hooks/useGetConversation';
import { getRandomEmoji } from '../../utils/emojis'; 

const Coversations = () => { 
  const{loading,conversations}=useGetConversation();
  //console.log("converse",conversations);  
  return (
    <div className='py-2 flex flex-col overflow-auto'>

      {
        conversations.map((conversation,index)=>{ 
          return(
            <Conversation key={conversation._id} lastIndex={index===conversations.length-1} conversation={conversation} emoji={getRandomEmoji()}/> 
          )
        })  
      }
      {loading?(<span className=' loading loading-spinner'></span>):null} 
    </div>
  )
}

export default Coversations
