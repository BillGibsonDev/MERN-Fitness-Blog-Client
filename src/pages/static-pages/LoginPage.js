

// styled
import styled from 'styled-components';
import { StyledButton } from '../../Styled/Styled';

// loader
import Loader from '../../loaders/Loader';


export default function LoginPage({
	login, 
	setUsername, 
	setPassword, 
	handleTokens, 
	isLoading
 }) {

	return (
		<StyledLoginPage>
			<h3>Log In</h3>
			{
				isLoading === true ? (
					<Loader />
				) : (
					<div className="form-wrapper">
						<label>Username:</label>
						<input 
							type="text" 
							onChange={(event) => {
								setUsername(event.target.value);
							}}
						/>
						<label>Password:</label>
						<input 
							type="password" 
							onChange={(event) => {
								setPassword(event.target.value);
							}}
						/>
						<StyledButton type="submit" onClick={() =>{ login(); handleTokens(); }}>Sign In</StyledButton>
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
	width: 100%;
    min-height: 80vh;
    max-width: 875px;
	margin: 20px auto;
	border-radius: 12px;
	h3 {
		font-size: 2em;
		margin-bottom: 20px;
		color: #0f4d92;
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