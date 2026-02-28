type PHASES = "LOBBY" | "RACING";

export interface User {
    id: string;
    username: string;
    wpm: number;
    accuracy: number;
    progress: number;
    isReady: boolean;
}

export interface GameState {
    phase: PHASES;
    timer: number; // Countdown
    sentence: string;
    players: User[];
}

export interface GameTick {
    phase: PHASES;
    timer: number;
    players: User[];
    sentence: string;
}
