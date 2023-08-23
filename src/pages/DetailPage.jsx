import React from 'react'
import PostDetail from '../components/postDetail/PostDetail'
import NavigationBar2 from '../components/navBar/NavigationBar2'
import Footer from '../components/footer/Footer'
import Comments from '../components/comments/Comments'

const DetailPage = () => {
  return (
    <>
        <NavigationBar2/>
        <PostDetail/>
        <Comments/>
        <Footer/>
    </>
  )
}

export default DetailPage