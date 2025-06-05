"use client";
import {LinkPage} from "@/features";
import Header from "@shared/ui/header/Header";

export default function Page() {
    return (
        <>
            <Header />
            <LinkPage title={'Privacy Policy'} />
        </>
    );
}