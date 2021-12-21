// styled
import styled from 'styled-components';

// router
import { Link } from 'react-router-dom';

// images
import Logo from '../images/rdfLogoWhite.png';
import Hamburger from '../images/hamburgerWhite2.png';

export default function Nav({role, isLoggedIn, logout}) {

function openNav() {
    document.getElementById("myNav").style.width = "100%";
  }

  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }


    return (
        <StyledNav>
            <img className="logo" src={Logo} alt="" />
            {
                isLoggedIn === false ? (
                    <nav>
                        <Link to="/">Home</Link>
                        <Link to="/AboutPage">About</Link>
                        <a href="https://www.trdfitshop.com" target="_blank" rel="noreferrer">Merch</a>
                        <Link to="/SignUpPage">Sign Up</Link>
                        <Link to="/LoginPage">Log In</Link>
                    </nav>
                ) : (
                     <nav>
                        <Link to="/">Home</Link>
                        <Link to="/AboutPage">About</Link>
                        <a href="https://www.trdfitshop.com" target="_blank" rel="noreferrer">Merch</a>
                        <Link to="/ProfilePage">Profile</Link>
                        <Link to="/" onClick={logout}>Sign Out</Link>
                    </nav>
                )
            }
            <div id="myNav" className="overlay">
                <button onClick={closeNav}>&times;</button>
                {
                    isLoggedIn === false ? (
                        <div className="overlayContent" onClick={closeNav}>
                            <Link to="/" onClick={closeNav}>Home</Link>
                            <Link to="/AboutPage" onClick={closeNav}>About</Link>
                            <a href="https://trdfitshop.com" rel="noreferrer" onClick={closeNav}>Merch</a>
                            <Link to="/SignUpPage" onClick={closeNav}>Sign Up</Link>
                            <Link to="/LoginPage" onClick={closeNav}>Log In</Link>
                        </div>
                    ) : (
                        <div className="overlayContent" onClick={closeNav}>
                            <Link to="/" onClick={closeNav}>Home</Link>
                            <Link to="/AboutPage" onClick={closeNav}>About</Link>
                            <a href="https://trdfitshop.com" rel="noreferrer" onClick={closeNav}>Merch</a>
                            <Link to="/ProfilePage" onClick={closeNav}>Profile</Link>
                            <Link to="/" onClick={()=>{ closeNav(); logout(); }}>Sign Out</Link>
                        </div>
                    )
                }
            </div>
            <img id='hamburger' src={Hamburger} onClick={openNav} alt="hamburger menu"/>
        </StyledNav>
    )
}

const StyledNav = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 875px;
    margin: auto;
    align-items: center;
    height: 8vh;
    padding: 3px 0;
    border-bottom: 2px white solid;
    @media (max-width: 750px){
        width: 95%;
    }
    .logo {
        width: 100px;
    }
    nav {
        display: flex;
        width: 50%;
        justify-content: space-between;
        @media (max-width: 750px){
            display: none;
        }
        a {
            text-decoration: none;
            font-size: 1.2em;
            color: #d8d8d8;
            &:hover {
                color: white;
                text-decoration: underline;
            }
        }
    }

.overlay {
  height: 100%;
  width: 0;
  position: fixed; 
  z-index: 1; 
  left: 0;
  top: 0;
  background-color: rgb(0,0,0); 
  background-color: rgba(0,0,0, 0.9); 
  overflow-x: hidden; 
  transition: 0.5s; 
    button {
        position: absolute;
        top: 20px;
        right: 45px;
        font-size: 60px;
        color: #818181;
        background: transparent;
        border: none;
        cursor: pointer;
        &:hover, &:focus {
                transition: 0.3s;
                transform: scale(1.1);
            }
    }
    .overlayContent {
    position: relative;
    top: 25%; 
    width: 100%;
    text-align: center; 
    margin-top: 30px; 
        a {
            padding: 8px;
            text-decoration: none;
            font-size: 36px;
            color: #3b5998;
            display: block; 
            transition: 0.3s; 
                &:hover, &:focus {
                color: #f1f1f1;
                transition: 0.3s;
                transform: scale(1.1);
            }
        }
    } 
}
#hamburger {
    cursor: pointer;
    display: none;
    width: 30px;
    &:hover, &:focus {
        transition: 0.3s;
        transform: rotateZ(30deg);
    }
    @media (max-width: 750px){
       display: block;
  }
}
`;