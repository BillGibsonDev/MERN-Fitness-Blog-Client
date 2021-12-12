

// styled
import styled from 'styled-components';

export default function LoginPage({login, setUsername, setPassword, handleTokens, isLoading }) {

	return (
		<StyledLoginPage>
			<h3>Log In</h3>
			{
				isLoading === true ? (
					<div className="loading-container">
							<h2>Signing In...</h2>
					</div>
				) : (
					<div className="form-wrapper">
						<label>Username:</label>
						<input 
							type="text" 
							onChange={(event) => {
								//setUsername(event.target.value);
							}}
						/>
						<label>Password:</label>
						<input 
							type="password" 
							onChange={(event) => {
								setPassword(event.target.value);
							}}
						/>
						<button id="back-button" type="submit" onClick={() =>{ login(); handleTokens(); }}>Sign In</button>
					</div>
				)
			}
		</StyledLoginPage>
	)
}

const StyledLoginPage = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
background: white;
height: 80vh;
width: 90%;
margin: 5% auto;
border-radius: 12px;
	h1 {
		font-size: 5em;
		color: #0f4d92;
	}
	h2 {
		font-size: 1em;
		margin-bottom: 40px;
		color: #0f4c92bc;
	}
	h3 {
		font-size: 2em;
		margin-bottom: 50px;
	}
	.loading-container {
		display: flex;
		flex-direction: column;
		width: 100%;
		align-items: center;
		position: relative;
		h2 {
			margin-top: 10px;
			font-size: 1em;
			color: black;
		}
	}
 	@keyframes spin {
        0%  { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
	.form-wrapper {
		display: flex;
		width: 50%;
		flex-direction: column;
		align-items: center;
		label {
			font-weight: bold;
		}
		input {
			width: 200px;
			margin-bottom: 20px;
		}
	}
`;