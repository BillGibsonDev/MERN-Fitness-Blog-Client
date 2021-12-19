import { useState, useEffect } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';
import { useParams } from 'react-router';

// components
import CommentSection from "../../components/CommentSection";

// loaders
import Loader from '../../loaders/Loader';

// router
import { Link } from 'react-router-dom';

//images
import Edit from '../../images/editIconBlack.png';
import Heart from '../../images/heartTrans.png';
import HeartBlue from '../../images/heartBlue.png';


export default function BlogArticle({ role, user, isLoggedIn }) {

    const { id } = useParams();
    
    const [ username, setUsername] = useState(user);
    const [ postId, setPostId ] = useState(id);
    const [ creator, setCreator ] = useState([]);
    const [ hasLiked, setHasLiked ] = useState(false);
    const [ article, setArticle ] = useState([]);
    const [ authorUsername, setAuthorUsername ] = useState('');
     
    useEffect(() => {
        setPostId(id);
        setUsername(user);
        function getPosts(){
            axios.get(`${process.env.REACT_APP_GET_POST_URL}/${postId}`)
            .then(function(response){
                setArticle(response.data)
                setAuthorUsername(response.data.authorUsername)
            })
        }

        function handleHasLiked(){
        if ( user === ""){
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
        getPosts();
        handleHasLiked();
        // eslint-disable-next-line
    }, [ id, user, username, postId]);


    useEffect(() => {
        function handleCreator(){
            axios.get(`${process.env.REACT_APP_GET_CREATOR_URL}/${authorUsername}`)
            .then(function(response){
                setCreator(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        handleCreator()
        // eslint-disable-next-line
    }, [ authorUsername ]);

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
                article.length === 0 ? (
                    <Loader />
                ) : (
                <>
                    <div className="article-content">
                        <header>
                            <div className="info-container">
                                <h5>{article.postDate}</h5>
                                <Link id="tag-link" to={`/posts/${article.tag}`}>{article.tag}</Link>
                            </div>
                            {
                                role === process.env.REACT_APP_ADMIN_SECRET || user === article.authorUsername ? (
                                    <div className="icon-container">
                                        <Link to={`/EditPostPage/${postId}`}><img id="edit" src={Edit} alt="" /></Link>
                                        {
                                            isLoggedIn === false ? (
                                                <img id="edit" onClick={handleLoggedIn} src={Heart} alt=''/>
                                            ):isLoggedIn === true && hasLiked === false ? (
                                                <img id="edit" onClick={handleAddLike} src={Heart} alt='' />
                                            ): (
                                                <img id="edit" onClick={handleRemoveLike} src={HeartBlue} alt=''/>
                                            )
                                        }
                                    </div>
                                ) : (
                                    <div className="icon">
                                        {
                                            isLoggedIn === false ? (
                                                <img id="edit" onClick={handleLoggedIn} src={Heart} alt='' />
                                            ):isLoggedIn === true && hasLiked === false ? (
                                                <img id="edit" onClick={handleAddLike} src={Heart} alt='' />
                                            ): (
                                                <img id="edit" onClick={handleRemoveLike} src={HeartBlue} alt='' />
                                            )
                                        }
                                    </div>
                                )
                            }
                        </header>
                        <div className="title-container">
                            <h4>{article.postTitle}</h4>
                            <div className="author-header">
                                {
                                    creator[0] === undefined ? (
                                        <h2>No Creator found</h2>
                                    ) : (
                                        <img src={creator[0].avatar}alt="" />
                                    )
                                }
                                <Link to={`/creators/${article.authorUsername}`}>{article.author}</Link>
                            </div>
                        </div>
                        <img id="thumbnail" src={article.thumbnail} alt="" />
                        <div className="para-wrapper">
                            <p>{article.postIntro}</p>
                        </div>
                        {
                            article.sections.map((section, key) =>{
                                return (
                                    <div className="para-wrapper" key={key}>
                                        <img src={section.image} alt='' />
                                        <h6>{section.title}</h6>
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
                        {
                            creator[0] === undefined ? (
                                <h2>No Creator found</h2>
                            ) : (
                                <footer>
                                    <img src={creator[0].avatar} alt="" />
                                    <div className="author-info-wrapper">
                                        <Link to={`/creators/${article.authorUsername}`}>{article.author}</Link>
                                        <p>{creator[0].bio}</p>
                                    </div>
                                </footer>
                            )
                        }
                        <CommentSection
                            id="comment-section"
                            user={user}
                            role={role}
                            isLoggedIn={isLoggedIn}
                            postId={id}
                        />
                    </div>
                </>
            )
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
    @media (max-width: 1250px){
        width: 100%;
    }
    .article-content {
        position: relative;
        width: 90%;
        display: flex;
        flex-direction: column;
        margin:  2em auto;
        border-radius: 20px;
        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 10px auto;
            width: 100%;
            @media (max-width: 750px){
                flex-direction: column;
            }
            .info-container, .icon-container {
                display: flex;
                width: 25%;
                justify-content: space-between;
                align-items: center;
                @media (max-width: 1000px){
                    width: 30%;
                    margin: auto;
                }
                @media (max-width: 750px){
                    width: 100%;
                    margin: auto;
                }
                h5, a {
                    font-size: 16px;
                    width: 50%;
                }
                #tag-link {
                    width: 50%;
                    justify-content: flex-end;
                    &:hover {
                            text-decoration: underline;
                        }
                    }
                #edit {
                    width: 25px;
                    margin-left: 4px;   
                }
            }
            .icon {
                    margin: 6px 0;
                    width: 100%;
                    display: flex;
                    justify-content: flex-end;
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
            .title-container {
                width: 100%;
                height: 100%;
                margin: 10px auto;
                h4 {
                    font-size: 30px;
                    margin-bottom: 10px;
                    @media (max-width: 750px){
                        font-size: 2.5em;
                    }
                }
                .author-header {
                    display: flex;
                    width: 100px;
                    justify-content: space-between;
                    align-items: center;
                    img {
                        height: 30px;
                        width: 30px;
                    }
                    a {
                        font-size: 16px;
                        color: gray;
                        &:hover {
                            text-decoration: underline;
                        }
                    }
                }
            }
        #thumbnail {
            margin-top: 20px;
            width: 100%;
            max-width: 900px;
            @media (max-width: 550px){
                display: none;
            }
        }
        .para-wrapper{
            margin: 10px auto 50px auto;
            img {
                width: 60%;
            }
                p {
                font-size: 20px;
                margin: 6px 0;
                letter-spacing: 0.5px;
                line-height: 1.7;
                a {
                    font-size: 1em;
                }
            }
            h6 {
                color: #3b5998;
                font-size: 2em;
                margin-bottom: 6px;
                @media (max-width: 750px){
                    font-size: 2.5em;
                }
            }
        }
        footer {
            display: flex;
            align-items: center;
            border-top: 2px solid #3b5998;
            border-bottom: 2px solid #3b5998;
            padding: 10px 0;
            img {
                width: 50px;
            }
            .author-info-wrapper {
                margin-left: 6px;
                h5 {
                    font-size: 16px;
                }
                p {
                    font-size: 12px;
                }
            }

        }
        
    }
`;