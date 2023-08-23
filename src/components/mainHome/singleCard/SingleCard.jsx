import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import '../singleCard/singleCard.css'
import { useNavigate } from 'react-router-dom';

import { useSession } from "../../../middlewares/ProtectedRoutes";
import ButtonModPost from '../../modPost/ButtonModPost';

const SingleCard = ({ postId, authorId, cover, title, content, avatar, category, name, surname }) => {
    const navigate = useNavigate();
    const session = useSession();

    const detail = ()=>{
        navigate(`/detail/${postId}`);
    }

    return (
        <Card id='card' className="bg-dark text-white" >
            { authorId === session.id ?  <ButtonModPost postId={postId}/>: null}
            <Card.Img id='card_img' src={cover} alt={title} />
            <Card.ImgOverlay onClick={() => detail()}>
                <Card.Title id='card_title' className='fs-2'>{title}</Card.Title>
                <Card.Text id='card_content'>{content}</Card.Text>
                <div id='card_user' >
                    <Card.Text className='mb-2'>Category: {category}</Card.Text>
                    <div className='d-flex align-items-center'>
                        <img src={avatar} alt={name} />
                        <p className='m-0'>{name} {surname}</p>
                    </div>
                </div>
            </Card.ImgOverlay>
        </Card>
    )
}

export default SingleCard

    