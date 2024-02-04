import Player from './Player';
import { Recommendation } from './Types';

interface homeProps {
	recommendations: Recommendation[] | null;
	accessToken: string;
}

const Home = ({ recommendations, accessToken }: homeProps) => {
	return (
		<div>
			{!recommendations ? (
				<h1>Waiting for recommendations</h1>
			) : (
				<Player
					accessToken={accessToken}
					currentSong={recommendations[0]}
				/>
			)}
		</div>
	);
};

export default Home;
