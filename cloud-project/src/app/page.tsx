import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {getUserBySession} from "@/src/auth/service";

export default async function HomePage() {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("session")?.value;

    if (!sessionId) {
        redirect("/login");
    }

    const user = await getUserBySession(sessionId)
    if (!user) {
        redirect("/login");
    }



    return (
        <main className="flex min-h-screen items-center justify-center">
            <p>
                Вы вошли как {user.email}
            </p>
            <h1 className="text-3xl font-semibold">
                Добро пожаловать в Cloud Drive
            </h1>
        </main>
    );
}