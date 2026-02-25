import ContactUs from '@/components/ContactUs'
import React from 'react'

export default function page() {
  return (
    <div className='mt-[100px] md:py-16 py-0'>
          <div className='shadow-[0px_0px_10px_#ccc] rounded-[10px] sticky top-[100px] md:w-4/5 m-auto container w-full bg-green-100'>
        <div className=" flex flex-col-reverse flex-nowrap md:flex-row py-8 justify-center items-center ">
        <div className="w-full md:w-1/2 m-auto text-center [&_p]:text-black md:text-left md:mb-0 mb-4">
        <ContactUs/>
        </div>
        <div className="w-full md:w-1/2 m-auto">
          <iframe className="w-full relative z-10" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.076227040302!2d78.3738340753374!3d17.456065300822758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93dbcab99651%3A0x58156a027ca9a0cc!2sBizpole%20Hyderabad!5e0!3m2!1sen!2sin!4v1723808011413!5m2!1sen!2sin" width="auto" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
                </div>
    </div>
  )
}
