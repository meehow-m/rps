type CardOption = "paper" | "scissors" | "rock";

type Player = {
	human: "yes" | "no";
	name: string;
	score: number;
	selection: CardOption | null;
};

type GameStatus = "new" | "setup" | "playing" | "ended";

export type { Player, GameStatus, CardOption };
