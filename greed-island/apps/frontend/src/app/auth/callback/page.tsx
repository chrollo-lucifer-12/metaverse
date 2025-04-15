import {onAuthenticateUser} from "@/actions/user";
import {redirect} from "next/navigation";

const AuthPage = async () => {
    const checkAuth = await onAuthenticateUser();

    if (checkAuth) {
        return redirect("/")
    }

     redirect("/auth/sign-in")
}

export default AuthPage