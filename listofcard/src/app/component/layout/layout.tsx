
import React from 'react'
 import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Layout = () => {
  return (
    <div>
      <div className='flex justify-between'>
      <div>
        <h1 className='title'>opportunities</h1>
        <p className='text-medium text-[#7C8493] font-[Epilogue] font-light pl-3'>showing 73 result</p>
      </div>
      <div className='pt-4'>
        <span className='text-xl text-[#7C8493] font-[Epilogue] font-medium'>sortby:</span>
        <span  className='text-2xl text-[#25324B] pr-16 font-medium'>most relevant<ArrowDropDownIcon/></span>
        </div>
      </div>
    </div>
  )
}
export default Layout