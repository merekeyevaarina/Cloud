"use client"


import { Button } from "@/src/shared/ui/button";
import {Copy, Share2, X } from "lucide-react";
import {useState} from "react";

type ShareFileButtonProps = {
    fileId: string
}

export function ShareFileButton({fileId}: ShareFileButtonProps) {
    const [shareUrl, setShareUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function createShare() {
        setLoading(true);

        try{
            const response = await fetch(
                `/api/v1/files/${fileId}/share`,
                {method: "POST"},
            );
            const data = await response.json()
            if(!response.ok){
                throw new Error(data.error || "Не удалось создать ссылку")
            }

            setShareUrl(data.url)


        }catch(error){
            alert(error instanceof Error ? error.message : "Произошла ошибка");
        }finally {
            setLoading(false);
        }
    }

    async function disableShare(){
        const response = await fetch(
            `/api/v1/files/${fileId}/share`,
            {method: "DELETE"}
        )
        if (!response.ok) {
            alert("Не удалось отключить ссылку");
            return;
        }
        setShareUrl(null);
    }

    async function copyLink(){
        if(shareUrl){
            await navigator.clipboard.writeText(shareUrl);
            alert("Скопировано")
        }
    }

    return (
        <div className="flex items-center gap-2">
            <Button
                type="button"
                variant="ghost"
                size="icon"
                title="Поделиться файлом"
                onClick={createShare}
                disabled={loading}
            >
                <Share2 className="size-4" />
            </Button>

            {shareUrl && (
                <div className="flex items-center gap-2">
                    <Button type="button" variant="outline" onClick={copyLink}>
                        <Copy className="mr-2 size-4" />
                        Копировать ссылку
                    </Button>

                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        title="Отключить ссылку"
                        onClick={disableShare}
                    >
                        <X className="size-4" />
                    </Button>
                </div>
            )}
        </div>
    );


}

