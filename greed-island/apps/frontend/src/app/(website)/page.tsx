import {currentUser} from "@clerk/nextjs/server";
import Navbar from "@/app/(website)/_components/Navbar";
import Hero from "@/app/(website)/_components/Hero";
import Features from "@/app/(website)/_components/Features";
import Interactive from "@/app/(website)/_components/Interactive";
import Footer from "@/app/(website)/_components/Footer";

const Page = async () => {

    const user = await currentUser();

    return <div>
        <Navbar isLoggedIn={user ? true : false} />
        <Hero/>
        <Features/>
        <Interactive/>
        <Footer/>
    </div>
}

export default Page