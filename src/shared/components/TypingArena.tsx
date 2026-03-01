"use client";

import { useUser } from "@/entities/User";
import { useEffect } from "react";
import { socket } from "../../../socket";
import { useGameState } from "../hooks/useGameState";
import { useTyping } from "../hooks/useTyping";
import { TypingDisplay } from "./TypingDisplay";
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";

export const TypingArena = () => {
    const { user } = useUser();
    const { sentence, timer, phase } = useGameState();
    const { input, onInputChange, totalKeystrokes, reset } =
        useTyping(sentence);

    useEffect(() => {
        socket.emit("keystroke", { input, totalKeystrokes });
    }, [input, totalKeystrokes, reset, user]);

    if (!user) {
        return null;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {phase === "LOBBY" && (
                        <Label className="text-orange-200">
                            Waiting for game to start...
                        </Label>
                    )}
                    {phase === "RACING" && (
                        <Label className="text-red-500">GAME STARTED</Label>
                    )}
                </CardTitle>
                <CardAction className="text-red-500">
                    {timer} SECONDS LEFT
                </CardAction>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <TypingDisplay sentence={sentence} userInput={input} />
                    <Input
                        onChange={(e) => onInputChange(e.currentTarget.value)}
                        value={input}
                        disabled={phase !== "RACING"}
                    />
                    <Progress value={user.progress} />
                </div>
            </CardContent>
        </Card>
    );
};
