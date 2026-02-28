"use client";

import { Table } from "lucide-react";
import { useGameState } from "../hooks/useGameState";
import {
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";

export const CompetitorsTable = () => {
    const { players, sentence } = useGameState();

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">User</TableHead>
                    <TableHead>Sentence</TableHead>
                    <TableHead>WPM</TableHead>
                    <TableHead>Accuracy</TableHead>
                    <TableHead>Progress</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {players.map((competitor) => (
                    <TableRow key={competitor.id}>
                        <TableCell className="font-medium max-w-32">
                            {competitor.username}
                        </TableCell>
                        <TableCell>{sentence}</TableCell>
                        <TableCell>{competitor.wpm}</TableCell>
                        <TableCell>{competitor.accuracy}</TableCell>
                        <TableCell>{competitor.progress}%</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
