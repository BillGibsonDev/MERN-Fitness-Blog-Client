import { useState, useEffect } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';
import { useParams } from 'react-router';


// router
import { Link } from 'react-router-dom';

//images
import Heart from '../images/heartTrans.png';


export default function BlogArticle({ author, user, isLoggedIn }) {

    const { author } = useParams();

    useEffect(() =>{
        handleAuthor(author)
    },[author])

    function handleAuthor() {
		axios.post(`${process.env.REACT_APP_AUTHOR_INFO_URL}/${author}`, {
			author: author,
		})
        .then(function(response){
            if(response.data === "Author found!"){
                setAuthor(response.data)
            }
        })
        .catch(function (error) {
		    console.log(error)
		});
    }

    return (
        <StyledFooter>
            <img src={Heart} alt="" />
            <div className="author-info-wrapper">
                <Link to={`/creators/`}>{}</Link>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque quidem natus impedit laudantium cumque vero id deleniti? </p>
            </div>
        </StyledFooter>
    )
}

const StyledFooter = styled.div`
    display: flex;
    align-items: center;
    border-top: 2px solid #3b5998;
    border-bottom: 2px solid #3b5998;
    padding: 10px 0;
    img {
        width: 50px;
    }
    .author-info-wrapper {
        margin-left: 6px;
        h5 {
            font-size: 16px;
        }
        p {
            font-size: 12px;
        }
    }
`;