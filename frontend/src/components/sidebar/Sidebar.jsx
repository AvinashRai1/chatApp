import React from 'react';
import SearchInput from './SearchInput'; 
import Coversations from './Coversations';
import LogoOut from './LogoOut';

const Sidebar = () => {
  return (
    <div className=' border-r border-slate-500 p-4 flex flex-col'>
      <SearchInput/>
      <div className='divider px-3'></div> 
      <Coversations/>  
      <LogoOut/>    
    </div>
  )
}

export default Sidebar
