"use client"
import React, { useState } from "react"

export default function FaqElement(){

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); 
    } else {
      setOpenIndex(index); 
    }
  };

  const faqs = [
    {
      question: "1. What is this website about?",
      answer: "This website helps users to register, login, and manage their accounts easily.",
    },
    {
      question: "2. How do I create an account?",
      answer: "Click on the Register button, fill in your details, and submit the form.",
    },
    {
      question: "3. How do I reset my password?",
      answer: "Go to the Login page and click on Forgot Password to reset your password.",
      }
    ]

  return(
    <>
   
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      
      {faqs.map((faq, index) => (
        <div key={index} className="mb-4 border-b pb-2">
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full text-left flex justify-between items-center focus:outline-none"
          >
            <span className="font-semibold text-gray-800">{faq.question}</span>
            <span>{openIndex === index ? "−" : "+"}</span>
          </button>
          {openIndex === index && (
            <p className="mt-2 text-gray-600 text-sm">{faq.answer}</p>
          )}
        </div>
      ))}
    </div>

    </>
  )
}