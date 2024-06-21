import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
   <div className=' mt-20'>
     <Link to="/" className="primary-btn ml-2"> Downlod Pdf </Link>
     <Link to="/" className="primary-btn ml-2"> Downloard Excel</Link>
    </div> 
  )
}

export default Home
