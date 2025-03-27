import {currentUser} from "@clerk/nextjs/server";
import Navbar from "@/app/(website)/_components/Navbar";
import Hero from "@/app/(website)/_components/Hero";

const Page = async () => {

    const user = await currentUser();

    return <div>
        <Navbar isLoggedIn={user ? true : false} />
        <Hero/>
    </div>
}

export default Page