"use client";

import { useGameState } from "../hooks/useGameState";
import { cn } from "../lib/utils";

export const TypingDisplay = ({
    sentence,
    userInput,
}: {
    sentence: string;
    userInput: string;
}) => {
    const { phase } = useGameState();

    return (
        <div
            className={cn(
                "relative font-mono text-2xl leading-relaxed tracking-wide",
                phase === "LOBBY" && "blur-xl",
            )}
        >
            {sentence.split("").map((char, index) => {
                let color = "text-gray-400";
                const typedChar = userInput[index];

                if (typedChar !== undefined) {
                    color =
                        typedChar === char
                            ? "text-green-500"
                            : "text-red-500 bg-red-100";
                }

                return (
                    <span key={index} className={color}>
                        {char}
                    </span>
                );
            })}
        </div>
    );
};
