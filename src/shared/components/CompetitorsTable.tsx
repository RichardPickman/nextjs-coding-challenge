"use client";

import type { ReactNode } from "react";
import { useGameState } from "../hooks/useGameState";
import { Label } from "./ui/label";

const Wrapper = ({ children }: { children: ReactNode }) => (
    <div className="flex flex-col gap-2">{children}</div>
);

export const CompetitorsTable = () => {
    const { players, sentence } = useGameState();

    return (
        <Wrapper>
            <div className="flex justify-between items-center">
                <Label>Username</Label>
                <Label>Accuracy</Label>
                <Label>Progress</Label>
                <Label>WPM</Label>
            </div>
            {players.map((player) => (
                <div
                    key={player.id}
                    className="flex justify-between items-center"
                >
                    <Label>{player.username}</Label>
                    <Label>{player.accuracy}</Label>
                    <Label>{player.progress}</Label>
                    <Label>{player.wpm}</Label>
                </div>
            ))}
        </Wrapper>
    );
};
