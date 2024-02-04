import { useEffect, useState } from 'react';
import './App.css';
import { Credentials } from './Credentials';
import { Recommendation } from './Types';
import Player from './Player';
import Login from './Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import CallbackComponent from './CallbackComponent';

function App() {
	const [accessToken, setAccessToken] = useState<string>('');
	const [recommendations, setRecommendations] = useState<
		Recommendation[] | null
	>(null);

	console.log('access token', accessToken);

	useEffect(() => {
		if (accessToken) {
			fetch(
				'https://api.spotify.com/v1/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry&seed_tracks=0c6xIDDpzE81m2q797ordA',
				{
					method: 'GET',
					headers: {
						Authorization: 'Bearer ' + accessToken,
					},
				}
			)
				.then((recsResponse) => {
					if (!recsResponse.ok) {
						throw new Error('Failed to fetch recommendations');
					}
					return recsResponse.json();
				})
				.then((recsResponseJson) => {
					console.log(recsResponseJson);
					let recommendationsArray = recsResponseJson.tracks.map(
						(rec: any) => ({
							title: rec.name,
							artist: rec.artists[0].name,
							albumName: rec.album.name,
							albumArt: rec.album.images[0].url,
							uri: rec.uri,
						})
					);
					setRecommendations(recommendationsArray);
				})
				.catch((error) => {
					console.error('Error fetching recommendations:', error);
				});
		}
	}, [accessToken]);

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route
					path="/callback"
					element={
						<CallbackComponent setAccessToken={setAccessToken} />
					}
				/>
				<Route
					path="/home"
					element={
						<Home
							recommendations={recommendations}
							accessToken={accessToken}
						/>
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
