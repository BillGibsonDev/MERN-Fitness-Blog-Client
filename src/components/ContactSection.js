// styled
import styled from 'styled-components';

// form
import ContactForm from './ContactForm';
export default function ContactSection () {
    return (
        <StyledContact>
            <div className="contactWrapper">
                <h1>Contact us</h1>
                <h2>Directly send us a message or tell us how we're doing!</h2>
                <ContactForm />
            </div>
        </StyledContact >
    )
}

const StyledContact = styled.div`
    background: white;
    border-radius: 12px;
    margin: 5% auto;
    .contactWrapper {
        width: 95%;
        margin: auto;
        h1 {
            font-size: 2.5em;
            color: #3a3a3a;
        }
        h2 {
            font-size: 2.2em;
            color: #3a3a3a;
        }
    }
`;