"use client";
import EmailSent from "@/features/auth/emailSent/ui/EmailSent";
import Header from "@/shared/ui/header/Header";
import { LoginForm } from "@features/auth/login/ui/LoginForm";

export default function Page() {
  return (
    <>
      <Header />

      <LoginForm />
      <main>Banzai</main>
    </>
  );
}
