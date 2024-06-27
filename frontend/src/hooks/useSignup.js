import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';


const useSignup = () => {
    const{setAuthUser}=useAuthContext();  
  
    const[loading,setLoading]=useState(false);
    const signup=async({fullName,userName,password,confirmPassword,gender})=>{
       const success=handleInputErrors({fullName,userName,password,confirmPassword,gender});
       if(!success)return;
       setLoading(true); 
       try {
          const res=await fetch("/api/auth/signup",{ 
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({ fullName, userName, password, confirmPassword, gender }),
          })
          const data=await res.json();  
          if(data.error){
            throw new Error(data.error);
          }
        //   console.log(data);
        localStorage.setItem("chat-user", JSON.stringify(data));
        setAuthUser(data);  
       } catch (error) {
        toast.error("cors bro");    
       }
       finally{
        setLoading(false); 
       }
    }
    return {loading,signup};  
}

export default useSignup

const handleInputErrors=({fullName,userName,password,confirmPassword,gender})=>{

    if(!fullName || !userName || !password || !confirmPassword || !gender){
        toast.error("all fields are mandatory");
        return false;
    }
     if(password!==confirmPassword){
        toast.error("password does not match");
		return false;
     }
     if(password.length<6){
        toast.error("password is too small");
		return false;
     }
     return true;
}
