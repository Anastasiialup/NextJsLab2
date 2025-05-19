'use client';

import { useEffect, useState } from 'react';

export default function EnvTestPage() {
    const [data, setData] = useState<{ browserVar: string; messageVar: string } | null>(null);

    useEffect(() => {
        console.log('Client Server var:', process.env.SERVER_VAR); // undefined, бо це серверна змінна
        console.log('Client Browser var:', process.env.NEXT_PUBLIC_BROWSER_VAR);
        console.log('Client Message var:', process.env.MESSAGE_VAR); // undefined

        fetch('/api/local-api')
            .then(res => res.json())
            .then(setData);
    }, []);

    if (!data) return <p>Завантаження...</p>;

    return (
        <div>
            <h1>Змінні середовища</h1>
            <p>Змінна браузера: {data.browserVar}</p>
            <p>Змінна повідомлення: {data.messageVar}</p>
        </div>
    );
}
