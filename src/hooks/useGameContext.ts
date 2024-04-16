import React from "react";
import { GameStatus, Player, CardOption } from "@/types";

export type GameContextValues = {
	status: GameStatus;
	updateStatus: (status: GameStatus) => void;
	startGame: () => void;
	currentPlayerId: number;
	selectedCard: (option: CardOption) => void;
	round: number;
	players: Player[];
	updatePlayer: (index: number, field: keyof Player, value: string) => void;
	getWinner: () => Player | undefined;
	computerMove: () => void;
};

export const GameContext = React.createContext<GameContextValues | undefined>(
	undefined
);

export const useGameContext = () => {
	const context = React.useContext(GameContext);
	if (!context) {
		throw new Error(
			"This component must be wrapped in a Provider component first."
		);
	}
	return context;
};
