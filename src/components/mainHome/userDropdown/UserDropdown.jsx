import React from 'react'
import { useSession } from "../../../middlewares/ProtectedRoutes";
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

const UserDropdown = () => {
    const navigate = useNavigate();
    const session = useSession();

    console.log(session);

    const disconnect = () => {
        localStorage.clear()
        navigate('/');
      }

  const myPost = ()=>{
    navigate('/myPost')
  }

  return (
    <Dropdown>
          <Dropdown.Toggle variant="" id="dropdown-basic" className='fs-5'>
            <p className='d-inline fw-bolder text-dark'>{session.name || session.username}</p>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={()=> myPost()}>My post</Dropdown.Item>
            <Dropdown.Item onClick={() => disconnect()} className='text-danger'><FontAwesomeIcon icon={faArrowRightFromBracket} /> disconnect</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
  )
}

export default UserDropdown