import React from 'react';
import {BiLogOut} from 'react-icons/bi';
import useLogout from '../../hooks/useLogout';
import useConversation from '../../zustand/useConversation';



const LogoOut = () => {
  const{logout,loading}=useLogout();

  return (
    <div className='mt-auto text-white'> 
     { 
      !loading?( <BiLogOut className='text-white h-6 w-6 cursor-pointer' onClick={logout}/>  ):(<span className='loading loading-spinner'></span>)  
     }
    </div> 
  )
}

export default LogoOut
