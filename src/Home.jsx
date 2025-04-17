import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'
import { FaWhatsapp, FaPhone, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'
import bg from './assets/bg.jpg'
import logo from './assets/logo.jpg' // افترضت وجود صورة للوجو
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

  const phone = units[0]?.phone

  return (
    <div className="font-sans text-gray-800 overflow-x-hidden">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
          <img src={logo} alt="Logo" className="h-12" />
          {/* يمكنك إضافة روابط تنقل هنا إذا أردت */}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden pt-24">
        <motion.img
          src={bg}
          alt={name}
          className="absolute w-full h-full object-cover"
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-4 z-10">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-wide"
            >
            {name}
          </motion.h1>
          <h1 className='text-3xl py-4 font-semibold pe-4'>
  🚀 Launching New Phase with Unique Apartments 🏢✨
</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
            {[
              { title: "اسعار تبدأ من", value: `${Number(starting_price).toLocaleString()} LE`, bg: "bg-indigo-100" },
              { title: "مقدم يبدأ من", value: `${parseFloat(down_payment_percent).toFixed(0)}%`, bg: "bg-green-100" },
              { title: "قسط", value: `${installment_years} سنين`, bg: "bg-yellow-100" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className={`${item.bg} p-6 text-gray-900 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all`}
              >
                <h3 className="text-xl font-medium">{item.title}</h3>
                <p className="mt-2 text-2xl font-bold">{item.value}</p>
              </motion.div>
            ))}
          </div>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-8 bg-white text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transform hover:scale-110 transition-all"
          >
            اكتشف المزيد
          </motion.button>
        </div>
      </div>

      {/* Project Details (Placeholder) */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto my-16 px-4 space-y-6"
      >
        <h2 className="text-3xl font-semibold text-center text-gray-800">مميزات المشروع</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "موقع متميز", desc: "قريب من جميع الخدمات" },
            { title: "تصميم عصري", desc: "وحدات مصممة بعناية" },
            { title: "مرافق كاملة", desc: "حمامات سباحة ونوادي" },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="p-6 bg-white rounded-xl shadow-md text-center"
            >
              <div className="text-4xl text-blue-500 mb-4">🏡</div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Slider */}
      <Slider images={media_project} />

      {/* Available Units */}
      <div className="max-w-6xl mx-auto my-16 px-4">
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">الوحدات المتاحة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {units.map((unit) => (
            <motion.div
              key={unit.id}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg relative"
            >
              <img
                src={unit.media_unit[0]?.image}
                alt={unit.type}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                <button className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-200">
                  عرض التفاصيل
                </button>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-100">
                <div className="p-4">
                  <h3 className="text-2xl font-bold capitalize">{unit.type}</h3>
                  <p className="mt-2 text-gray-600">{unit.bref}</p>
                </div>
                <div className="flex space-x-4">
                  <a
                    href={`https://wa.me/${phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 hover:text-green-600"
                  >
                    <FaWhatsapp className="text-3xl" />
                  </a>
                  <a
                    href={`tel:${phone}`}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <FaPhone className="text-3xl" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Description */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto my-16 px-4 space-y-6"
      >
        <h2 className="text-3xl font-semibold text-center mb-8 text-green-800">OWEST Compound</h2>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <p
            className="text-gray-800 text-right text-xl leading-relaxed"
            dangerouslySetInnerHTML={{ __html: description.replace(/\r\n/g, '<br/>') }}
          />
        </div>
      </motion.div>

      {/* Footer */}
      <Footer phoneNumber={phone} />

      {/* Floating WhatsApp */}
      <motion.a
        href={`https://wa.me/${phone}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 p-4 rounded-full shadow-xl hover:bg-green-600 z-[99]"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <FaWhatsapp className="text-white text-4xl" />
      </motion.a>

      {/* Floating Phone Icon */}
      <motion.a
        href={`tel:${phone}`}
        className="fixed bottom-6 left-6 bg-blue-500 p-4 rounded-full shadow-xl hover:bg-blue-600 z-[99]"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <FaPhone className="text-white text-4xl" />
      </motion.a>
    </div>
  )
}