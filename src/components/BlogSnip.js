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
    tag,
    authorUsername
}) {

    const [ hasLiked, setHasLiked ] = useState(false);
    const [ username, setUsername ] = useState(user);

    useEffect(() => {
        setUsername(user);
        function handleHasLiked(){
            if ( user === ""){
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
        handleHasLiked()
        // eslint-disable-next-line
    }, [user])


    return (
        <StyledSnip id={id}>
            <div className="article-wrapper">
                <Link id="thumbnail" to={`/post/${linkTitle}/${id}`}>
                    <img src={thumbnail} alt={thumbnail} />
                </Link>
                <div className="info-wrapper">
                    <Link id="tag" to={`/posts/${tag}`}>{tag}</Link>
                    <Link id="title" to={`/post/${linkTitle}/${id}`}>{title}</Link>
                    <div className="info-container">
                        <Link id="author" to={`/creators/${authorUsername}`}>{author}</Link>
                        <h5>{date}</h5>
                    </div>
                    <div className="interaction-container">
                        {
                            hasLiked === false ? (
                                <span><img src={Heart} alt="" /> {likes}</span>
                            ) : (
                                <span id="blue"><img src={HeartBlue} alt="" /> {likes}</span>
                            )
                        }
                        <span><img src={CommentImage} alt="" /> {comments}</span>
                    </div>
                </div>
            </div>
        </StyledSnip>
    )
}

const StyledSnip = styled.div`
    height: 30vh;
    display: flex;
    justify-content: space-between;
    margin: 1em auto 5em auto;
    align-items: center;
    width: 100%;
    max-width: 875px;
    @media (max-width: 750px){
        height: 100%;
    }
    .article-wrapper {
        display: flex;
        width: 90%;
        height: 100%;
        margin: auto;
        @media (max-width: 750px){
            flex-direction: column;
        }
        #thumbnail {
            width: 50%;
            height: 100%;
            @media (max-width: 750px){
                width: 100%;
            }
            img {
                width: 100%;
                height: 100%;
            }
        }
        .info-wrapper {
            display: flex;
            flex-direction: column;
            width: 46%;
            height: 70%;
            margin: auto;
            @media (max-width: 750px){
                width: 100%;
            }
            a {
                margin: 6px 0;
                @media (max-width: 750px){
                    margin: 3px 0;
                }
                &:hover {
                    text-decoration: underline;
                }
            }
            #tag { 
                font-size: 18px;
                color: #cacaca;
            }
            #title {
                color: white;
                font-size: 20px;
                margin: 6px 0;
                 @media (max-width: 750px){
                    margin: 3px 0;
                }
            }
            .info-container {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 98%;
                margin: 6px auto;
                @media (max-width: 750px){
                    width: 100%;
                    margin: 3px auto;
                }
                #author, h5 {
                    font-weight: 400;
                    color: #cacaca;
                    font-size: 16px;
                }
            }
            .interaction-container {
                display: flex;
                align-items: center;
                width: 98%;
                margin: auto;
                @media (max-width: 750px){
                    width: 100%;
                }
                span {
                    display: flex;
                    align-items: center;
                    margin-right: 16px;
                    img {
                        width: 20px;
                        margin-right: 6px;
                    }
                }
                #blue {
                    color: #4242fa;
                }
            }
        }
    }
`;
