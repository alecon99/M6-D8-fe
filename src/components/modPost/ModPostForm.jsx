import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { useSession } from "../../middlewares/ProtectedRoutes";

const ModPostForm = () => {
    const navigate = useNavigate();
    const session = useSession();

    const [ isLoading, setIsLoading  ] = useState(false)
    const [ category, setCategory ] = useState("")
    const [ title, setTitle ] = useState("")
    const [ value, setValue ] = useState("")
    const [ content, setContent ] = useState("")

    const [ file , setFile ]= useState(null)
    
    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }

    const uploadFile = async (image) => {
		const fileData = new FormData();
		fileData.append("cover", image);

		try {
			const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/post/cloudUploadImg`, {
				method: "POST",
				body: fileData,
			});
			return await response.json();
		} catch (error) {
			console.error("File upload errors occurred");
		}
	};

    const submitForm = async (e) => {
		e.preventDefault();

		if (file) {
			try {
                setIsLoading(true)
				const uploadedFile = await uploadFile(file);
               
				const postFormData = {
                    category: category,
                    title: title,
                    readTime:{
                        value: value,
                        unit: "minutes"
                    },
                    author: session.id,
                    content: content,
					cover: uploadedFile.cover,
				};

				const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/posts`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(postFormData),
				});
                setIsLoading(false)
                navigate('/home');

				return response.json();
			} catch (error) {
				console.error("Failed to save the post");
			}
		} else {
			console.error("Please select at least one file to upload");
            alert('compila tutti i campi del form')
		}
	};

    return (
        <div>
            <div>
                <h1 className='text-center mt-5 pt-5 mb-3'>Modify post</h1>
                <Container className='bg-white p-1'>
                    <Form className='m-2 m-sm-4' encType='multipart/form-data' onSubmit={submitForm}>
                        <div className=''>
                            <Form.Group controlId="formBasicTitle" onChange={(e) => setTitle(e.target.value)}>
                                <Form.Label className='form_label'>Title</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>
                            <Form.Group controlId="formBasicContent" onChange={(e) => setContent(e.target.value)}>
                                <Form.Label className='form_label'>Content</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>
                            <Form.Group controlId="formBasicCover" >
                                <Form.Label className='form_label'>Cover</Form.Label>
                                <Form.Control type="file" name='cover' onChange={handleFileChange} />
                            </Form.Group>
                            <div className='d-flex mt-3'>
                                <Dropdown as={ButtonGroup}>
                                <Button variant="outline-dark" style={{width:"300px"}}>{category ? `${category}`:"select category"}</Button>
                                <Dropdown.Toggle split variant="outline-dark" id="dropdown-split-basic" />   
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => setCategory("Actuality")}>Actuality</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setCategory("Scientific")}>Scientific</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setCategory("Fashion")}>Fashion</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setCategory("Sport")}>Sport</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setCategory("Other")}>Other</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Dropdown>
                                    <Dropdown.Toggle variant="outline-dark" id="dropdown-basic2">
                                        {value ? `${value} minutes`:"select time"}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => setValue(5)}>5 minutes</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setValue(10)}>10 minutes</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setValue(15)}>15 minutes</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between mt-4'>
                            <Button variant="success" type="submit" className='d-flex align-items-center'>
                                Save 
                                {isLoading? <Spinner animation="border" role="status" className='ms-2'></Spinner> : null }
                            </Button>
                        </div>
                    </Form>
                </Container>
            </div>
        </div>
    )
}

export default ModPostForm