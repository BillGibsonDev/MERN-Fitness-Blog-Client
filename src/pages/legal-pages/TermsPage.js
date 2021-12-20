// styled
import styled from 'styled-components';

export default function AboutPage () {
    return (
        <StyledAboutPage >
            <h1>Terms of Service Coming Soon.</h1>
        </StyledAboutPage >
    )
}

const StyledAboutPage = styled.div`
    background: white;
    border-radius: 12px;
    height: 70vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px auto;
    width: 95%;
    max-width: 875px;
    h1 {
        color: black;
        font-size: 3em;
    }
`;