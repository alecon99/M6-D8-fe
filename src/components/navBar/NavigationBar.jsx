import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import '../navBar/navigationBar.css'
import UserDropdown from '../mainHome/userDropdown/UserDropdown';

const NavigationBar = () => {

  return (
    <div className="fixed-top border-bottom border-secondary bg-white d-flex justify-content-between align-items-center py-3 px-4">
      <div className='nav_items text-start'>
        <UserDropdown/>
      </div>
      <div className='nav_items text-center'>
        <Link
          className='fs-3 text-dark text-decoration-none'
          to={"/home"}
        >
          WorldNews
        </Link>
      </div>
      <div className='nav_items text-end'>
        <Link
          className='fs-5 text-decoration-none text-dark'
          to={"/addPost"}
        >
          <FontAwesomeIcon className='fs-6' icon={faPlus} /> Add Post
        </Link>
      </div>
    </div>
  )
}

export default NavigationBar