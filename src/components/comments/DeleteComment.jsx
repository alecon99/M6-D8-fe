import { useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { PostCommentProvider } from '../../context/PostCommentContext';


const DeleteComment = ({ commentId }) => {

  const { comments, isLoading, setPostId, getComments } = useContext(PostCommentProvider)

    const deleteComment = async () => {
			try {   
          const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/deleteComment/` + commentId, {
					method: "DELETE"
				});
        
        getComments()
			} catch (error) {
				console.error("Failed to delete the comment");
			}
	};

  return (
    <>
      <button className='btn btn-outline-dark' onClick={deleteComment}><FontAwesomeIcon className='fs-6' icon={faTrash}/></button>
    </>
  )
}

export default DeleteComment