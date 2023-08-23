import { useContext, useEffect } from "react"
import { PostCommentProvider } from '../../context/PostCommentContext';
import Container from "react-bootstrap/esm/Container";
import '../comments/comments.css'
import AddComments from "./AddComments";
import DeleteComment from "./DeleteComment";
import { useParams } from 'react-router-dom';
import { useSession } from "../../middlewares/ProtectedRoutes";

const Comments = () => {

  const { postId } = useParams()
  const session = useSession();

  useEffect(() => {
    setPostId(postId)
  }, [])

  const { comments, isLoading, setPostId, getComments } = useContext(PostCommentProvider)

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center border-top py-3 border-black mt-5">
        <h2 >Comments</h2>
        <AddComments/>
      </div>
      
      { !comments[0]? <div className="text-center p-5">no comments</div>: null}
      { comments && comments.map((comment)=>{
        return(
          <div className=" mb-2 py-2 px-3 bg-light" key={comment._id}>
            <div className="d-flex justify-content-between align-items-center">
              <h5>{comment.title}</h5>
              { comment.author.id === session.id ? <DeleteComment commentId={comment._id}/> : null }
            </div>
            <div>{comment.content}</div>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <img id="comment_author_img" className="me-1" src={comment.author.avatar} alt={comment.author.name}/>
                <div className="me-1">{comment.author.name}</div>
                <div>{comment.author.surname}</div>
              </div>
              <div className="text-end">rate: <span className="fs-2">{comment.rating}</span> / 5</div>
            </div>
          </div>
        )
      })}

    </Container>
  )
}

export default Comments