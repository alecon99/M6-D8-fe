import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import '../modPost/buttonModPost.css'
import { useNavigate } from 'react-router-dom';

const ButtonModPost = ({postId}) => {

  const navigate = useNavigate();

  const modPost = ()=>{
    navigate(`/modPost/${postId}`)
  }

  return (
    <button onClick={()=>{modPost()}} id='mod-button'><FontAwesomeIcon className='fs-6' icon={faPen} /></button>
  )
}

export default ButtonModPost
