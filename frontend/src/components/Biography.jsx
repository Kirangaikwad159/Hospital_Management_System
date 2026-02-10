import React from 'react'

const Biography = ({imageUrl}) => {
  return (
    <div className='container biography'>
      <div className='banner'>
        <img src={imageUrl} alt="aboutImg" />
      </div>
      <div className='banner'>
        <p>Biography</p>
        <h3>Who We Are</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer facilisis urna ut nulla commodo,
          vel blandit mi viverra. Quisque non risus sed velit lacinia porttitor.
          Suspendisse potenti. Curabitur eget augue eget felis ultricies luctus
           vitae et arcu. Sed vitae tempor justo.
        </p>
        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sed do</p>
        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet magna vel orci sodales,
          vitae tempus nibh faucibus. Integer suscipit velit sed arcu posuere, eget facilisis ipsum
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
        </p>
      </div>
    </div>
  )
}

export default Biography
