
import { useState, useEffect } from 'react';

// styled
import styled from 'styled-components';

// components
import BlogSnip from '../components/BlogSnip';

// redux
import { useDispatch } from 'react-redux';
import { getPosts } from '../actions/posts';
import { useSelector } from 'react-redux';


export default function HomePage () {

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    const blogList = useSelector((state) => state.posts);

    const [ isLoading, setLoading ] = useState(false);

    console.log(setLoading);
return (
        <StyledHomePage>
            <div className="blog">
                {isLoading === true ? (
                    <div className="loadingContainer">
                        <div className="loader">
                        </div>
                    </div>
                ) : (
                <div className="blogWrapper">
                    {
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
                    }
                </div>
                )}
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
        }
    }
`;