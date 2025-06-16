'use client'
import {Pagination, Textarea} from "@shared/ui";
import { Calendar } from "@/assets/icons/components";
import {useState} from "react";

export default function Page() {
  return (
    <main >
      Banzai
      <Textarea title={'Заголовок'} placeholder="Введите текст..."/>
      <Textarea title={'Заголовок'} placeholder="Введите текст..." disabled/>
      <Textarea title={'Заголовок'} errorMessage='Ошибка'/>
      <Calendar/>
      <div style={{padding: '40px'}}>
        <Pagination/>
      </div>

    </main>
  );
}
