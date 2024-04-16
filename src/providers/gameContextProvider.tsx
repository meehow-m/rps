import { useState } from "react";
import { GameContext } from "@/hooks/useGameContext";
import { CardOption, GameStatus, Player } from "@/types";
import { determineWinnerId } from "@/utils";
import { CARD_OPTIONS } from "@/stores";

type GameContextProps = { children: JSX.Element };

const GameContextProvider = ({ children }: GameContextProps) => {
	const [gameStatus, setGameStatus] = useState<GameStatus>("new");
	const [currentPlayerId, setCurrentPlayerId] = useState(0);
	const [round, setRound] = useState(0);
	const [players, setPlayers] = useState<Player[]>([
		{
			human: "yes",
			name: "Player 1",
			score: 0,
			selection: null,
		},
		{
			human: "no",
			name: "Computer",
			score: 0,
			selection: null,
		},
	]);

	// form changes to players
	const updatePlayer = (index: number, field: keyof Player, value: string) => {
		return setPlayers((prev) => {
			return prev.map((player, i) =>
				i === index ? { ...player, [field]: value } : player
			);
		});
	};

	// start a new game (reset state)
	const startGame = () => {
		setRound(0);
		setCurrentPlayerId(Math.random() > 0.5 ? 0 : 1);
		setGameStatus("playing");
		setPlayers((prev) =>
			prev.map((player) => ({ ...player, score: 0, selection: null }))
		);
	};

	const calculateGame = (option: CardOption) => {
		const playerOneSelection = players[0].selection!;

		const winnerId = determineWinnerId(playerOneSelection, option);

		setPlayers((prev) => {
			return prev.map((player, playerId) => ({
				...player,
				score: playerId === winnerId ? player.score + 1 : player.score,
			}));
		});

		setRound((prev) => prev + 1);
	};

	// user selected card
	const selectedCard = (option: CardOption) => {
		if (currentPlayerId === 0) {
			setPlayers((prev) => {
				return prev.map((player, i) =>
					i === currentPlayerId ? { ...player, selection: option } : player
				);
			});
		} else {
			calculateGame(option);
		}
		setCurrentPlayerId((prev) => (prev + 1) % 2);
	};

	const computerMove = () => {
		calculateGame(CARD_OPTIONS[Math.floor(Math.random() * 3)]);
		setCurrentPlayerId(0);
	};

	const getWinner = () => {
		console.log(players.sort((player) => (player.score > 0 ? -1 : 1)));
		return players[0];
	};

	return (
		<GameContext.Provider
			value={{
				status: gameStatus,
				updateStatus: setGameStatus,
				players,
				updatePlayer,
				startGame,
				currentPlayerId,
				round,
				selectedCard,
				getWinner,
				computerMove,
			}}>
			{children}
		</GameContext.Provider>
	);
};

export default GameContextProvider;
