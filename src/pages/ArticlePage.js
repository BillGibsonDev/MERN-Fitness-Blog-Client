import { useState, useEffect } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';
import { useParams } from 'react-router';

// redux
import { useDispatch } from 'react-redux';
import { getPosts } from '../redux/actions/posts';
import { useSelector } from 'react-redux';

// components
import CommentSection from "../components/CommentSection";

// router
import { Link } from 'react-router-dom';

//images
import Edit from '../images/editIconBlack.png';
import Heart from '../images/heartTrans.png';
import HeartBlue from '../images/heartBlue.png';

export default function BlogArticle({ role, user, isLoggedIn }) {

    const { id } = useParams();
    const dispatch = useDispatch();
    

    const [ username, setUsername] = useState(user);
    const [ postId, setPostId ] = useState(id);

    const [ hasLiked, setHasLiked ] = useState(false);
    
    useEffect(() => {
        setPostId(id);
        setUsername(user);
        dispatch(getPosts());
        handleHasLiked();
        // eslint-disable-next-line
    }, [dispatch, id, user, username, postId]);

    const articles = useSelector((state) => state.posts);

    function handleHasLiked(){
        if ( user === ""){
            console.log("Not Signed In")
        } else {
       axios.post(`${process.env.REACT_APP_FIND_LIKE_URL}/${postId}`, {
			username: username,
            postId: postId,
		})
        .then(function(response){
            if(response.data === "Liked!"){
                setHasLiked(true);
        }})
        .catch(function (error) {
		    console.log(error)
		});
    }}

    function handleAddLike() {
		axios.post(`${process.env.REACT_APP_LIKE_POST_URL}/${postId}`, {
			username: username,
            postId: postId,
		})
        .then(function(response){
            if(response.data === "Like added!"){
                setHasLiked(true);
            }
        })
        .catch(function (error) {
		    console.log(error)
		});
    }

    function handleRemoveLike() {
		axios.post(`${process.env.REACT_APP_REMOVE_LIKE_URL}/${id}`, {
			username: username,
            postId: id,
		})
        .then(function(response){
            if(response.data === "Like removed!"){
                setHasLiked(false);
            }
        })
        .catch(function (error) {
		    console.log(error)
		});
    }

    function handleLoggedIn(){
        alert("You need account to like! Please sign up or log in.")
    }

    return (
        <StyledArticle>
            {
                role === process.env.REACT_APP_ADMIN_SECRET || user === articles.author ? (
                    <div className="icon-container">
                        {
                            isLoggedIn === false ? (
                                    <span>Like <img id="edit" onClick={handleLoggedIn} src={Heart} alt=''/></span>
                            ):isLoggedIn === true && hasLiked === false ? (
                                <span>Like <img id="edit" onClick={handleAddLike} src={Heart} alt='' /></span>
                            ): (
                                <span>Liked <img id="edit" onClick={handleRemoveLike} src={HeartBlue} alt=''/></span>
                            )
                        }
                        <Link to={`/EditPostPage/${postId}`}><img id="edit" src={Edit} alt="" /></Link>
                    </div>
                ) : (
                    <div className="icon-container">
                        {
                            isLoggedIn === false ? (
                                    <span>Like <img id="edit" onClick={handleLoggedIn} src={Heart} alt='' /></span>
                            ):isLoggedIn === true && hasLiked === false ? (
                                <span>Like <img id="edit" onClick={handleAddLike} src={Heart} alt='' /></span>
                            ): (
                                <span>Liked <img id="edit" onClick={handleRemoveLike} src={HeartBlue} alt='' /></span>
                            )
                        }
                    </div>
                )
            }
           { 
                articles.filter(articles => articles._id === `${id}`).map((article, key) => {
                    return (
                        <div className="overlay-content" key={key}>
                            <div className="overlay-wrapper">
                                <h4>{article.postTitle}</h4>
                                <h5>{article.postDate}</h5>
                                <img src={article.thumbnail} alt="" />
                                <p>{article.postIntro}</p>
                                    {
                                        article.sections.map((section, key) =>{
                                            return (
                                                <div className="para-wrapper" key={key}>
                                                    <h6>{section.title}</h6>
                                                    <img src={section.image} alt='' />
                                                    <p>{section.paragraph}</p>
                                                    <a href={section.link} target="_blank" rel="noreferrer">{section.link}</a>
                                                </div>
                                            )
                                        })
                                    }
                                <div className="para-wrapper">
                                    <h6>{article.conclusionTitle}</h6>
                                    <p>{article.conclusion}</p>
                                </div>
                            </div>
                            <CommentSection
                                id="comment-section"
                                user={user}
                                role={role}
                                isLoggedIn={isLoggedIn}
                                postId={id}
                            />
                        </div>
                    )
                })
            }
        </StyledArticle>
    )
}

const StyledArticle = styled.div`
min-height: 20vh;
display: flex;
justify-content: space-between;
flex-direction: column;
margin: 2em auto;
align-items: center;
width: 70%;
border-radius: 14px;
box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.219);
background: #ffffff;
position: relative;
    .icon-container {
        display: flex;
        width: 95%;
        justify-content: space-between;
        margin-top: 10px;
        span {
            display: flex;
            width: 45px;
            align-items: center;
            font-size: 18px;
            img {
                width: 25px;
                margin-left: 4px;
            }
        }
        a {
        width: 45px;
        display: flex;
        width: 25px;
        align-items: center;
        font-size: 18px;
        color: black;
            #edit {
                width: 25px;
                margin-left: 4px
            }
        }
    }
    .overlay-content {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin:  2em auto;
    border-radius: 20px;
        @media (max-width: 750px){
            width: 90%;
        }
        img {
            width: 50%;
            border-radius: 10px;
        }
        .overlay-wrapper{
            width: 95%;
            height: 100%;
            margin: auto;
            h4 {
            font-size: 3em;
                @media (max-width: 750px){
                    font-size: 2.5em;
                }
            }
            h5 {
                font-size: 2em;
                color: gray;
                margin-bottom: 10px;
            }
            p {
                font-size: 2em;
                margin: 20px 0;
                letter-spacing: 0.5px;
                line-height: 1.7;
                a {
                    font-size: 1em;
                }
            }
            .para-wrapper{
                margin:5% 0 10% 0;
                h6 {
                    color: #3b5998;
                    font-size: 3em;
                    margin: 25px 0;
                        @media (max-width: 750px){
                            font-size: 2.5em;
                        }
                }
            }
        }
        
    }
`;