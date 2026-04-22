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
          <iframe className="w-full relative z-10" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.387853676798!2d78.38091899999999!3d17.4411408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93547b7c9039%3A0x852fa9e76e4ca65!2sWeWork%20Raheja%20Mindspace%20-%20Coworking%20%26%20Office%20Space%20in%20Madhpur%2C%20Hyderabad!5e0!3m2!1sen!2s!4v1776846733905!5m2!1sen!2s" width="auto" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
                </div>
    </div>
  )
}
