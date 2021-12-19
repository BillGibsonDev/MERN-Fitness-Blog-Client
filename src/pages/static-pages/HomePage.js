
import { useState, useEffect } from 'react';

// styled
import styled from 'styled-components';

// components
import BlogSnip from '../../components/BlogSnip';
import Loader from '../../loaders/Loader';

// redux
import { useDispatch } from 'react-redux';
import { getPosts } from '../../redux/actions/posts';
import { useSelector } from 'react-redux';

export default function HomePage ({ user }) {

    const [ isLoading, setLoading ] = useState(true);

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getPosts());
        setLoading(false)
    }, [dispatch])

    const articles = useSelector((state) => state.posts);
    
    return (
        <StyledHomePage>
            <div className="blog">
                <div className="blogWrapper">
                    {
                        isLoading === true ? (
                            <Loader />
                        ) : (
                        articles.slice().reverse().map((article, key) => {
                            return(
                                <BlogSnip
                                    author={article.author}
                                    user={user}
                                    id={article._id}
                                    title={article.postTitle}
                                    date={article.postDate}
                                    linkTitle={article.linkTitle}
                                    thumbnail={article.thumbnail}
                                    comments={article.comments.length}
                                    likes={article.likes.length}
                                    tag={article.tag}
                                    authorUsername={article.authorUsername}
                                    key={key}
                                />
                            )
                        })
                    )}
                </div>
            </div>
        </StyledHomePage >
    )
}

const StyledHomePage = styled.div`
    height: 100%;
    width: 70%;
    margin: 1em auto;
    @media (max-width: 1250px){
        width: 90%;
    } 
    .blog {
        display: flex;
        width: 100%;
        height: 100%;
        margin: 3em auto;
        .blogWrapper {
            display: flex;
            flex-direction: column;
            width: 100%;
            min-height: 100%;
            margin: 0 auto;
            border-radius: 12px;
        }
    }
`;