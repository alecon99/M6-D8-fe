import { createContext, useState, useEffect } from "react";

export const PostCommentProvider = createContext();

export const PostCommentContext = ({ children }) => {

    const [ postId, setPostId ] = useState("");
    const [ comments, setComments ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        getComments()
      }, [postId])

    const getComments = async ()=>{
        try {
            setIsLoading(true)
            const data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/comments/`+postId)
            const response = await data.json()
            setComments(response.commentsById)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <PostCommentProvider.Provider value={{ comments, isLoading, setPostId, getComments}}>
            {children}
        </PostCommentProvider.Provider> 
    )

};
