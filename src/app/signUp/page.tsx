import {Login} from "@/features";
import Header from "@shared/ui/header/Header";

export default function Page() {
    return (
        <>
            <Header />
            <main>
                <Login/>
            </main>
        </>
    );
}