import React, { useState } from 'react'
import '../addUser/addUser.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {

    const navigate = useNavigate();

    const [ formData , setFormData ]= useState({})
    const [ file , setFile ]= useState(null)
    
    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }

    const uploadFile = async (image) => {
		const fileData = new FormData();
		fileData.append("avatar", image);

		try {
			const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/author/cloudUploadImg`, {
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
				const uploadedFile = await uploadFile(file);
               
				const postFormData = {
					...formData,
					avatar: uploadedFile.avatar,
				};

				const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/author/newAuthor`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(postFormData),
				});

                navigate('/');

				return response.json();
			} catch (error) {
				console.error("Failed to save the post");
			}
		} else {
			console.error("Please select at least one file to upload");
		}
	};

    return (
        <div id='background_addUser'>
            <div className='mx-3'>
                <h1 className='text-center mb-3'>Registration Form</h1>
                <Container className='bg-white p-1 rounded-4 container shadow'>
                    <Form className='m-2 m-sm-4' encType='multipart/form-data' onSubmit={submitForm}>
                        <h3>User information</h3>
                        <div className='border p-3 mb-3 rounded-4'>
                            <Form.Group className="form_group" controlId="formBasicName" onChange={(e) => setFormData({ ...formData, name: e.target.value })}>
                                <Form.Label className='form_label'>Name</Form.Label>
                                <Form.Control className='form_control' type="text" />
                            </Form.Group>
                            <Form.Group className="form_group" controlId="formBasicSurname" onChange={(e) => setFormData({ ...formData, surname: e.target.value })}>
                                <Form.Label className='form_label'>Surname</Form.Label>
                                <Form.Control className='form_control' type="text" />
                            </Form.Group>
                            <Form.Group className="form_group" controlId="formBasicDate" onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}>
                                <Form.Label className='form_label'>Date of birth</Form.Label>
                                <Form.Control className='form_control' type="date" />
                            </Form.Group>
                            <Form.Group className="form_group" controlId="formBasicAvatar" >
                                <Form.Label className='form_label'>Avatar</Form.Label>
                                <Form.Control className='form_control' type="file" name='avatar' onChange={handleFileChange}/>
                            </Form.Group>
                        </div>
                        <h3>Login credentials</h3>
                        <div className='border p-3 mb-3 rounded-4'>
                            <Form.Group className="form_group" controlId="formBasicEmail" onChange={(e) => setFormData({ ...formData, email: e.target.value })}>
                                <Form.Label className='form_label'>Email</Form.Label>
                                <Form.Control className='form_control' type="email" />
                            </Form.Group>
                            <Form.Group className="form_group" controlId="formBasicPassword" onChange={(e) => setFormData({ ...formData, password: e.target.value })}>
                                <Form.Label className='form_label'>Password</Form.Label>
                                <Form.Control className='form_control' type="password" />
                            </Form.Group>
                        </div>
                        <div className='d-flex justify-content-between mt-4'>
                            <Button variant="success" type="submit">
                                Save
                            </Button>
                            <Link className="btn btn-danger" to={"/"}>
                                Return to login
                            </Link>
                        </div>
                    </Form>
                </Container>
            </div>
        </div>

    )
}

export default AddUser