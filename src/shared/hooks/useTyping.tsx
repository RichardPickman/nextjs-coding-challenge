import { useState } from "react";

export const useTyping = (sentence: string) => {
    const [input, setInput] = useState("");
    const [startTime, setStartTime] = useState<number | null>(null);
    const [totalKeystrokes, setTotalKeystrokes] = useState(0);

    const onInputChange = (val: string) => {
        if (!startTime && val.length > 0) {
            setStartTime(Date.now());
        }

        if (val.length <= sentence.length) {
            setInput(val);
            setTotalKeystrokes((prev) => prev + 1);
        }
    };

    return { input, onInputChange, totalKeystrokes, reset: () => setInput("") };
};
