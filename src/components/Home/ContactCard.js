import React from 'react'

const ContactCard = () => {
  return (
    <div className="py-16">
        <div className="container mx-auto flex gap-20 flex-col md:flex-row items-center">
        <div className="md:w-2/3 ">
            <iframe
              className="w-[90%] h-64 rounded-[20px]"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.0676962975026!2d78.3737762749364!3d17.456473683442557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93da776e3347%3A0xd43f52aa73cb4014!2sBizness%20Square!5e0!3m2!1sen!2sin!4v1732107222387!5m2!1sen!2sin"
              loading="lazy"
            ></iframe>
          </div>
          <div className="md:w-1/3 text-center md:text-left mb-8 md:mb-0">
            <h3 className="text-[#000339] text-[47px] font-bold mb-2">Contact Us</h3>
            <p className='text-[20px]'>MediBank</p>
            <p className='text-[20px]'>4th Floor, Bizness Square</p>
            <p className='text-[20px]'>Hitech City Rd, HITEC City</p>
            <p className='text-[20px]'>Hyderabad, Telangana 500081</p>
            <a href="mailto:contact@medibank.in" className="text-[20px] text-blue-600">
              contact@medibank.in
            </a>
          </div>
          
        </div>
      </div>
  )
}

export default ContactCard