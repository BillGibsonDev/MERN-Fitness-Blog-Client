
import { useEffect } from 'react';

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


return (
        <StyledHomePage>
            <div className="blog">
                <div className="blogWrapper">
                    {
                        blogList.map((article, key) =>{
                            return(
                                <BlogSnip
                                id={article._id}
                                title={article.postTitle}
                                date={article.postDate}
                                linkTitle={article.postLinkTitle}
                                thumbnail={article.thumbnail}
                                intro={article.postIntro}
                                //
                                conclusion={article.postConclusion}
                                conclusionHeader={article.postConclusionHeader}
                                // 
                                para1Title={article.postParagraphTitle1}
                                para1={article.postParagraph1}
                                para1Image={article.postImage1}
                                //
                                para2Title={article.postParagraphTitle2} 
                                para2={article.postParagraph2}
                                para2Image={article.postImage2}
                                //
                                para3Title={article.postParagraphTitle3} 
                                para3={article.postParagraph3}
                                para3Image={article.postImage3}
                                //
                                para4Title={article.postParagraphTitle4}
                                para4={article.postParagraph4}
                                para4Image={article.postImage4}
                                //
                                key={key}
                                />
                            )
                        })
                    }
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
        }
    }
`;