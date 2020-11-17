import axios from "axios";
import AuthException from "../error/AuthError";

export async function currentSession() {
    const res = await axios.get("/check-session");

    if (res.data.profile_id !== "") {
        return res.data;
    }

    throw new AuthException("No valid sesion");
}