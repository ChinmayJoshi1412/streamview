import React from 'react'

const Hero = () => {
  return (
    <div className='flex flex-col w-full justify-center items-center bg-darkBlue p-10'>
        <p className="flex flex-col text-4xl font-bold text-white p-8 md:text-6xl md:p-6">
            Find the latest <span className='text-pink'>TV Shows</span> and <span className='text-pink'>Movies </span> and <span className='text-pink'>know where you can stream them</span>
        </p>
    </div>
  )
}

export default Hero