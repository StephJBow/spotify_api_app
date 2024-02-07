import React, { useEffect } from 'react';
import { Recommendation } from './Types';

interface PlayerProps {
	accessToken: string;
	currentSong: Recommendation;
}

const Player = ({ accessToken, currentSong }: PlayerProps) => {
	const playSong = () => {
		console.log('access token in play request', accessToken);
		console.log('uri', currentSong.uri);
		fetch('https://api.spotify.com/v1/me/player/play', {
			method: 'PUT',
			headers: {
				Authorization: 'Bearer ' + accessToken,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				context_uri: currentSong.uri,
				offset: {
					position: 5,
				},
				position_ms: 0,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('Play response:', data);
			})
			.catch((error) => {
				console.error('Error playing song:', error);
			});
	};

	return (
		<div className="player">
			<div className="player-top">
				<img
					className="current-song-art"
					src={currentSong.albumArt}
					alt="Album Art"
				/>
				<h3>
					Currently Playing {currentSong.title} by{' '}
					{currentSong.artist}
				</h3>
			</div>
			<div className="player-bottom">
				<button onClick={playSong}>Play</button>
				<button>Pause</button>
				<button>Next</button>
				<button>Previous</button>
			</div>
		</div>
	);
};

export default Player;
