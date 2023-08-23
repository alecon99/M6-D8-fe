import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "../logIn/logInForm.css"

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const LogInForm = () => {
  const [ loginData, setLoginData] = useState({})

  const navigate = useNavigate();
  
  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/login`,loginData).then((res) => {
        localStorage.setItem("userLoggedIn" , JSON.stringify(res.data.token))
      })

      navigate('/home');

    } catch (error) {
      console.log("password o email non valida")
      alert("inserisci password e email")
    }    
  }

  const handleLoginGithub = ()=>{
    window.location.href= `${process.env.REACT_APP_SERVER_BASE_URL}/auth/github`
  }
  
  return (
    
    <div id='background_logIn' className='text-center d-flex'>
      <Container id='log_form' className='border p-4 rounded-4 shadow bg-white'>
        <h1 className='mb-4'>Log In</h1>
        <Form className=' ' >
          <Form.Group className="mb-3 d-flex align-items-center" controlId="formBasicEmail">
            <FontAwesomeIcon className="me-2 fs-4" icon={faEnvelope} />
            <Form.Control type="email" name="email" placeholder="Email" onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
          </Form.Group>
          <Form.Group className="mb-3 d-flex align-items-center" controlId="formBasicPassword">
            <FontAwesomeIcon className="me-2 fs-4" icon={faKey} />
            <Form.Control type="password" name="password" placeholder="Password" onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
          </Form.Group>
        </Form>
        <div className='d-flex justify-content-between mt-5'>
          <Link className='btn btn-outline-dark' to={'/newAccount'} >
                Create an account
              </Link>
              <Button variant="success" type="submit" onClick={onSubmit}>
                Log In
              </Button>
          <Button onClick={handleLoginGithub} variant="dark" type="submit" >
                GitHub login
          </Button>
        </div>
        
      </Container>
    </div>
  )
}

export default LogInForm