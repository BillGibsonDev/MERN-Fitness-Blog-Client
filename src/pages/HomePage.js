
import { useState, useEffect } from 'react';

// styled
import styled from 'styled-components';

// components
import BlogSnip from '../components/BlogSnip';

// redux
import { useDispatch } from 'react-redux';
import { getPosts } from '../redux/actions/posts';
import { useSelector } from 'react-redux';


export default function HomePage () {

    const [ isLoading, setLoading ] = useState(true);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getPosts());
        setLoading(false)
    }, [dispatch])

    const blogList = useSelector((state) => state.posts);

return (
        <StyledHomePage>
            <div className="blog">
                <div className="blogWrapper">
                    {
                        isLoading === true ? (
                            <div className="loadingContainer">
                                <div className="loader">
                                </div>
                            </div>
                        ) : (
                        blogList.slice().reverse().map((article, key) =>{
                            return(
                                <BlogSnip
                                    id={article._id}
                                    title={article.postTitle}
                                    date={article.postDate}
                                    linkTitle={article.linkTitle}
                                    thumbnail={article.thumbnail}
                                    brief={article.postBrief}
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
width: 100%;
margin: 1em 0;
    .blog {
    display: flex;
    width: 100%;
    height: 100%;
    margin: 1em auto;
    .blogWrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        min-height: 100%;
        margin: 0 auto;
        border-radius: 12px;
        .loadingContainer{
            display: flex;
            width: 100%;
            height: 50vh;
            justify-content: center;
            align-items: center;
            .loader {
                border: 16px solid #f3f3f3;
                border-top: 16px solid #000000;
                border-radius: 50%;
                width: 250px;
                height: 250px;
                animation: spin 2s linear infinite;
                img {
                    width: 120px;
                }
            }
        }
    }
        @keyframes spin {
            0%  { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
}
`;