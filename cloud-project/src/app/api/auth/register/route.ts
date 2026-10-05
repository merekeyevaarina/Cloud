import {registerUser} from "@/src/users/service";

export async function POST (request: Request) {
    const body = await request.json();
    console.log(body);

const result = await registerUser(
    body.email,
        body.password,
    )
    return Response.json(result);
}