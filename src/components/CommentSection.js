import { useEffect, useState } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';

// components
import Comment from '../components/Comment';

// router
import Loader from '../loaders/Loader';

export default function PostPage({ user, role, isLoggedIn, postId }) {

    const [ comments, setComments ] = useState([]);
    const [ addComment, setAddComment] = useState('');
    const [ addAuthor, setAuthor] = useState(user);
    const [ addDate, setAddDate] = useState('');
    const [ isLoading, setLoading ] = useState(false);

    function getPosts(){
        axios.get(`${process.env.REACT_APP_GET_POST_URL}/${postId}`)
        .then(function (response){
            setComments(response.data.comments)
        })
        .catch(function (error) {
            throw error;
        });
    }

    function handleDate(){
        const current = new Date();
        const date = `${current.getHours()}:${current.getMinutes()} - ${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;
        setAddDate(date);
    }
    
    useEffect(() => {
        getPosts();
        handleDate();
        setAuthor(user);
        // eslint-disable-next-line
    }, [ postId, user ]);

    function sendComment() {
        setLoading(true);
        axios.post(`${process.env.REACT_APP_SEND_COMMENT_URL}/${postId}/comments`, {
            postId: postId,
            comment: addComment,
            date: addDate,
            author: addAuthor,
        })
        .then(function(response) {
            if(response.data !== "Comment Created"){
                setLoading(false);
                alert("Server Error - Comment not created!");
            } else {
                setLoading(false);
            }
        })
    }

    function unauthorized(){
        alert("You need account to comment! Please sign up or log in.")
    }

    return (
        <StyledCommentSection>
            <h1>Comments</h1>
            {
                isLoading === true ? (
                    <Loader />
                ) : (
                    <div className="comment-maker">
                        <textarea 
                            name="comment" 
                            id="comment" 
                            required
                            onChange={(event) => {
                                setAddComment(event.target.value);
                            }}  
                        />
                        {
                            isLoggedIn === false ? (
                                <button onClick={()=> { unauthorized();}}>Reply</button>
                            ) : (
                                <button onClick={()=> { handleDate(); sendComment();}}>Reply</button>
                            )
                        }
                    </div>
                )
            }
            { 
                comments === undefined ? (
                    <>
                    </>
                ) : (
                    <>
                        {
                            comments.slice().reverse().map((comment, key) => {
                                return (
                                    <Comment
                                        date={comment.date}
                                        author={comment.author}
                                        comments={comment.comment}
                                        commentId={comment._id}
                                        user={user}
                                        postId={postId}
                                        key={key}
                                        role={role}
                                    />
                                )
                            })
                        }
                    </>
                )
            }

        </StyledCommentSection>
    )
}

const StyledCommentSection = styled.div`
width: 98%;
margin: 2% auto;
max-height: 60vh;
border-radius: 12px;
background: #64a5f0;
position: relative;
overflow-y: scroll;
    .undefined {
        width: 98%;
    }
    h1 {
        width: 95%;
        margin: auto;
        color: black;
    }
    .comment-maker {
        width: 98%;
        margin: auto;
        display: flex;
        flex-direction: column;
        textarea {
            border-radius: 6px;
            background: #d6d6d6;
            padding: 2px;
            min-height: 10vh;
        }
        button {
            margin: 1% auto;
            width: 150px;
            cursor: pointer;
            color: white;
            background: #0f4d92;
            border: none;
            border-radius: 6px;
            font-size: 1.2em;
            font-weight: 700;
            @media (max-width: 750px){
                font-size: 1.5em;
            }
            &:hover {
                transform: scale(1.05);
                transition: 0.2s;
                background: #d1d1d1;
                color: black;
            }
        }
    
}
`;