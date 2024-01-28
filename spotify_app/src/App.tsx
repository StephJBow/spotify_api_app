import { useEffect, useState } from 'react';
import './App.css';
import { Credentials } from './Credentials';

function App() {
	const spotify = Credentials();

	console.log('RENDERING APP.TSX');

	const [token, setToken] = useState('');
	const [genres, setGenres] = useState({ selectedGenre: '', listPfGenresFromAPI: [] });

	useEffect(() => {
		fetch('https://accounts.spotify.com/api/token', {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)
			},
			body: 'grant_type=client_credentials',
			method: 'POST'
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('Failed to fetch access token');
				}
				return response.json();
			})
			.then(tokenResponse => {
				if (tokenResponse && tokenResponse.access_token) {
					setToken(tokenResponse.access_token);

					fetch('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
						method: 'GET',
						headers: { 'Authorization': 'Bearer ' + tokenResponse.access_token }
					})
						.then(genreResponse => {
							if (!genreResponse.ok) {
								throw new Error('Failed to fetch genres');
							}
							return genreResponse.json();
						})
						.then(genreResponseJson => {
							console.log(genreResponseJson);
						});
				}
			})
			.catch(error => {
				console.error('Error:', error);
			});
	}, [spotify.ClientId, spotify.ClientSecret]); // Added dependency array

	return (
		<>
			<h1>Hello</h1>
		</>
	);
}

export default App;