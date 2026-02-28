import { useEffect, useState } from "react";
import { socket } from "../../../socket";
import type { GameState } from "../types";

export const useGameState = () => {
    const [roomData, setRoomData] = useState<GameState>({
        phase: "LOBBY",
        timer: 30,
        sentence: "",
        players: [],
    });

    useEffect(() => {
        socket.on("tick", (data) => {
            setRoomData(data);
        });

        socket.on("players-update", (players) => {
            setRoomData((prev) => ({ ...prev, players }));
        });

        return () => {
            socket.off("tick");
            socket.off("players-update");
        };
    }, []);

    return roomData;
};
