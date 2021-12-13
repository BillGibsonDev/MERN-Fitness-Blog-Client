import { useState, useEffect } from 'react';

// styled
import styled from 'styled-components';

// router
import { Link } from 'react-router-dom';

// redux
import { useDispatch } from 'react-redux';
import { getPosts } from '../redux/actions/posts';
import { useSelector } from 'react-redux';


export default function ProfilePage({ user, role }) {

    const [ isLoading, setLoading ] = useState(true);
    const dispatch = useDispatch();
    
   useEffect(() => {
        dispatch(getPosts());
        setLoading(false)
    }, [dispatch])

    const articles = useSelector((state) => state.posts);

    return (
        <StyledProfilePage>
            <h1>Profile</h1>
            {
                user === null ? (
                    <h1>You are signed out</h1>
                ) : (
                    <>
                        <div className="user-container">
                            <h2><span>Username: </span>{user}</h2>
                            {
                                role === process.env.REACT_APP_ADMIN_SECRET ? (
                                    <h2><span>Role: </span>Admin</h2>
								) : role === process.env.REACT_APP_AUTHOR_SECRET ? (
                                    <h2><span>Role: </span>Author</h2>
                                ) : role === process.env.REACT_APP_USER_SECRET ? (
                                    <h2><span>Role: </span>User</h2>
                                ) : role === process.env.REACT_APP_GUEST_SECRET ? (
                                    <h2><span>Role: </span>Guest</h2>
                                ) : (
                                    <span>{role}</span>
                                )
                            }
                        </div>
                            {
                                role === process.env.REACT_APP_ADMIN_SECRET || role === process.env.REACT_APP_CREATOR_SECRET ? (
                                    <div className="creator-dashboard">
                                        <Link to="/CreatePostPage">Create Post</Link>
                                        <h4>Your Articles</h4>
                                        {
                                            isLoading === true ? (
                                                <div className="loadingContainer">
                                                    <div className="loader">
                                                    </div>
                                                </div>
                                            ) : (
                                                <> 
                                                    {
                                                        articles.filter(articles => articles.author === `${user}`).map((article, key) => {
                                                            return (
                                                                <div className="article" key={key}>
                                                                    <Link to={`/post/${article.linkTitle}/${article._id}`}>
                                                                        <h5>{article.title}</h5>
                                                                    </Link>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </> 
                                            )
                                        }
                                    </div>
                                ) : (
                                    <></>
                                )
                            }
                    </>
                )
            }
        </StyledProfilePage>
    )
}

const StyledProfilePage = styled.div`
background: #fff;
min-height: 80vh;
border-radius: 20px;
width: 90%;
margin: auto;
display: flex;
align-items: center;
flex-direction: column;
    @media (max-width: 1050px){
        width: 98%;
    }
    h1 {
		font-size: 3em;
		color: #0f4d92;
        margin: 20px auto;
        display: flex;
        justify-content: center;
        width: 50%;
        border-bottom: 2px #0f4d92 solid;
    }
    .user-container {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        width: 60%;
        @media (max-width: 1150px){
            flex-direction: column;
        }
        h2 {
            margin: 20px 0;
            @media (max-width: 1150px){
                margin: 10px 0;
                font-size: 2em;
            }
            span {
                color: #363636;
            }
        }
    }
`;