"use client"

import {useState} from "react";
import {useRouter} from "next/navigation";
import {Plus} from "lucide-react";
import {Button} from "@/src/shared/ui/button";
import { Input } from "@/src/shared/ui/input";

export  function CreateFolderButton(){
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    async function handleCreateFolder (){
        const trimmedName = name.trim();
        if (!trimmedName) {
            setError('Введите название папки');
            return;
        }

        setIsLoading(true);
        setError('')

        try{
            const response = await fetch("/api/folders", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name: trimmedName}),
            })
            const data = await response.json();
            if(!response.ok){
                setError(data.error ?? "Не удалось создать папку");
                return;
            }
            setName("");
            setIsLoading(false);
            router.refresh()
        }
        catch{
            setError("Не удалось связаться с сервером");
        } finally {
            setIsLoading(false);
        }


    }

    return (
        <>
            <Button
                className="h-10 rounded-xl px-4"
            onClick={() => {
                setError("");
                setIsOpen(true);
            }}
            >
                <Plus aria-hidden="true" />
                Новая папка
            </Button>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="create-folder-title"
                        className="w-full max-w-md rounded-2xl border bg-background p-6 shadow-xl"
                    >
                        <h2
                            id="create-folder-title"
                            className="text-lg font-semibold"
                        >
                            Создать папку
                        </h2>

                        <div className="mt-4">
                            <label
                                htmlFor="folder-name"
                                className="mb-2 block text-sm"
                            >
                                Название папки
                            </label>

                            <Input
                                id="folder-name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                placeholder="Например, Документы"
                                maxLength={255}
                                autoFocus
                                disabled={isLoading}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        void handleCreateFolder();
                                    }
                                }}
                            />
                        </div>

                        {error && (
                            <p className="mt-3 text-sm text-destructive" role="alert">
                                {error}
                            </p>
                        )}

                        <div className="mt-6 flex justify-end gap-2">
                            <Button
                                variant="outline"
                                disabled={isLoading}
                                onClick={() => {
                                    setIsOpen(false);
                                    setError("");
                                }}
                            >
                                Отмена
                            </Button>

                            <Button
                                disabled={isLoading}
                                onClick={() => void handleCreateFolder()}
                            >
                                {isLoading ? "Создание..." : "Создать"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}