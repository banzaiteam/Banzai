'use client'
import {Pagination, Textarea} from "@shared/ui";
import {Calendar} from "@/assets/icons/components";
import {useState} from "react";

export default function Page() {

  const [currentPage, setCurrentPage] = useState(1);

  return (
    <main>
      Banzai
      <Textarea style={{marginRight: '20px'}} title={'Заголовок'} placeholder="Введите текст..."/>
      <Textarea title={'Заголовок'} placeholder="Введите текст..." disabled/>
      <Textarea title={'Заголовок'} errorMessage='Ошибка'/>

      <Calendar/>
      <div style={{padding: '40px'}}>
        <Pagination
          currentPage={currentPage}
          onPageChange={(page)=>setCurrentPage(page)}
          totalPages={15}/>
      </div>

    </main>
  );
}
