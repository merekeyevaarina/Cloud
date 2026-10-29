'use client'

import {useRef, useState} from "react";
import {useRouter} from "next/navigation";
import { Button } from "@/src/shared/ui/button";
import { Upload } from "lucide-react";

type UploadFileButtonProps = {
    folderId: string | null
}

export function UploadFileButton({folderId}: UploadFileButtonProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()
    const[uploading, setUploading] = useState(false)
    const [error, setError] = useState('')

    async function handleFileChange(
        event: React.ChangeEvent<HTMLInputElement>
    ){
        const file = event.target.files?.[0]
        if(!file) return;

        setError('')
        setUploading(true);

        try{
            const formData = new FormData();
            formData.append('file', file)

            if(folderId){
                formData.append('folderId', folderId)
            }
            const response = await fetch("/api/v1/files", {
                method: 'POST',
                body: formData,
            })
            const result = await response.json();
            if(!response.ok){
                throw new Error(result.error || "Не удалось загрузить файл")
            }
            router.refresh()

        }catch(error){
            setError(
                error instanceof Error
                    ? error.message
                    : "Не удалось загрузить файл"
            )
        } finally{
            setUploading(false)
            if(inputRef.current){
                inputRef.current.value = "";
            }
        }
    }
 return (
     <div>
         <input ref={inputRef}
                onChange={handleFileChange}
                type="file"
                className="hidden"
                disabled={uploading}
         />
         <Button
             type="button"
             variant="outline"
             className="h-10 rounded-xl px-4"
             disabled={uploading}
             onClick={() => inputRef.current?.click()}
         >
             <Upload aria-hidden="true" />
             {uploading ? "Загрузка..." : "Загрузить"}
         </Button>
         {error && (
             <p role="alert" className="mt-2 text-sm text-destructive">
                 {error}
             </p>
         )}
     </div>
 )

}