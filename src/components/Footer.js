
// styled
import styled from 'styled-components';

// components
import EmailForm from './emailForm';

// images
import FB from '../images/FB.png';
import Insta from '../images/instaBlack.png';
import Pin from '../images/pinterestBlack.png';
import Twitter from '../images/twitterBlack.png';

export default function Footer() {
    return (
        <StyledFooter>
            <div className="iconContainer">
                <a href="https://facebook.com/therealdealfitness" target="_blank" rel="noreferrer">
                    <img src={FB} alt="" />
                </a>
                <a href="https://instagram.com/the_real_deal_fitness" target="_blank" rel="noreferrer">
                    <img src={Insta} alt="" />
                </a>
                <a href="https://pinterest.com/therealdealfitness" target="_blank" rel="noreferrer">
                    <img src={Pin} alt="" />
                </a>
                <a href="https://twitter.com/realdealfit21" target="_blank" rel="noreferrer">
                    <img src={Twitter} alt="" />
                </a>
            </div>
            <EmailForm />
        </StyledFooter>
    )
}

const StyledFooter = styled.div`
width: 95%;
margin: 2% auto;
display: flex;
justify-content: center;
align-items: center;
border-top: 2px solid white;
@media (max-width: 750px){
       flex-direction: column;
  }
.iconContainer {
    display: flex;
    justify-content: space-around;
    width: 30%;
    margin: 2% auto; 
    @media (max-width: 1000px){
       width: 90%;
    }
    a {
        img {
            width: 40px;
        }
    }
}

`;
