import { useEffect } from 'react';
import { Credentials } from './Credentials';
import { useNavigate } from 'react-router-dom';

interface CallbackComponentProps {
	setAccessToken: Function;
}

const CallbackComponent = ({ setAccessToken }: CallbackComponentProps) => {
	const navigate = useNavigate();

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const authorizationCode = params.get('code');

		if (authorizationCode) {
			const spotify = Credentials();
			const clientId = spotify.ClientId;
			const clientSecret = spotify.ClientSecret;
			const redirectUri = 'http://localhost:3000/callback';
			const tokenEndpoint = 'https://accounts.spotify.com/api/token';
			const requestBody = new URLSearchParams();
			requestBody.append('grant_type', 'authorization_code');
			requestBody.append('code', authorizationCode);
			requestBody.append('redirect_uri', redirectUri);
			requestBody.append('client_id', clientId);
			requestBody.append('client_secret', clientSecret);

			fetch(tokenEndpoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: requestBody,
			})
				.then((response) => response.json())
				.then((data) => {
					console.log('Token response:', data);

					const accessToken = data.access_token;
					console.log('access token in login function', accessToken);
					const refreshToken = data.refresh_token;
					setAccessToken(accessToken);

					navigate('/Home');
				})
				.catch((error) => {
					console.error(
						'Error exchanging authorization code for token:',
						error
					);
				});
		}
	}, [setAccessToken, navigate]);

	return null;
};

export default CallbackComponent;
