// Slider.jsx
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

export default function Slider({ images }) {
  if (!images || images.length === 0) return null

  return (
    <div className="px-4 sm:px-6 lg:px-12 xl:px-24">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 3000 }}
        loop
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
        }}
        className="w-full h-[300px] sm:h-[350px] lg:h-[400px]"
      >
        {images.map((item, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={item.image}
              alt={`project slide ${idx}`}
              className="w-full h-full object-cover rounded-xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
