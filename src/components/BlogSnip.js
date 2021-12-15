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
    intro,
    linkTitle,
    date,
    comments,
    likes,
    user
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
            <div className="titleContainer">
                <h4>{title}</h4>
                <h5>{date}</h5>
                <p>{intro}<span>..Continue Reading</span></p>
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
            <img id="thumbnail" src={thumbnail} alt={thumbnail} />
            </Link>
        </StyledSnip>
    )
}

const StyledSnip = styled.div`
height: 40vh;
display: flex;
justify-content: space-between;
margin: 1em 0;
align-items: center;
width: 100%;
border-radius: 14px;
box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.219);
background: #dadada;
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
                    color: black;
                        @media (max-width: 800px){
                            font-size: 1.5em;
                        }
                    }
                h5 {
                    font-size: 1em;
                    color: gray;
                    }
                p {
                    width: 90%;
                    margin: 6px 0;
                    color: black;
                    span {
                        text-decoration: underline;
                        color: #1900fc;
                        font-family: 'Oswald', sans-serif;
                        font-size: 1em;
                        font-weight: 400;
                        cursor: pointer;
                            &:hover {
                                cursor: pointer;
                                transition: 0.3s;
                                color: black;
                            }
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
                    border-top-right-radius: 12px;
                    border-bottom-right-radius: 12px;
                }
            }
`;
