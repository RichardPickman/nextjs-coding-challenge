import type { GameState, User } from "@/shared/types";
import next from "next";
import { createServer } from "node:http";
import { Server } from "socket.io";

const texts = [
    "Prevailed sincerity behaviour to so do principle mr. As departure at no propriety zealously my. On dear rent if girl view. First on smart there he sense. Earnestly enjoyment her you resources. Brother chamber ten old against. Mr be cottage so related minuter is. Delicate say and blessing ladyship exertion few margaret. Delight herself welcome against smiling its for. Suspected discovery by he affection household of principle perfectly he.",
    "By an outlived insisted procured improved am. Paid hill fine ten now love even leaf. Supplied feelings mr of dissuade recurred no it offering honoured. Am of of in collecting devonshire favourable excellence. Her sixteen end ashamed cottage yet reached get hearing invited. Resources ourselves sweetness ye do no perfectly. Warmly warmth six one any wisdom. Family giving is pulled beauty chatty highly no. Blessing appetite domestic did mrs judgment rendered entirely. Highly indeed had garden not.",
    "Silent sir say desire fat him letter. Whatever settling goodness too and honoured she building answered her. Strongly thoughts remember mr to do consider debating. Spirits musical behaved on we he farther letters. Repulsive he he as deficient newspaper dashwoods we. Discovered her his pianoforte insipidity entreaties. Began he at terms meant as fancy. Breakfast arranging he if furniture we described on. Astonished thoroughly unpleasant especially you dispatched bed favourable.",
    "Gave read use way make spot how nor. In daughter goodness an likewise oh consider at procured wandered. Songs words wrong by me hills heard timed. Happy eat may doors songs. Be ignorant so of suitable dissuade weddings together. Least whole timed we is. An smallness deficient discourse do newspaper be an eagerness continued. Mr my ready guest ye after short at.",
    "In as name to here them deny wise this. As rapid woody my he me which. Men but they fail shew just wish next put. Led all visitor musical calling nor her. Within coming figure sex things are. Pretended concluded did repulsive education smallness yet yet described. Had country man his pressed shewing. No gate dare rose he. Eyes year if miss he as upon.",
    "He difficult contented we determine ourselves me am earnestly. Hour no find it park. Eat welcomed any husbands moderate. Led was misery played waited almost cousin living. Of intention contained is by middleton am. Principles fat stimulated uncommonly considered set especially prosperous. Sons at park mr meet as fact like.",
    "Neat own nor she said see walk. And charm add green you these. Sang busy in this drew ye fine. At greater prepare musical so attacks as on distant. Improving age our her cordially intention. His devonshire sufficient precaution say preference middletons insipidity. Since might water hence the her worse. Concluded it offending dejection do earnestly as me direction. Nature played thirty all him.",
    "Case read they must it of cold that. Speaking trifling an to unpacked moderate debating learning. An particular contrasted he excellence favourable on. Nay preference dispatched difficulty continuing joy one. Songs it be if ought hoped of. Too carriage attended him entrance desirous the saw. Twenty sister hearts garden limits put gay has. We hill lady will both sang room by. Desirous men exercise overcame procured speaking her followed.",
    "Call park out she wife face mean. Invitation excellence imprudence understood it continuing to. Ye show done an into. Fifteen winding related may hearted colonel are way studied. County suffer twenty or marked no moment in he. Meet shew or said like he. Valley silent cannot things so remain oh to elinor. Far merits season better tended any age hunted.",
    "Paid was hill sir high. For him precaution any advantages dissimilar comparison few terminated projecting. Prevailed discovery immediate objection of ye at. Repair summer one winter living feebly pretty his. In so sense am known these since. Shortly respect ask cousins brought add tedious nay. Expect relied do we genius is. On as around spirit of hearts genius. Is raptures daughter branched laughter peculiar in settling.",
];

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const getRandomSentence = () => texts[Math.floor(Math.random() * texts.length)];

const gameState: GameState = {
    phase: "LOBBY", // 'LOBBY' or 'RACING'
    timer: 30, // Countdown
    sentence: getRandomSentence(),
    players: [],
};

const LOBBY_TIME = 30;
const ROUND_TIME = 60;

const players = new Map();

app.prepare().then(() => {
    const httpServer = createServer(handler);

    const io = new Server(httpServer);

    setInterval(() => {
        gameState.timer--;

        if (gameState.timer <= 0) {
            if (gameState.phase === "LOBBY") {
                gameState.phase = "RACING";
                gameState.timer = ROUND_TIME;

                gameState.sentence = getRandomSentence();
            } else {
                gameState.phase = "LOBBY";
                gameState.timer = LOBBY_TIME;

                players.forEach((p) => {
                    p.progress = 0;
                    p.wpm = 0;
                });
            }
        }

        io.emit("tick", {
            phase: gameState.phase,
            timer: gameState.timer,
            players: Array.from(players.values()),
            sentence: gameState.sentence,
        });
    }, 1000);

    io.on("connection", (socket) => {
        socket.on("join-game", (username) => {
            const playerStats: User = {
                id: socket.id,
                username,
                wpm: 0,
                accuracy: 100,
                progress: 0,
                isReady: true,
            };

            players.set(socket.id, playerStats);

            socket.emit("login-success", playerStats);
        });

        socket.on("keystroke", ({ input, totalKeystrokes }) => {
            const player = players.get(socket.id);
            if (!player || gameState.phase !== "RACING") return;

            const timeElapsedSec = ROUND_TIME - gameState.timer;
            const timeElapsedMin = timeElapsedSec / 60;

            let correctChars = 0;

            for (let i = 0; i < input.length; i++) {
                if (input[i] === gameState.sentence[i]) {
                    correctChars++;
                }
            }

            const wpm =
                timeElapsedMin > 0
                    ? Math.round(correctChars / 5 / timeElapsedMin)
                    : 0;

            const accuracy =
                totalKeystrokes > 0
                    ? Math.round((correctChars / totalKeystrokes) * 100)
                    : 100;

            player.wpm = wpm;
            player.accuracy = accuracy;
            player.progress = (input.length / gameState.sentence.length) * 100;

            io.emit("players-update", Array.from(players.values()));
        });

        socket.on("disconnect", () => {
            players.delete(socket.id);
        });
    });

    httpServer
        .once("error", (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`);
        });
});
