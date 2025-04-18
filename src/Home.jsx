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

  const rawPhone = units[0]?.phone || ''
  const cleanedPhone = rawPhone.replace(/^0/, '')
  const phone = `20${cleanedPhone}`
  
  return (
    <div className="font-sans text-gray-100 overflow-x-hidden bg-[#0a1d37]">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
          <img src={logo} alt="Logo" className="h-12" />
          {/* يمكنك إضافة روابط تنقل هنا إذا أردت */}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden pt-16">
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
            className="text-4xl sm:text-4xl md:text-5xl mt-52 sm:mt-32 lg:text-6xl font-extrabold mb-6 tracking-wide"
            >
            {name}
          </motion.h1>
          <h1 className='text-3xl py-4 font-semibold pe-4'>
  🚀 Launching New Phase with Unique Apartments and Villas🏢✨
</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mb-12 ">
            {[
              { title: "اسعار تبدأ من", value: `${Number(starting_price).toLocaleString()} LE`, bg: "bg-[#0a1d37]" },
              { title: "مقدم يبدأ من", value: `${parseFloat(down_payment_percent).toFixed(0)}%`, bg: "bg-[#0a1d37]" },
              { title: "قسط", value: `${installment_years} سنين`, bg: "bg-[#0a1d37]" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className={`${item.bg} p-6 text-gray-100  rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all`}
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
        <h2 className="text-3xl font-semibold text-center text-gray-200">مميزات المشروع</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-semibold  p-6 ">
          {[
            { title: "موقع متميز", desc:" ٣ دقائق من مول مصر , ٣ دقائق من وصلة دهشور, ٥ دقائق من ميدان جهينه " },
            { title: "تصميم عصري", desc: " قامت شركة اوراسكوم بوضع افضل الخطط الهندسيه و الاستراتيجيه التي تتبع المواصفات و المعايير الدوليه لكي يتم تصميم الكمبوند بصوره معماريه تمزج بين الحضاره المصريه و الديزاين الاوروبي" }, 
            { title: "مرافق كاملة", desc: 
             "لاند سكيب علي مساحات ضحممه, ١٠% من المساحه مباني و ٩٠% مساحات خضراء, ١٠ حمامات سباحه, ١٠ ملاعب بادل, ١٠ ملاعب تنس, ١٠ ملاعب كره سله, ١٠ ملاعب كره قدم, ١٠ ملاعب كره طائره, ١٠ ملاعب سكواش, ١٠ ملاعب جيمناستك, ١٠ ملاعب اطفال, ١٠ مسارات للدراجات,"
},
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="p-6 bg-gradient-to-r from-[#b5cef1] to-[#e9f2ff] rounded-xl shadow-md text-center"
            >
              <div className="text-4xl text-blue-500 mb-4">🏡</div>
              <h3 className="text-xl font-semibold text-gray-700">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Slider */}
      <Slider images={media_project} />

      {/* Available Units */}
      <div className="max-w-6xl mx-auto my-16 px-4">
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-100">Compact Villas Coming Soon 🚀🏢✨ </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[...units]
  .sort((a, b) => a.type.localeCompare(b.type)) // الترتيب الأبجدي
  .map((unit) => (
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

      <div className="flex justify-between items-center p-4 bg-gray-100">
        <div className="p-4">
          <h3 className="text-2xl font-bold capitalize text-gray-800">{unit.type}</h3>
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
        <h2 className="text-3xl font-semibold text-center mb-8 text-white">OWEST Compound</h2>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <p
            className="text-gray-800 text-right text-xl leading-relaxed"
            dangerouslySetInnerHTML={{ __html: description.replace(/\r\n/g, '<br/>') }}
          />
        </div>
      </motion.div>

      <img src="" alt="" />

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