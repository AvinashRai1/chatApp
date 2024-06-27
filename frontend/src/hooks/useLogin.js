import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const useLogin = () => {
  const[loading,setLoading]=useState(false);
  const{setAuthUser}=useAuthContext();
  const login=async(userName,password)=>{  
   
 const sucess=   handleInputErrors({userName,password}); 
 if(!sucess)return;  
    setLoading(true);
 
    try {
        const res=await fetch("/api/auth/login",{     
           method:"POST",
           headers: { "Content-Type": "application/json" }, 
           body: JSON.stringify({ userName, password })     


        })
        const data= await res.json(); 
       
        if(data.error){
            throw new Error(data.error);
        }
        localStorage.setItem("chat-user",JSON.stringify(data));
        setAuthUser(data); 
    } catch (error) {
        toast.error("error in logging in"); 
    }
    finally{
        setLoading(false);
    }
  }
  return{loading,login};
}

export default useLogin


const handleInputErrors=({userName,password})=>{

    if( !userName || !password ){
        toast.error("all fields are mandatory"); 
        return false;
    }
     
     return true;
}

