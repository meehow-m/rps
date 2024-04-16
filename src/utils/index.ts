import { CardOption } from "@/types";

const determineWinnerId = (
	option1: CardOption,
	option2: CardOption
): number => {
	if (option1 === option2) return -1;

	if (
		(option1 === "paper" && option2 === "scissors") ||
		(option1 === "rock" && option2 === "paper") ||
		(option1 === "scissors" && option2 === "rock")
	) {
		return 1;
	}

	return 0;
};

export { determineWinnerId };
