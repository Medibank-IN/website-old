"use client"
import React, { useState } from 'react'
import Image from 'next/image';
export default function Guides(props) {
  const [openSection, setOpenSection] = useState(null);

  const handleToggle = (index) => {
    setOpenSection((prev) => (prev === index ? null : index));
  };
  const renderContent = (content) => {
    // Check if content is HTML (contains HTML tags)
    const isHTML = /<\/?[a-z][\s\S]*>/i.test(content);

    if (isHTML) {
        return <div dangerouslySetInnerHTML={{ __html: content }} />;
    } else {
        return <>{content}</>;
    }
};
  return (
    <div className='w-full  m-auto'>
      <div className='border rounded-[10px] my-4 p-[2px] bg-white border-b '>
        <div onClick={() => handleToggle(props.index)} className={openSection === props.index ? "border-b" : " "} >
          <div
            // onOpen={openSection == props.index}

            className='cursor-pointer bg-white px-4 flex justify-between items-center'
          >
            <Image src={props.img} className='md:w-[100px] w-[60px]' width="256" height="256" alt="image" />
            <span className='font-semibold text-[14px] md:text-[20px]'>
              {props.title}
            </span>
            <span className='font-semibold text-[20px]'>
                    {openSection === props.index ? <>-</> : <>+</>}
                    </span>
          </div>
          {/* <div className={openSection === props.index ? "font-semibold text-[25px] text-center cursor-pointer" : "font-semibold text-[25px] text-center cursor-pointer"}>
            {openSection === props.index ? <>-</> : <>+</>}
          </div> */}
        </div>


        <div
          className={`px-2 transition-max-height duration-300 ease-in-out ${openSection === props.index ? 'max-h-screen pb-4' : 'max-h-0 overflow-hidden'}`}
        >
          <div className='text-[14px] md:text-[16px] py-4' >
           {renderContent(props.desc)}
          </div>
        </div>
      </div>
    </div>
  )
}
