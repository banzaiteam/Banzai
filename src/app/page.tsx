'use client'
import {Pagination, Textarea} from "@shared/ui";
import {Calendar} from "@/assets/icons/components";
import {useState} from "react";
import colors from "tailwindcss/colors";
import {Icon} from "@shared/ui/icon/Icon";
import {MobileNavigation, RadixTextarea} from "@shared/ui";

export default function Page() {

  const [currentPage, setCurrentPage] = useState(1);

  return (
    <main>
      Banzai
      <Textarea title={'Заголовок'} placeholder="Введите текст..."/>
      <Textarea title={'Заголовок'} placeholder="Введите текст..." disabled/>
      <Textarea title={'Заголовок'} errorMessage='Ошибка'/>
      <Calendar/>
      <div style={{padding: '40px'}}>
        <Pagination
          currentPage={currentPage}
          onPageChange={(page)=>setCurrentPage(page)}
          totalPages={15}/>
      </div>
        <MobileNavigation />
    </main>
  );
}
