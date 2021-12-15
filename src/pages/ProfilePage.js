import { useState, useEffect } from 'react';
import axios from 'axios';

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
    const [ joinDate, setJoinDate ] = useState("");

    const dispatch = useDispatch();
    
   useEffect(() => {
        dispatch(getPosts());
        handleJoinDate();
        setLoading(false)
    }, [dispatch])

function handleJoinDate() {
		let tokenPW = sessionStorage.getItem("tokenPW");
		let tokenUser = sessionStorage.getItem("tokenUser");
		axios.post(`${process.env.REACT_APP_LOGIN_URL}`, {
			username: tokenUser,
			password: tokenPW,
		})
		.then(function(response){
			let tokenPW = sessionStorage.getItem("tokenPW");
			let tokenUser = sessionStorage.getItem("tokenUser");
			if (response.data === "LOGGED IN"){
				axios.post(`${process.env.REACT_APP_GET_DATE_URL}`, {
					username: tokenUser, 
					password: tokenPW,
				})
				.then((response) => {
					setJoinDate(response.data)
				})
			}
		})
		.catch(function (error) {
		throw error;
		});
	}


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
								) : role === process.env.REACT_APP_CREATOR_SECRET ? (
                                    <h2><span>Role: </span>Creator</h2>
                                ) : role === process.env.REACT_APP_USER_SECRET ? (
                                    <h2><span>Role: </span>User</h2>
                                ) : role === process.env.REACT_APP_GUEST_SECRET ? (
                                    <h2><span>Role: </span>Guest</h2>
                                ) : (
                                    <span>{role}</span>
                                )
                            }
                            <h2><span>Joined: </span>{joinDate}</h2>
                        </div>
                            {
                                role === process.env.REACT_APP_ADMIN_SECRET || role === process.env.REACT_APP_CREATOR_SECRET ? (
                                    <div className="creator-dashboard">
                                        <h3>Creator Dashboard</h3>
                                        <div className="link-container">
                                        <Link to="/CreatePostPage">Create Post</Link>
                                            {
                                                role === process.env.REACT_APP_ADMIN_SECRET ? (
                                                    <Link to="/CreateUser">Create User</Link>
                                                ) : (
                                                    <></>
                                                )
                                            }
                                        </div>
                                        <h4>Your Articles</h4>
                                        {
                                            isLoading === true ? (
                                                <div className="loadingContainer">
                                                    <div className="loader">
                                                    </div>
                                                </div>
                                            ) : isLoading === false && articles.filter(articles => articles.author === `${user}`).length === 0 ? (
                                                <p>No Articles Found</p>
                                            ) : (
                                                <> 
                                                    {
                                                        articles.filter(articles => articles.author === `${user}`).map((article, key) => {
                                                            return (
                                                                <Link id="article" to={`/post/${article.linkTitle}/${article._id}`} key={key}>{article.postTitle}</Link>
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
background: #132d66;
min-height: 80vh;
border-radius: 20px;
width: 90%;
margin: 2em auto;
display: flex;
align-items: center;
flex-direction: column;
    @media (max-width: 1050px){
        width: 98%;
    }
    h1 {
		font-size: 3em;
		color: #ffffff;
        margin: 20px auto;
        display: flex;
        justify-content: center;
        width: 50%;
        border-bottom: 2px #ffffff solid;
    }
    .user-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 80%;
        @media (max-width: 1150px){
            flex-direction: column;
        }
        h2 {
            margin: 20px 0;
            color: white;
            @media (max-width: 1150px){
                margin: 10px 0;
                font-size: 2em;
            }
            span {
                color: #c0c0c0;
            }
        }
    }
    .creator-dashboard {
        display: flex;
        flex-direction: column;
        width: 90%;
        margin-top: 3em;
        h3 {
            color: white;
            border-bottom: 2px solid white;
        }
        .link-container {
            display: flex;
            justify-content: space-between;
            width: 60%;
            margin: 6px 0 10px 0;
            a {
                font-size: 2em;
                color: white;
                &:hover {
                    color: blue;
                }
            }
        }
        h4 {
            color: white;
            font-size: 2em;
        }
        p {
            color: white;
            margin: 6px 0;
            font-size: 1em;
        }
    
        #article {
            display: flex;
            align-items: center;
            background: #ffffff;
            border: 2px white solid;
            border-radius: 8px;
            padding: 0 10px;
            width: 300px;
            min-height: 40px;
            margin: 10px 0;
            color: black;
            transition: 0.2s;
            font-size: 20px;
            &:hover {
                transform: scale(1.05);
                background: #fff;
                border: 2px black solid;
            }
        }
    }
`;