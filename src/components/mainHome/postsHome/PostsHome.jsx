import { useContext, useEffect } from 'react'
import { PostsProvider } from '../../../context/PostsContext' 
import SingleCard from '../singleCard/SingleCard'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const PostsHome = () => {
    
    const{ posts, isLoading, getPosts } = useContext(PostsProvider)

    useEffect(()=>{
        getPosts()
    },[])

  return (
    <div className='m-3 m-sm-5 px-sm-4 py-5'>
        <Row>
            {posts && posts.map((post)=>{
                return(
                    <Col  key={post._id} xs={12} sm={6} md={6} lg={3}>
                    <SingleCard
                        authorId={post.author._id}
                        postId={post._id}
                        cover={post.cover}
                        title={post.title}
                        content={post.content}
                        category={post.category}
                        avatar={post.author.avatar} 
                        name={post.author.name}
                        surname={post.author.surname}
                    />
                </Col>
                )
            })}
        </Row>
    </div>
  )
}

export default PostsHome