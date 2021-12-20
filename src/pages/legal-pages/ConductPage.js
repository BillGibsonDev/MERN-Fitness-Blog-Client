// styled
import styled from 'styled-components';

export default function AboutPage () {
    return (
        <StyledAboutPage >
            <h1>Code of Conduct Coming Soon.</h1>
        </StyledAboutPage >
    )
}

const StyledAboutPage = styled.div`
    background: white;
    border-radius: 12px;
    width: 100%;
    height: 70vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px auto;
    h1 {
        color: black;
        font-size: 3em;
    }
`;