import { useGameContext } from "@/hooks/useGameContext";
import Button from "@/components/Button";
import Input from "@/components/Input";

const Setup = () => {
	const { players, updatePlayer, startGame } = useGameContext();
	const playerTwo = players[1];
	const playerOne = players[0];

	return (
		<div className='flex flex-col gap-4'>
			<h1 className='block text-lg leading-1'>
				{playerOne.name} vs {playerTwo.name}{" "}
			</h1>
			<div className='flex gap-4'>
				<div>
					<label
						htmlFor='p1'
						className='block text-sm font-medium leading-6 text-gray-900'>
						Player 1 (You):
					</label>
					<Input
						name='p1'
						value={playerOne.name}
						onChange={(e) => updatePlayer(0, "name", e.target.value)}
					/>
				</div>
				<div>
					<label
						htmlFor='p1'
						className='block text-sm font-medium leading-6 text-gray-900'>
						Player 2 Name:
					</label>
					<Input
						name='p2'
						value={playerTwo.name}
						onChange={(e) => updatePlayer(1, "name", e.target.value)}
						disabled={playerTwo.human === "no"}
					/>
					<input
						type='checkbox'
						checked={playerTwo.human === "no"}
						onChange={(e) => {
							updatePlayer(1, "human", e.target.checked ? "no" : "yes");
						}}
					/>{" "}
					Computer
				</div>
			</div>
			<Button onClick={() => startGame()}>start the game</Button>
		</div>
	);
};

export default Setup;
