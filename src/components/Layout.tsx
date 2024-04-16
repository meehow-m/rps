import { useGameContext } from "@/hooks/useGameContext";
import Setup from "@/components/Setup";
import Button from "@/components/Button";
import Game from "./Game";

const Layout = () => {
	const { status, updateStatus, startGame, getWinner } = useGameContext();

	switch (status) {
		case "new":
			return (
				<div className='flex flex-col gap-4'>
					<h1>Lets play!</h1>
					<Button onClick={() => updateStatus("setup")}>New game</Button>
				</div>
			);

		case "setup":
			return <Setup />;

		case "playing":
			return <Game />;

		case "ended":
			return (
				<>
					<h1>Game over!</h1>
					<h2>player won {getWinner()?.name}</h2>
					<Button onClick={() => startGame()}>New game</Button>
				</>
			);
	}
};

export default Layout;
