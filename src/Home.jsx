// LandingPage.jsx
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'
import { FaWhatsapp, FaPhone } from 'react-icons/fa'
import bg from './assets/bg.jpg'
import Slider from './Slider'
import Footer from './Footer'


const BASE_URL = import.meta.env.VITE_API_BASE_URL

export default function Home() {
  const [project, setProject] = useState(null)

  useEffect(() => {
    fetch(`${BASE_URL}/api/projects/`)
      .then(res => res.json())
      .then(data => setProject(data.results[0]))
      .catch(console.error)
  }, [])

  if (!project) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl animate-pulse">Loading...</div>
      </div>
    )
  }

  const {
    name,
    location,
    description,
    starting_price,
    down_payment_percent,
    installment_years,
    whatsapp,
    media_project,
    units
  } = project

  const phone = units[0]?.phone;
  const countryCode = "+20"; 
  const formattedPhone = `${countryCode}${phone}`;

  return (
    <div className="font-sans text-gray-800">
     {/* Hero Section with Background Image */}
     <div className="relative h-screen w-full overflow-hidden">
  {/* صورة الخلفية */}
  <img
    src={bg}
    alt={name}
    className="absolute w-full h-full object-cover"
  />

  {/* تأثير لمعة بسيطة */}
  <motion.div
    className="absolute w-60 h-60 bg-white/20 rounded-full blur-3xl pointer-events-none"
    animate={{
      x: ["0%", "70%", "0%"],
      y: ["0%", "50%", "0%"],
    }}
    transition={{
      duration: 20,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    style={{ top: "15%", left: "10%" }}
  />

  {/* المحتوى فوق اللمعة */}
  <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white text-center px-4 z-10">
    <motion.h1
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="text-4xl md:text-6xl font-bold mb-12"
    >
      {name}
    </motion.h1>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="p-6 bg-indigo-50 text-gray-900 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition">
        <h3 className="text-xl font-medium">اسعار تبدأ من</h3>
        <p className="mt-2 text-2xl font-bold">
          {Number(starting_price).toLocaleString()} LE
        </p>
      </div>

      <div className="p-6 bg-green-50 text-gray-900 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition">
        <h3 className="text-xl font-medium">مقدم يبدأ من</h3>
        <p className="mt-2 text-2xl font-bold">
          {parseFloat(down_payment_percent).toFixed(0)}%
        </p>
      </div>

      <div className="p-6 bg-yellow-50 text-gray-900 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition">
        <h3 className="text-xl font-medium">قسط</h3>
        <p className="mt-2 text-2xl font-bold">{installment_years} سنين</p>
      </div>
    </div>
  </div>
</div>



          {/* Project Details */}
          <motion.section
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
        }}
        className="max-w-4xl mx-auto my-16 px-4 space-y-6"
      >
     

        
      </motion.section>

      <Slider images={media_project} />

<div className="max-w-6xl mx-auto my-16 px-4">
  <h2 className="text-3xl font-semibold text-center mb-8">
    Available Units
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {units.map(unit => (
      <motion.div
        key={unit.id}
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl overflow-hidden shadow-lg"
      >
        <img
          src={unit.media_unit[0]?.image}
          alt={unit.type}
          className="w-full h-64 object-cover"
        />
        <div className='flex justify-between items-center p-4 bg-gray-100'>
        <div className="p-6">
          <h3 className="text-2xl font-bold capitalize">
            {unit.type}
          </h3>
         
       
          {/* عرض الـ bref */}
          <p className="mt-4 text-gray-600">{unit.bref}</p>
          
        

        </div>
        <div>
              {/* أيقونة الواتساب */}
          <a
            href={`https://wa.me/${formattedPhone}`} // استخدام رقم الهاتف من البيانات
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 mr-4 text-green-500 hover:text-green-600"
          >
            <FaWhatsapp className="text-5xl" />
          </a>

          {/* أيقونة التليفون */}
          <a
            href={`tel:${formattedPhone}`} // استخدام رقم الهاتف من البيانات
            className="inline-block mt-4 text-blue-500 hover:text-blue-600"
          >
            <FaPhone className="text-5xl" />
          </a>
        </div>
        </div>
       
      </motion.div>
    ))}
  </div>
</div>


<div className="max-w-4xl mx-auto my-16 px-4 space-y-6">
  <h2 className="text-3xl font-semibold text-center mb-8 text-green-800">OWEST Compound</h2>
  <div className="bg-white p-6 rounded-xl shadow-lg">
    {/* Render description with line breaks */}
    <p
      className="text-gray-800 text-right text-xl leading-relaxed"
      dangerouslySetInnerHTML={{ __html: description.replace(/\r\n/g, '<br/>') }}
    />  </div>
</div>

<Footer phoneNumber={phone} />
      {/* Floating WhatsApp */}
      <a
        href={`https://wa.me/${formattedPhone}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 z-[99] right-6 bg-green-500 p-4 rounded-full shadow-xl hover:bg-green-600 transform hover:scale-110 transition-all"
      >
        <FaWhatsapp className="text-white text-4xl" />
      </a>
    </div>

    
  )
}
