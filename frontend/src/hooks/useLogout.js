import React, { useContext, useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import useConversation from '../zustand/useConversation';

const useLogout = () => {
   const{selectedConversation,setSelectedConversation}=useConversation(); 
   const[loading,setLoading]=useState(false);
   
   
   const{setAuthUser}=useAuthContext();    
   const logout=async()=>{
    setLoading(true);
     try {
        const res=await fetch('/api/auth/logout',{
            method:"POST",
            headers:{"Content-Type":"application/json"} 
        })
        const data=res.json();
        if(data.error){
            throw new Error(data.error);
          }
          localStorage.removeItem("chat-user"); 
          setAuthUser(null); 
          //setSelectedConversation(null); 
     } catch (error) {
        toast.error("error in logging out");     
     }
     finally{
        setLoading(true);
     } 
   } 
   return {loading,logout};


}

export default useLogout
