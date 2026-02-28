"use client";

import { useUser } from "@/entities/User";
import { CompetitorsTable } from "@/shared/components/CompetitorsTable";
import { Login } from "@/shared/components/Login";
import { TypingArena } from "@/shared/components/TypingArena";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card";
import { Label } from "@/shared/components/ui/label";
import { useGameState } from "@/shared/hooks/useGameState";

export default function Home() {
    const { user: storedUser } = useUser();
    const { players } = useGameState();
    const user = players.find((player) => player.id === storedUser?.id);

    if (!user) {
        return <Login />;
    }

    return (
        <div className="flex items-center justify-center">
            <div className="container grid grid-cols-6 gap-4 p-2">
                <div className="col-span-5 space-y-2">
                    <TypingArena />
                    <CompetitorsTable />
                </div>
                <div className="col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Your stats</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Label>Username: {user!.username}</Label>
                            <Label>Accuracy: {user!.accuracy}</Label>
                            <Label>Progress: {user!.progress}</Label>
                            <Label>WPM: {user!.wpm}</Label>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
