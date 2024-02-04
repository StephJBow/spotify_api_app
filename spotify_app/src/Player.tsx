import React, { useEffect } from 'react';
import { Recommendation } from './Types';

interface PlayerProps {
	token: string;
	currentSong: Recommendation;
}

const Player = ({ token, currentSong }: PlayerProps) => {
	const playSong = () => {
		fetch('https://api.spotify.com/v1/me/player/play'),
			{
				method: 'PUT',
				body: {
					context_uri: `${currentSong.uri}`,
					offset: {
						position: 5,
					},
					position_ms: 0,
				},
			};
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
