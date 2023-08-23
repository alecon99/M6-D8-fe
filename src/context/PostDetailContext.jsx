import { createContext, useState } from "react";

export const PostDetailProvider = createContext();

export const PostDetailContext = ({ children }) => {

    const [postDetail, setPostDetail] = useState([
        { category: "",
          title: "",
          cover:"",
          readTime:{
            value: "", 
            unit: "",
          },
          author: "",
          content: "",
          comments: "" 
        }
      ])

    return(
        <PostDetailProvider.Provider value={{ postDetail, setPostDetail }}>
            {children}
        </PostDetailProvider.Provider>
    )

};
