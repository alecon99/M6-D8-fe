import React from 'react'
import NavigationBar2 from '../components/navBar/NavigationBar2'
import AddPostForm from '../components/addPost/AddPostForm'
import Footer from '../components/footer/Footer'

const addPost = () => {
  return (
    <>
        <NavigationBar2/>
        <AddPostForm/>
        <Footer/>
    </>
  )
}

export default addPost