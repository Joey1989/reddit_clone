import React from 'react'
import { Link } from 'react-router-dom'

export default function GoBackLink({destination, url}) {
  return (
    <div className='GoBackLink'>
        <Link to={url} >
            <i className='bi bi-box-arrow-left'></i>
            {destination}
        </Link>
    </div>
  )
}
