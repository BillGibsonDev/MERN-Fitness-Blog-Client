import { useState } from 'react';

// axios
import axios from 'axios';

// styled
import styled from 'styled-components';

export default function CreatePostPage() {

    // post heading
    const [postTitle, setPostTitle] = useState("");
    const [postLinkTitle, setPostLinkTitle] = useState("");
    const [postDate, setPostDate] = useState(0);
    const [thumbnail, setThumbnail] = useState('');
    const [postIntro, setPostIntro] = useState('');

    // conclusion
    const [postConclusion, setPostConclusion] = useState('');
    const [postConclusionHeader, setPostConclusionHeader] = useState('');

    // para 1
    const [postParagraphTitle1, setPostParagraphTitle1] = useState('');
    const [postParagraph1, setPostParagraph1] = useState('');
    const [postImage1, setPostImage1] = useState('');

    // para 2
    const [postParagraphTitle2, setPostParagraphTitle2] = useState('');
    const [postParagraph2, setPostParagraph2] = useState('');
    const [postImage2, setPostImage2] = useState('');

    // para 3
    const [postParagraphTitle3, setPostParagraphTitle3] = useState('');
    const [postParagraph3, setPostParagraph3] = useState('');
    const [postImage3, setPostImage3] = useState('');

    // para 4
    const [postParagraphTitle4, setPostParagraphTitle4] = useState('');
    const [postParagraph4, setPostParagraph4] = useState('');
    const [postImage4, setPostImage4] = useState('');


const addToBlog = () => {
    axios.post(`${process.env.REACT_APP_ADD_POST_URL}`, {
        // post heading
        postTitle: postTitle,
        postLinkTitle: postLinkTitle,
        postDate: postDate,
        thumbnail: thumbnail,
        postIntro: postIntro,

        // conclusion 
        postConclusion: postConclusion,
        postConclusionHeader: postConclusionHeader,

        // para 1
        postImage1: postImage1,
        postParagraph1: postParagraph1,
        postParagraphTitle1: postParagraphTitle1,

        // para 2
        postImage2: postImage2,
        postParagraph2: postParagraph2,
        postParagraphTitle2: postParagraphTitle2,

        // para 3
        postImage3: postImage3,
        postParagraph3: postParagraph3,
        postParagraphTitle3: postParagraphTitle3,

        // para 4
        postImage4: postImage4,
        postParagraph4: postParagraph4,
        postParagraphTitle4: postParagraphTitle4,
    });
    alert('Blog Post Added')
};

const clearForm = () =>{
    document.getElementById('title').value = '';
    document.getElementById('linkTitle').value = '';
    document.getElementById('date').value = '';
    document.getElementById('image1').value = '';
    document.getElementById('image2').value = '';
    document.getElementById('image3').value = '';
    document.getElementById('image4').value = '';
    document.getElementById('para1Title').value = '';
    document.getElementById('para2Title').value = '';
    document.getElementById('para3Title').value = '';
    document.getElementById('para4Title').value = '';
    document.getElementById('thumbnail').value = '';
    document.getElementById('intro').value = '';
    document.getElementById('conclusion').value = '';
    document.getElementById('conclusionHeader').value = '';
    alert('Form Cleared')
}

    return (
        <StyledBlogMaker>
            <h1>Hey my guy, looking swell today.</h1>
            <div className="formWrapper">
            <label htmlFor="">Post Title:
            <input
            type="text"
            id="title"
            onChange={(event) => {
                setPostTitle(event.target.value);
            }}
            /></label>
            <label htmlFor="">Post Title(Add '-' to Title):
            <input
            type="text"
            id="linkTitle"
            onChange={(event) => {
                setPostLinkTitle(event.target.value);
            }}
            /></label>

            <label htmlFor="">Post Date:
                <input 
                type="date" 
                id="date"
                onChange={(event) =>{
                setPostDate(event.target.value);
                }}
            /></label>

            <label htmlFor="">Post Thumbnail:
                <input 
                type="file" 
                id="thumbnail"
                onChange={(event) =>{
                setThumbnail(event.target.value);
            }}
            /></label>

            <label htmlFor="">Intro Paragraph:</label>
                <textarea
                id='intro'
                onChange={(event) =>{
                setPostIntro(event.target.value);
                }}
            />

            <label htmlFor="">Paragraph 1 Title:
                <input
                id='para1Title'
                onChange={(event) =>{
                setPostParagraphTitle1(event.target.value);
                }}
                />
            </label>

            <label htmlFor="">Paragraph 1 Image:
                <input 
                type="file" 
                id="image1"
                onChange={(event) =>{
                setPostImage1(event.target.value);
                }}
            /></label>

            <label htmlFor="">Paragraph 1:</label>
                <textarea
                id='para1'
                onChange={(event) =>{
                setPostParagraph1(event.target.value);
                }}
            />

<label htmlFor="">Paragraph 2 Title:
                <input
                id='para2Title'
                onChange={(event) =>{
                setPostParagraphTitle2(event.target.value);
                }}
                />
            </label>

            <label htmlFor="">Paragraph 2 Image:
                <input 
                type="file" 
                id="image2"
                onChange={(event) =>{
                setPostImage2(event.target.value);
                }}
            /></label>

            <label htmlFor="">Paragraph 2:</label>
                <textarea
                id='para2'
                onChange={(event) =>{
                setPostParagraph2(event.target.value);
                }}
            />

<label htmlFor="">Paragraph 3 Title:
                <input
                id='para3Title'
                onChange={(event) =>{
                setPostParagraphTitle3(event.target.value);
                }}
                />
            </label>

            <label htmlFor="">Paragraph 3 Image:
                <input 
                type="file" 
                id="image3"
                onChange={(event) =>{
                setPostImage3(event.target.value);
                }}
            /></label>

            <label htmlFor="">Paragraph 3:</label>
                <textarea
                id='para3'
                onChange={(event) =>{
                setPostParagraph3(event.target.value);
                }}
            />

<label htmlFor="">Paragraph 4 Title:
                <input
                id='para4Title'
                onChange={(event) =>{
                setPostParagraphTitle4(event.target.value);
                }}
                />
            </label>

            <label htmlFor="">Paragraph 4 Image:
                <input 
                type="file" 
                id="image4"
                onChange={(event) =>{
                setPostImage4(event.target.value);
                }}
            /></label>

            <label htmlFor="">Paragraph 4:</label>
                <textarea
                id='para4'
                onChange={(event) =>{
                setPostParagraph4(event.target.value);
                }}
            />

<label htmlFor="">Conclusion Header:
                <input
                id='conclusionHeader'
                onChange={(event) =>{
                setPostConclusionHeader(event.target.value);
                }}
                />
            </label>

            <label htmlFor="">Conclusion:</label>
                <textarea
                id='conclusion'
                onChange={(event) =>{
                setPostConclusion(event.target.value);
                }}
            />

            <div className="buttonWrapper">
                <button onClick={addToBlog}>Submit</button>
                <button id= "clear" onClick={clearForm}>Clear</button>
            </div>
        </div>
        </StyledBlogMaker>
    )
}

const StyledBlogMaker = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
min-height: 100vh;
h1 {
    font-size: 3em;
    margin: 1em 0;
}
.formWrapper {
    display: flex;
    flex-direction: column;
    background: lightgray;
    width: 50%;
    align-items: center;
    border-radius: 12px;
        input, button, textarea {
        width: 200px;
        height: 30px;
    }
    label {
        font-size: 1.5em;
        margin: 10px;
    }
    input {
        margin: 6px;
    }
    textarea {
        width: 400px;
        height: 200px;
    }
    button{
        margin: 12px;
        font-size: 1.5em;
        height: 40px;
        background: lightgreen;
        cursor: pointer;
        &:hover{
            transition: 0.3s;
            transform: scale(1.1);
            background: white;
        }
    }
    #clear {
        opacity: .6;
        background: lightgoldenrodyellow;
        &:hover{
            background: white;
            opacity: 1;
        }
    }

}

`;