// styled
import styled from 'styled-components';


export default function AboutPage () {
    return (
        <StyledAboutPage >
            <div className="aboutWrapper">
                <h1>About Us</h1>
                <p><span id="bold">The Real Deal Fitness</span> was founded in 2021. Our goal is to bring real health and fitness tips, 
                clothing and accessories from mulitple diverse sources and opinions. The Real Deal Fitness is comprised of individuals 
                who are passionate about fitness and live the lifestyle.  We hope the information and products we provide server you and your healthy lifestyles!
                <hr />Thank you for visiting!
                - The Real Deal Fitness Team</p>
                <h1 id="bottomHeader">The Future..</h1>
                <p>The goal of this website is to bring a community feeling to the health and fitness world. Our websites are undergoing major development to
                bring a better and more engaging user experience!  Periodically you will find more and more features being added to the site. 
                <hr />Thanks - The Real Deal Fitness Team</p>
            </div>
        </StyledAboutPage >
    )
}

const StyledAboutPage = styled.div`
background: white;
    border-radius: 12px;
.aboutWrapper {
    width: 95%;
    margin: 5% auto;
    padding: 1em 0;
    h1{
        margin: 10px 0;
        font-size: 2.5em;
        color: #3b3b3b;
    }
    #bottomHeader{
        margin-top: 1em;
    }
    p {
        font-size: 2em;
        span {
            font-weight: 700;
        }
    hr {
        border: none;
        }
    }
}
`;