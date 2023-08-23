import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { PostsProvider } from '../../context/PostsContext'
import { PostDetailProvider } from '../../context/PostDetailContext';
import Container from 'react-bootstrap/Container';
import '../postDetail/postDetail.css'
import { PostCommentProvider } from '../../context/PostCommentContext';

const PostDetail = () => {

  const { postId } = useParams()
  const { posts, isLoading, getPosts } = useContext(PostsProvider)
  const { postDetail, setPostDetail } = useContext(PostDetailProvider)
  const { comments, setPostId, getComments } = useContext(PostCommentProvider)

  useEffect(() => {
    filterPosts()
    setPostId(postId)
  }, [])

  const filterPosts = () => {
    const filterPosts = posts.filter((post) => post._id.includes(postId));
    setPostDetail(filterPosts);
  }

  return (
    <div className='mt-5 pt-5'>
      <Container>
        <div className='d-flex justify-content-between align-items-center mt-1'>
          <div className='d-flex align-items-center'>
            <img id='author_img' src={postDetail[0].author.avatar} alt={postDetail[0].author.name} />
            <p className='ps-2 m-0'>{postDetail[0].author.name} {postDetail[0].author.surname}</p>
          </div>
          <p className='m-0'>Category | {postDetail[0].category}</p>
          <p className='m-0'>Read time | {postDetail[0].readTime.value} min</p>
        </div>
        <h1 className='fs-1 my-2'>{postDetail[0].title}</h1>
        <div className='my-3 text-center'>
          <img id='postDaetail_img' src={postDetail[0].cover} alt={postDetail[0].title} />
        </div>
        
        <p>{postDetail[0].content}</p>
      </Container>
    </div>
    

  )
}

export default PostDetail