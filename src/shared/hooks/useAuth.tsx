"use client";

import { useUser } from "@/entities/User";
import { useEffect, useState } from "react";
import { socket } from "../../../socket";

export const useUserAuth = () => {
    const { user, setUser } = useUser();
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const login = (username: string) => {
        setIsLoggingIn(true);
        socket.emit("join-game", username);
    };

    useEffect(() => {
        if (!socket) return;

        socket.on("login-success", (userData) => {
            setUser(userData);
            setIsLoggingIn(false);

            localStorage.setItem("typer_username", userData.name);
        });

        return () => {
            socket.off("login-success");
        };
    }, [setUser]);

    return { user, login, isLoggingIn };
};
