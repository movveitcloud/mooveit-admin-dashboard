import React from 'react'
import { DashboardLayout } from '../../components'
import { useState } from 'react'
import {Users,Partners} from '../../components'
const ManageAccounts = () => {
  const [activeButton,setActiveButton]=useState("users")
  return (
    <DashboardLayout>
      <div className='flex space-x-5 mb-4'>
     
        <button onClick={(()=>setActiveButton("users"))} className={`${activeButton=== "users" ? "bg-[#DCDCFF] text-[#4543A5]": "bg-[#EEEEEE] text-[#BBBBBB]" } bg-[#DCDCFF] p-4 px-4 md:p-6 md:px-10 rounded-md  flex items-center align-middle justify-center text-xl md:text-2xl`}>
          Users
          <div className={` ${activeButton=== "users" ? "bg-[#4543A5]": "bg-[#BBBBBB]" } ml-2 text-white md:text-[14px] text-[10px] rounded-md p-2 h-6 flex align-middle items-center`}>32.8k</div>
        </button>
       
        
      
        <button onClick={(()=>setActiveButton("partners"))} className={`${activeButton=== "partners" ? "bg-[#DCDCFF] text-[#4543A5]": "bg-[#EEEEEE] text-[#BBBBBB]" } bg-[#DCDCFF] p-4 px-4 md:p-6 md:px-10 rounded-md text-[#4543A5] flex items-center align-middle justify-center text-xl md:text-2xl`}>
          Partners
          <div className={` ${activeButton=== "partners" ? "bg-[#4543A5]": "bg-[#BBBBBB]" } ml-2 text-white md:text-[14px] text-[10px] rounded-md p-2 h-6 flex align-middle items-center`}>32.8k</div>
        </button>
      </div>
    
     {activeButton==="users" ? <Users/> : <Partners/>}
      </DashboardLayout>
  )
}

export default ManageAccounts
