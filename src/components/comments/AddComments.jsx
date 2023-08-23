import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Form from 'react-bootstrap/Form';
import { useSession } from "../../middlewares/ProtectedRoutes";
import { useParams } from 'react-router-dom';
import { PostCommentProvider } from '../../context/PostCommentContext';

const AddComments = () => {

    const { comments, isLoading, setPostId, getComments } = useContext(PostCommentProvider)

    const [show, setShow] = useState(false);
    const [ formData , setFormData ]= useState({})

    const session = useSession();
    const { postId } = useParams()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const submitForm = async (e) => {
		e.preventDefault();
        handleClose()

			try {               
				const commentFormData = {
					...formData,
                    postId: postId,
					author: {
                        name: session.name,
                        surname: session.surname,
                        avatar: session.avatar,
                        id: session.id
                    }
				};

				const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/newComment/` + postId, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(commentFormData),
				});

                getComments()

				return response.json();
			} catch (error) {
				console.error("Failed to save the post");
			}
	};
    
  return (
    <>
        <Button variant="" onClick={handleShow}>
            <FontAwesomeIcon className='fs-6' icon={faPlus} /> Add comment
        </Button>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Create a new comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form className='m-2 m-sm-4' encType='multipart/form-data'>
            <Form.Group controlId="formBasicTitle">
                <Form.Label className='form_label'>Title</Form.Label>
                <Form.Control type="text" onChange={(e) => setFormData({ ...formData, title: e.target.value })}/>
            </Form.Group>
            <Form.Group controlId="formBasicContent">
                <Form.Label className='form_label'>Content</Form.Label>
                <Form.Control type="text" onChange={(e) => setFormData({ ...formData, content: e.target.value })}/>
            </Form.Group>
            <Form.Group controlId="formBasicRate">
                <Form.Label className='form_label'>Rate</Form.Label>
                <Form.Control type="text" min={1} max={5} onChange={(e) => setFormData({ ...formData, rating: e.target.value })}/>
            </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="outline-success" onClick={submitForm} type='submit'>
            Save Changes
            </Button>
        </Modal.Footer>
        </Modal>
    </>
  )
}

export default AddComments