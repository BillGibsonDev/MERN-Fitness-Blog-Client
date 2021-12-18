import { useState, useEffect } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';

// router
import { Link } from 'react-router-dom';

// images
import Heart from '../images/heartTrans.png';
import HeartBlue from '../images/heartBlue.png';
import CommentImage from '../images/comment.png';

export default function BlogSnip({
    id, 
    title, 
    thumbnail, 
    linkTitle,
    date,
    comments,
    likes,
    user,
    author,
    tag
}) {

    const [ hasLiked, setHasLiked ] = useState(false);
    const [ username, setUsername ] = useState(user);

    useEffect(() => {
        setUsername(user);
        handleHasLiked()
        // eslint-disable-next-line
    }, [user])

    function handleHasLiked(){
        if ( user === ""){
            console.log("Not Signed In")
        } else {
       axios.post(`${process.env.REACT_APP_FIND_LIKE_URL}/${id}`, {
			username: username,
            postId: id,
		})
        .then(function(response){
            if(response.data === "Liked!"){
                setHasLiked(true);
        }})
        .catch(function (error) {
		    console.log(error)
		});
    }}

    return (
        <StyledSnip id={id}>
            <Link to={`/post/${linkTitle}/${id}`}>
                <img id="thumbnail" src={thumbnail} alt={thumbnail} />
            <div className="titleContainer">
                <h5>{tag}</h5>
                <h4>{title}</h4>
                <div className="info-container">
                    <h5>{author}</h5>
                    <h5>{date}</h5>
                </div>
                <div className="interaction-container">
                    {
                        hasLiked === false ? (
                            <span><img src={Heart} alt="" /> {likes}</span>
                        ) : (
                            <span><img src={HeartBlue} alt="" /> {likes}</span>
                        )
                    }
                    <span><img src={CommentImage} alt="" /> {comments}</span>
                </div>
            </div>
            </Link>
        </StyledSnip>
    )
}

const StyledSnip = styled.div`
height: 40vh;
display: flex;
justify-content: space-between;
margin: 1em 0 5em 0;
align-items: center;
width: 100%;
    @media (max-width: 750px){
        height: 100%;
    }
    &:hover {
        transform: scale(1.02);
        transition: 0.3s;
    }
    a {
        display: flex;
        width: 100%;
        height: 100%;
            .titleContainer {
            display: flex;
            width: 50%;
            flex-direction: column;
            margin: auto;
            padding-left: 2em;
                @media (max-width: 750px){
                        width: 70%;
                    }
                h4 {
                    font-size: 2em;
                    margin: 6px 0;
                    color: white;
                        @media (max-width: 800px){
                            font-size: 1.5em;
                        }
                    }
                    h5 {
                            font-size: 1em;
                            color: #cccccc;
                        }
                    .info-container {
                        display: flex;
                        justify-content: space-between;
                        h5 {
                            font-size: 1em;
                            color: #cccccc;
                        }
                    }
                    .interaction-container {
                        display: flex;
                        width: 80px;
                        justify-content: space-between;
                        margin-top: 10px;
                        span {
                            display: flex;
                            align-items: center;
                            height: 100%;
                            img {
                                margin-right: 3px;
                                width: 20px;
                            }
                        }
                    }
                }
                #thumbnail {
                    width: 50%;
                    height: 100%;
                }
            }
`;
