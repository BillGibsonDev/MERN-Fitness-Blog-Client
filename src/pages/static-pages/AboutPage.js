// styled
import styled from 'styled-components';

export default function AboutPage () {
    return (
        <StyledAboutPage >
            <div className="about-wrapper">
                <h1>About Us</h1>
                <p><span id="bold">The Real Deal Fitness</span> was created in 2021. Our goal is to bring real health and fitness tips, 
                clothing and accessories from mulitple diverse sources and opinions. The Real Deal Fitness is comprised of individuals 
                who are passionate about fitness and live the lifestyle.  We hope the information and products we provide server you and your healthy lifestyles!
                </p>
                <h1 id="bottomHeader">The Future..</h1>
                <p>The goal of this website is to bring a community feeling to the health and fitness world. Our websites are undergoing major development to
                bring a better and more engaging user experience!  Periodically you will find more and more features being added to the site. 
                </p>
                <p id="thanks"><span>Thanks,</span>The Real Deal Fitness</p>
            </div>
        </StyledAboutPage >
    )
}

const StyledAboutPage = styled.div`
    background: white;
    border-radius: 12px;
    width: 100%;
    min-height: 80vh;
    max-width: 875px;
    margin: 20px auto;
    display: flex;
    justify-content: center;
    @media (max-width: 750px){
        width: 95%;
    }
    .about-wrapper {
        width: 95%;
        margin: 20px auto;
        padding: 1em 0;
        h1 {
            display: flex;
            justify-content: center;
            width: 50%;
            margin: 10px auto;
            font-size: 2.5em;
            color: #3b3b3b;
            border-bottom: 2px #3b3b3b solid;
        }
        #bottomHeader {
            margin-top: 50px;
        }
        p {
            font-size: 1.5em;
            #bold {
                font-weight: 700;
            }
        }
        #thanks {
            display: flex;
            flex-direction: column;
            span {
                margin-top: 6px;
            }
        }
    }
`;