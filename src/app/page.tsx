"use client";
import colors from "tailwindcss/colors";
import { Pagination, Textarea } from "@shared/ui";
import { Calendar } from "@/assets/icons/components";
import Header from "@/shared/ui/header/Header";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Textarea title={"Заголовок"} placeholder="Введите текст..." />
        <Textarea title={"Заголовок"} placeholder="Введите текст..." disabled />
        <Textarea title={"Заголовок"} errorMessage="Ошибка" />
        <Calendar />
        <div style={{ padding: "40px" }}>
          <Pagination />
        </div>
      </main>
    </>
  );
}
