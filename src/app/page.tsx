"use client";
import Header from "@/shared/ui/header/Header";
import {LoginForm} from "@features/auth/login/ui/LoginForm";

export default function Page() {
    return (
        <>
            <Header />
          <LoginForm/>
            <main>Banzai</main>
        </>
    );
}