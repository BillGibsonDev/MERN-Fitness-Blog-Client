import { useState, useEffect } from 'react';

// axios
import axios from 'axios';

// styled
import styled from 'styled-components';

// router
import  { useParams } from 'react-router-dom';

export default function EditPostPage({user, role}) {

    const { postId } = useParams();

    const [ article, setArticle ] = useState("");
    const [ postTitle, setPostTitle ] = useState("");
    const [ linkTitle, setLinkTitle ] = useState("");
    const [ postDate, setPostDate ] = useState(0);
    const [ thumbnail, setThumbnail ] = useState('');
    const [ postIntro, setPostIntro ] = useState('');
    const [ author, setAuthor ] = useState(user);
    const [conclusion, setConclusion] = useState('');
    const [conclusionTitle, setConclusionTitle] = useState('');
    const [ sectionHelper, setSectionHelper ] = useState([]);
    const handlePost = () => {
    axios.get(`${process.env.REACT_APP_GET_POST_URL}/${postId}`, {
        postId: postId,
    })
    .then(function(response){
        setArticle(response.data)
    })
    .catch(function (error) {
		console.log(error);
	});
};


useEffect(() => {
    handlePost(postId)
    setSectionHelper(article.sections)
}, [postId])

console.log(sectionHelper)

 const [inputFields, setInputFields] = useState([
        { 
            paragraph: "", 
            title: '', 
            image: '', 
            link: '' ,
        }
    ]);


const handleUpdate = () => {
    axios.post(`${process.env.REACT_APP_UPDATE_POST_URL}/${postId}`, {
        // post heading
        postId: postId,
        author: author,
        postTitle: postTitle,
        linkTitle: linkTitle,
        postDate: postDate,
        thumbnail: thumbnail,
        postIntro: postIntro,

        // sections
        sections: inputFields,
  
        // conclusion 
        conclusion: conclusion,
        conclusionTitle: conclusionTitle,

    })
    .then(function(response){
        if(response === "Post Updated"){
            alert('Blog Post Added')
        }
        console.log(response)
    })
    .catch(function (error) {
		console.log(error);
	});
};

const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ paragraph: '', title: '', image: '', link: '' });
    setInputFields(values);
  };

  const handleRemoveFields = index => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleInputChange = (index, event) => {
    const values = [article.sections];
    if (event.target.name === "paragraph") {
      values[index].paragraph = event.target.value;
    } else if(event.target.name === "title") {
      values[index].title = event.target.value;
    } else if (event.target.name === "image"){
        values[index].image = event.target.value;
    } else {
        values[index].link = event.target.value;
        }

    setInputFields(values);
  };

const clearForm = () =>{
    window.location.reload();
    alert('Form Cleared')
}

    return (
        <StyledEditPage>
            {
                article === "" ? (
                    <h3>No article found</h3>
                ):(
            <div className="formWrapper">
                <section id="intro">
                    <div className="info-container">
                        <div className="input-container">
                            <label>Post Title:
                            <input
                                type="text"
                                id="title"
                                defaultValue={article.postTitle}
                                onChange={(event) => {
                                    setPostTitle(event.target.value);
                                }}
                            /></label>
                            <label>Post Title(Add '-' to Title):
                            <input
                                type="text"
                                id="linkTitle"
                                defaultValue={article.linkTitle}
                                onChange={(event) => {
                                    setLinkTitle(event.target.value);
                                }}
                            /></label>

                            <label>Post Date:
                                <input 
                                type="date" 
                                id="date"
                                defaultValue={article.postDate}
                                onChange={(event) =>{
                                    setPostDate(event.target.value);
                                }}
                            /></label>

                            <label>Post Thumbnail:
                                <input 
                                type="text" 
                                id="thumbnail"
                                defaultValue={article.thumbnail}
                                onChange={(event) =>{
                                    setThumbnail(event.target.value);
                                }}
                            /></label>
                        </div>
                    </div>
                    <label className="paragraph-textarea">Intro Paragraph:
                        <textarea
                            id='intro'
                            defaultValue={article.postIntro}
                            onChange={(event) =>{
                                setPostIntro(event.target.value);
                            }}
                    /></label>
                </section>
                { 
                   article.sections.map((section, index) => {
                        return (
                            <section id="paragraph-section" key={index}>
                                <div className="info-container">
                                    <div className="input-container">
                                        <label>Title
                                            <input
                                                type="text"
                                                id="title"
                                                name="title"
                                                defaultValue={section.title}
                                                onChange={event => handleInputChange(index, event)}
                                        /></label>
                                        <label>Link
                                            <input
                                                type="text"
                                                id="link"
                                                name="link"
                                                defaultValue={section.link}
                                                onChange={event => handleInputChange(index, event)}
                                        /></label>
                                        <label>Image
                                            <input
                                                type="text"
                                                id="image"
                                                name="image"
                                               defaultValue={section.image}
                                                onChange={event => handleInputChange(index, event)}
                                        /></label>
                                    </div>
                                    <label>Paragraph
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            id="paragraph"
                                            name="paragraph"
                                            defaultValue={section.paragraph}
                                            onChange={event => handleInputChange(index, event)}
                                    /></label>
                                </div>
                                <div className="button-container">
                                    <button onClick={handleAddFields}>Add Paragraph</button>
                                    {
                                        inputFields.length === 1 ? (
                                            <button>Remove</button>
                                        ):(
                                            <button onClick={handleRemoveFields}>Remove</button>
                                        )
                                    }
                                </div>
                            </section>
                        )
                    })
                }
                <section id="conclusion">
                    <div className="info-container">
                        <div className="input-container">
                            <label htmlFor="">Conclusion Title:
                                <input
                                    id='conclusionTitle'
                                    defaultValue={article.conclusionTitle}
                                    onChange={(event) =>{
                                        setConclusionTitle(event.target.value);
                                    }}
                                />
                            </label>
                        </div>
                    </div>
                    <label className="paragraph-textarea" >Conclusion:
                        <textarea
                            id='conclusion'
                            defaultValue={article.conclusion}
                            onChange={(event) =>{
                                setConclusion(event.target.value);
                            }}
                    /></label>
                </section>
                <div className="buttonWrapper">
                    <button onClick={handleUpdate}>Update</button>
                    <button id= "clear" onClick={clearForm}>Clear</button>
                </div>
            </div>
             )
            }
        </StyledEditPage>
    )
}

const StyledEditPage = styled.div`
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
    width: 100%;
    align-items: center;
    border-radius: 12px;
        #paragraph-section, #intro, #conclusion {
            border-bottom: 2px white solid;
            width: 95%;
            justify-content: space-between;
            flex-direction: column;
            display: flex;
            margin-bottom: 30px;
            .info-container {
                display: flex;
                position: relative;
                width: 100%;
                .input-container {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    input, button, textarea {
                        width: 300px;
                        height: 30px;
                        }
                        label {
                            display: flex;
                            flex-direction: column;
                            font-size: 1.5em;
                            margin: 10px;
                            textarea {
                                width: 400px;
                                height: 200px;
                            }
                        }
                    }
                }
                label {
                    display: flex;
                    flex-direction: column;
                    font-size: 1.5em;
                    margin: 10px;
                    height: 100%;
                    width: 50%;
                    textarea {
                        width: 400px;
                        height: 200px;
                    }
                }
            .button-container {
                display: flex;
                width: 100%;
                justify-content: space-between;
                button {
                    padding: 0 6px;
                    border-radius: 6px;
                    border: none;
                    background: lightblue;
                    color: white;
                }
            }
        }
        #intro, #conclusion {
            flex-direction: row;
            .info-container {
                flex-direction: column;
            }
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