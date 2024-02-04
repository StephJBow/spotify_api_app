import { useEffect, useState } from 'react';
import './App.css';
import { Credentials } from './Credentials';
import { Recommendation } from './Types';
import Player from './Player';

function App() {
	const spotify = Credentials();

	console.log('RENDERING APP.TSX');

	const [token, setToken] = useState<string>('');
	const [recommendations, setRecommendations] = useState<
		Recommendation[] | null
	>(null);

	useEffect(() => {
		fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization:
					'Basic ' +
					btoa(spotify.ClientId + ':' + spotify.ClientSecret),
			},
			body: 'grant_type=client_credentials',
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Failed to fetch access token');
				}
				return response.json();
			})
			.then((tokenResponse) => {
				if (tokenResponse && tokenResponse.access_token) {
					setToken(tokenResponse.access_token);

					fetch(
						'https://api.spotify.com/v1/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry&seed_tracks=0c6xIDDpzE81m2q797ordA',
						{
							method: 'GET',
							headers: {
								Authorization:
									'Bearer ' + tokenResponse.access_token,
							},
						}
					)
						.then((recsResponse) => {
							if (!recsResponse.ok) {
								throw new Error(
									'Failed to fetch recommendations'
								);
							}
							return recsResponse.json();
						})
						.then((recsResponseJson) => {
							console.log(recsResponseJson);
							let recommendationsArray =
								recsResponseJson.tracks.map((rec: any) => ({
									title: rec.name,
									artist: rec.artists[0].name,
									albumName: rec.album.name,
									albumArt: rec.album.images[0].url,
									uri: rec.uri,
								}));
							setRecommendations(recommendationsArray);
						})
						.catch((error) => {
							console.error(
								'Error fetching recommendations:',
								error
							);
						});
				}
			})
			.catch((error) => {
				console.error('Error fetching access token:', error);
			});
	}, [spotify.ClientId, spotify.ClientSecret, setToken, setRecommendations]);

	return !recommendations ? (
		<h1>Waiting for recommendations</h1>
	) : (
		<div>
			<Player token={token} currentSong={recommendations[0]} />
		</div>
	);
}

export default App;
