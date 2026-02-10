import React from 'react'

const Hero = ({title, imageUrl}) => {
  return (
    <div className='hero container'>
      <div className='banner'>
        <h1>{title}</h1>
        <p>
          ZeeCare Medical Institute is a stack-of-the-art facility dedicated to 
          providing comprehensive healthCare services with compassion and 
          expertise. Out time of skilled professional is committed tozed 
          delivering personalized care tailored to each patient's needs. At
          ZeeCare, we prioritize you well-being, ensuring a harmonious journery
          towards optional health and wellness.
        </p>
      </div>
      <div className='banner'>
        <img src={imageUrl} alt="hero" className='animated-image' />
        <span>
          <img src="/vector.png" alt='vector' />
        </span>
      </div>
    </div>
  )
}

export default Hero
