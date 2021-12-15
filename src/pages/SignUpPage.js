
import { useState, useEffect } from 'react';
import axios from 'axios';

// router
import { Link } from 'react-router-dom';

// styled
import styled from 'styled-components';

export default function SignUpPage() {

	const [ username, setUsername ] = useState("");
	const [ password, setPassword ] = useState("");
	const [ confirm, setConfirm ] = useState("");
	const [ userRole, setUserRole ] = useState("");
	const [ email, setEmail ] = useState("");
	const [ confirmEmail, setConfirmEmail ] = useState("");
	const [ joinDate, setJoinDate ] = useState("");
	const [ robot, setRobot ] = useState("");
	const [ registered, setRegistered ] = useState(false);

 	useEffect(() => {
		setUserRole(process.env.REACT_APP_GUEST_SECRET);
		handleDate();
		// eslint-disable-next-line
	}, [userRole])

	console.log(robot)

	function handleDate(){
		const current = new Date();
		const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;
		setJoinDate(date);
	}

    function registerUser() {
			if (password !== confirm ) {
				alert("Passwords do not match");
			} else if (email !== confirmEmail ) {
				alert("Emails do not match");
			} else if (robot !== "on" ) {
				alert("Check the Not a robot box");
			} else {
				axios.post(`${process.env.REACT_APP_REGISTER_URL}`, {
					username: username,
					password: password,
					email: email,
					userRole: `${process.env.REACT_APP_GUEST_SECRET}`,
					joinDate: joinDate,
				})
				.then(function(response) {
					if(response.data !== "USER REGISTERED"){
						alert("Server Error - User was not created")
					} else {
						alert('User Created!');
						setRegistered(true);
					}
				})
			}
		}

	return (
		<StyledSignUpPage>

			{
			 registered === false ? (
			 <>
			 <h1>Sign Up</h1>
				<div className="form-wrapper">
					<label>Username:</label>
					<input 
						type="text" 
						onChange={(event) => {
							setUsername(event.target.value);
						}}
					/>
					<label>Email:</label>
					<input 
						type="email" 
						onChange={(event) => {
							setEmail(event.target.value);
						}}
					/>
					<label>Retype Email:</label>
					<input 
						type="email" 
						onChange={(event) => {
							setConfirmEmail(event.target.value);
						}}
					/>
					<label>Password:</label>
					<input 
						type="text" 
						onChange={(event) => {
							setPassword(event.target.value);
						}}
					/>
                    <label>Retype Password:</label>
					<input 
						type="text" 
						onChange={(event) => {
							setConfirm(event.target.value);
						}}
					/>
					<label> Are you a robot?</label>
					<label>No
						<input 
							id="checkbox" 
							type="checkbox" 
							name="robot"
							onChange={(event) => {
								setRobot(event.target.value);
						}}
						 />
					</label>
					<button type="submit" onClick={()=>{registerUser();}}>Create User</button>
				</div>
				</>
				) : (
					<>
						<h4>You are all signed up!</h4>
						<h4>Go ahead and log in!</h4>
						<Link to="/LoginPage">Log In</Link>
					</>
				)
			}
		</StyledSignUpPage>
	)
}

const StyledSignUpPage = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
background: white;
height: 80vh;
width: 90%;
margin: auto;
border-radius: 12px;
	@media (max-width: 1050px){
		width: 98%;
	}
	h1 {
		font-size: 3em;
		color: #0f4d92;
        margin-bottom: 40px;
    }
	.form-wrapper {
            display: flex;
            width: 90%;
            flex-direction: column;
            align-items: center;
            @media (max-width: 1150px){
                font-size: 1.2em;
            }
            label {
                font-weight: bold;
                @media (max-width: 1150px){
                    font-size: 1.2em;
                }
            }
            input {
                width: 200px;
                margin-bottom: 20px;
                border-radius: 4px;
                @media (max-width: 1150px){
                    width: 50%;
                }
                @media (max-width: 750px){
                    width: 70%;
                }
				@media (max-width: 550px){
                    width: 90%;
                }
            }
			#checkbox {
				width: 30px;
			}
            button {
                width: 200px;
                cursor: pointer;
                margin: 0 20px;
                background: #d1d1d1;
                border: none;
                border-radius: 4px;
                font-weight: 700;
                @media (max-width: 1150px){
                    font-size: 1.2em;
                }
                &:hover{
                    color: #ffffff;
                    cursor: pointer;
                    background: #0f4d92;
                    transition: 0.2s;
                    transform: scale(1.01);
                }
            }
        }
		h4 {
			margin-bottom: 10px;
			font-size: 2em;
		}
		a {
			font-size: 1.5em;
			color: #0f4d92;
			 &:hover{
				 	border-radius: 6px;
					 padding: 0 3px;
                    color: #ffffff;
                    cursor: pointer;
                    background: #0f4d92;
                    transition: 0.2s;
                    transform: scale(1.01);
                }
		}
`;