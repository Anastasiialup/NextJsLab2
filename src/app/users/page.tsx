'use client';
import { useEffect, useState } from 'react';

export default function Page() {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ name: '', email: '', address: '', id: null });
    const [message, setMessage] = useState<string | null>(null);

    const fetchUsers = async () => {
        const res = await fetch('/api/users');
        const data = await res.json();
        setUsers(data.data ? data.data : []);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSubmit = async () => {
        setMessage(null);
        let res, data;
        const payload = { name: form.name, email: form.email, address: form.address };
        if (form.id) {
            res = await fetch(`/api/users/${form.id}`, {
                method: 'PATCH',
                body: JSON.stringify(payload),
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            res = await fetch('/api/users', {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: { 'Content-Type': 'application/json' },
            });
        }
        data = await res.json();
        setMessage(data.message || 'Операцію виконано');
        setForm({ name: '', email: '', address: '', id: null });
        fetchUsers();
    };

    const handleDelete = async (id: number) => {
        setMessage(null);
        const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
        const data = await res.json();
        setMessage(data.message || 'Користувача видалено');
        fetchUsers();
    };

    const handleEdit = (user: any) => {
        setForm(user);
        setMessage(null);
    };

    return (
        <div className="p-6 max-w-2xl mx-auto text-gray-500">
            <h1 className="text-3xl font-semibold mb-6 text-center">Форма створення користувача</h1>

            {message && (
                <div className="bg-green-100 text-gray-800 border border-green-300 px-4 py-3 rounded mb-4 text-sm">
                    {message}
                </div>
            )}

            <div className="bg-white shadow rounded-lg p-6 mb-6 border">
                <h2 className="text-xl font-medium mb-4">
                    {form.id ? 'Редагувати користувача' : 'Введіть свої дані'}
                </h2>
                <div className="flex flex-col gap-3 mb-4">
                    <input
                        type="text"
                        placeholder="Ім'я"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="border rounded px-3 py-2 text-gray-800"
                    />
                    <input
                        type="email"
                        placeholder="Пошта"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="border rounded px-3 py-2 text-gray-800"
                    />
                    <input
                        type="text"
                        placeholder="Адреса"
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        className="border rounded px-3 py-2 text-gray-800"
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    className="bg-black text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-gray-800"
                >
                    {form.id ? 'Оновити' : 'Створити користувача'}
                </button>
            </div>

            <div className="bg-white shadow rounded-lg p-6 border">
                <h2 className="text-xl font-medium mb-4">Список користувачів</h2>
                {users.length === 0 ? (
                    <p className="text-gray-800">Користувачів поки немає.</p>
                ) : (
                    <ul className="divide-y">
                        {users.map((u: any) => (
                            <li key={u.id} className="py-4 flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-gray-800">{u.name}</p>
                                    <p className="text-sm text-gray-800">{u.email}</p>
                                    <p className="text-sm text-gray-600">{u.address || '—'}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(u)}
                                        className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm hover:bg-green-200"
                                    >
                                        Редагувати
                                    </button>
                                    <button
                                        onClick={() => handleDelete(u.id)}
                                        className="bg-red-100 text-red-800 px-3 py-1 rounded text-sm hover:bg-red-200"
                                    >
                                        Видалити
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
