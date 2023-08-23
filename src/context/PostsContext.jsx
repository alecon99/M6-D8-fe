import { createContext, useState } from "react";

export const PostsProvider = createContext();

export const PostsContext = ({ children }) => {

    const [ posts, setPosts ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);

    const getPosts = async ()=>{
        try {
            setIsLoading(true)
            const data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/posts`)
            const response = await data.json()
            setPosts(response.posts)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <PostsProvider.Provider value={{ posts, isLoading, getPosts}}>
            {children}
        </PostsProvider.Provider>
    )

};

