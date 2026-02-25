"use client"
import React from 'react'
import { useState } from 'react';
export default function Accordion(props) {
    const [openSection, setOpenSection] = useState(null);

    const handleToggle = (index) => {
        setOpenSection((prev) => (prev === index ? null : index));
    };
  return (
    <>
            <div className='w-full  m-auto'>
                <div className='border rounded-[10px] my-4 p-[2px] bg-[#F7F5FF]'>

                <div
                    // onOpen={openSection === props.index}
                    onClick={() => handleToggle(props.index)}
                    className='cursor-pointer p-4 flex justify-between items-center'
                >
                    <span className=' text-[16px] md:text-[20px]'>
                        {props.ques}
                    </span>
                    <span className='font-semibold text-[20px]'>
                    {openSection === props.index ? <>-</> : <>+</>}
                    </span>
                </div>

                <div
                    className={`px-4 transition-max-height duration-300 ease-in-out ${openSection === props.index ? 'max-h-screen pb-4' : 'max-h-0 overflow-hidden'}`}
                >
                   <p className='text-[14px] md:text-[18px]'>
                   {props.ans}
                  </p>
                </div>
                </div>
            </div>
        </>
  )
}
