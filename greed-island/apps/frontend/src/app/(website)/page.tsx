import {currentUser} from "@clerk/nextjs/server";
import Navbar from "@/app/(website)/_components/Navbar";

const Page = async () => {

    const user = await currentUser();

    return <div>
        <Navbar isLoggedIn={user ? true : false} />
    </div>
}

export default Page