import { useGameContext } from "@/hooks/useGameContext";
import Button from "@/components/Button";
import { CARD_OPTIONS } from "@/stores";
import { useEffect } from "react";

const Game = () => {
	const {
		currentPlayerId,
		players,
		round,
		selectedCard,
		startGame,
		computerMove,
	} = useGameContext();
	const playerOne = players[0];
	const playerTwo = players[1];

	const computerSelecting =
		playerTwo.human === "no" && currentPlayerId === 1 ? true : false;

	useEffect(() => {
		if (computerSelecting) {
			setTimeout(() => {
				computerMove();
			}, 1000);
		}
	}, [computerSelecting, computerMove]);

	return (
		<>
			<div className='flex gap-2 mb-5'>
				{/* :TODO
                <Button disabled onClick={() => {}}>
					save game
				</Button> */}
				<Button onClick={() => startGame()}>start a new game</Button>
			</div>

			<div className='flex flex-col gap-2 mb-5'>
				<h1 className='block'>Current turn: {players[currentPlayerId].name}</h1>
				<h2 className='block'>Round: {round + 1}</h2>
			</div>

			<div className='flex justify-center mb-8'>
				<table className='table-auto border-collapse border border-gray-400'>
					<thead>
						<tr>
							<th className='border border-gray-400 px-4 py-2'>
								{playerOne.name}
							</th>
							<th className='border border-gray-400 px-4 py-2'>
								{playerTwo.name}
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className='border border-gray-400 px-4 py-2'>
								{playerOne.score}
							</td>
							<td className='border border-gray-400 px-4 py-2'>
								{playerTwo.score}
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div className='flex justify-center flex-col gap-2'>
				{CARD_OPTIONS.map((option) => (
					<Button
						key={option}
						onClick={() => {
							selectedCard(option);
						}}
						disabled={computerSelecting}>
						{option.toUpperCase()}
					</Button>
				))}
			</div>
		</>
	);
};

export default Game;
