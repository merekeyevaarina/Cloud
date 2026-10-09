
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/shared/ui/button";

export function LogoutButton() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleLogout() {
        setLoading(true);

        try {
            const response = await fetch("/api/auth/logout", {
                method: "POST",
            });

            if (!response.ok) {
                throw new Error("Не удалось выйти из аккаунта");
            }

            router.replace("/login");
            router.refresh();
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    return (
        <Button
            type="button"
            onClick={handleLogout}
            disabled={loading}
            variant="outline"
        >
            {loading ? "Выходим..." : "Выйти"}
        </Button>
    );
}