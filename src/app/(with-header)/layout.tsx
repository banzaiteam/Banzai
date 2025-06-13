'use client';
import '@radix-ui/themes/styles.css';
import Header from "@shared/ui/header/Header";


export default function WithHeaderLayout({children}: {
    children: React.ReactNode;
}) {

    return <>
        <Header/>
        <main>{children}</main>
    </>
}