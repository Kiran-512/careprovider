import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
 return (
  <div>
   <h1>Sorry! You have came across wrong path</h1>
   <h3> Wanna go home <Link to='/' >Click Here...!</Link> </h3>
  </div>
 )
}

export default Error
