const Login = () => {
	const handleLogin = () => {
		const clientId = '46512c1c63b2452290415e484f8585cd';
		const redirectUri = 'http://localhost:3000/callback';
		const encodedRedirectUri = encodeURIComponent(redirectUri);
		const spotifyAuthorizationUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodedRedirectUri}&scope=user-read-playback-state user-modify-playback-state`;
		window.location.href = spotifyAuthorizationUrl;
	};
	return <button onClick={handleLogin}>Login</button>;
};

export default Login;
