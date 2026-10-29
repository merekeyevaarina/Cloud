"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

import { Button } from "@/src/shared/ui/button";

type DeleteFileButtonProps = {
  fileId: string;
};

export function DeleteFileButton({ fileId }: DeleteFileButtonProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleDelete() {
        const confirmed = window.confirm(
            "Ты действительно хочешь удалить этот файл?",
        );

        if (!confirmed) return;

        setLoading(true);
        setError("");

        try {
            const response = await fetch(`/api/v1/files/${fileId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.error ?? "Не удалось удалить файл");
                return;
            }

            router.refresh();
        } catch {
            setError("Не удалось подключиться к серверу");
        } finally {
            setLoading(false);
        }
    }

  return (
    <div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled={loading}
        onClick={handleDelete}
        title="Удалить файл"
      >
        <Trash2 className="size-4" />
      </Button>

      {error && (
        <p role="alert" className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

