"use client";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactUs() {
  const form = useRef();
  const [Status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      validateForm(updatedData);
      return updatedData;
    });
  };

  const validateForm = (data) => {
    const isValid = data.user_name && data.user_email && data.message;
    setIsFormValid(isValid);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_aczee3c", "template_ei9und1", form.current, {
        publicKey: "3-ylVZWMmQV166aWN",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          form.current.reset();
          setFormData({ user_name: "", user_email: "", message: "" });
          setIsFormValid(false);
          setStatus("Message Sent Successfully.");
          setTimeout(() => {
            setStatus("");
          }, 3000);
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-center text-[28px] md:text-[48px] font-bold mb-8">Get in Touch!</h1>
      <form
        ref={form}
        onSubmit={sendEmail}
        className="flex flex-col items-center"
      >
        {/* Row 1: Name and Email */}
        <div className="flex flex-col md:flex-row w-full gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              className="w-full h-10 px-3 rounded-md bg-gray-200 focus:ring focus:ring-purple-400"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="user_email"
              value={formData.user_email}
              onChange={handleChange}
              className="w-full h-10 px-3 rounded-md bg-gray-200 focus:ring focus:ring-purple-400"
            />
          </div>
        </div>

        {/* Row 2: Message */}
        <div className="w-full mb-6">
          <label className="block text-sm font-medium mb-2">Message</label>
          <textarea
            className="w-full h-28 px-3 py-2 rounded-md bg-gray-200 focus:ring focus:ring-purple-400"
            name="message"
            value={formData.message}
            placeholder="Please leave your mobile number and message."
            onChange={handleChange}
          />
        </div>

        {/* Row 3: Submit Button */}
        <div className="w-full text-center">
          <input
            type="submit"
            value="Submit"
            disabled={!isFormValid}
            className={`md:w-[20%] h-10 px-4 text-center text-white font-semibold rounded-md ${
              isFormValid
                ? "bg-purple-600 hover:bg-purple-700 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          />
        </div>
      </form>

      {Status && (
        <p className="mt-4 text-green-600 text-lg font-semibold">{Status}</p>
      )}
    </div>
  );
}
