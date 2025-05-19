"use client";

import { useEffect, useState } from "react";

export default function EnvTestPage() {
    const [browserVar, setBrowserVar] = useState<string>();
    const [messageVar, setMessageVar] = useState<string>();
    const [serverVar, setServerVar] = useState<string>();

    useEffect(() => {
        // Публічні змінні з process.env (доступні в браузері)
        setBrowserVar(process.env.NEXT_PUBLIC_BROWSER);
        setMessageVar(process.env.NEXT_PUBLIC_MESSAGE);

        // Зробимо запит до API, щоб отримати серверну змінну
        fetch("/api/local-api")
            .then((res) => res.json())
            .then(({ browserVar, messageVar, serverVar }) => {
                setServerVar(serverVar);

                // Виводимо всі в консоль браузера (серверна теж буде тут)
                console.log("Client Server var (from API):", serverVar);
                console.log("Client Browser var:", browserVar);
                console.log("Client Message var:", messageVar);
            });
    }, []);

    return (
        <div>
            <h1>Змінні середовища</h1>
            <p>Змінна браузера: {browserVar ?? "loading..."}</p>
            <p>Змінна повідомлення: {messageVar ?? "loading..."}</p>
        </div>
    );
}
