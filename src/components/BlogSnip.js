// styled
import styled from 'styled-components';

// router
import { Link } from 'react-router-dom';


export default function BlogSnip({
    id, 
    title, 
    thumbnail, 
    brief,
    linkTitle,
    date
}) {

    return (
        <StyledSnip id={id}>
            <Link to={`/post/${linkTitle}/${id}`}>
            <div className="titleContainer">
                <h4>{title}</h4>
                <h5>{date}</h5>
                <p>{brief}..<Link to={`/post/${linkTitle}/${id}`}>Continue Reading</Link></p>
            </div>
            <img src={thumbnail} alt={thumbnail} />
            </Link>
        </StyledSnip>
    )
}

const StyledSnip = styled.div`
height: 40vh;
display: flex;
justify-content: space-between;
margin: 1em 0;
align-items: center;
width: 100%;
border-radius: 14px;
box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.219);
background: #dadada;
    @media (max-width: 750px){
        height: 100%;
    }
    &:hover{
        transform: scale(1.02);
        transition: 0.3s;
        }
    a {
        display: flex;
        width: 100%;
        height: 100%;
            .titleContainer {
            display: flex;
            width: 50%;
            flex-direction: column;
            margin: auto;
            padding-left: 2em;
                @media (max-width: 750px){
                        width: 70%;
                    }
                h4 {
                    font-size: 2em;
                    margin: 6px 0;
                    color: black;
                        @media (max-width: 500px){
                            font-size: 1.5em;
                        }
                    }
                h5 {
                    font-size: 1em;
                    color: gray;
                    }
                p {
                    width: 90%;
                    margin: 6px 0;
                    color: black;
                    a {
                        text-decoration: underline;
                        color: #1900fc;
                        font-family: 'Oswald', sans-serif;
                        font-size: 1em;
                            &:hover {
                                cursor: pointer;
                                transition: 0.3s;
                                color: black;
                            }
                        }
                    }
                }
                img {
                    width: 50%;
                    height: 100%;
                    border-top-right-radius: 12px;
                    border-bottom-right-radius: 12px;
                }
            }
`;
