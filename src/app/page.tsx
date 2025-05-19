import colors from "tailwindcss/colors";
import {Pagination, Button, Textarea} from "@shared/ui";
import { Calendar, FlagRussia } from "@/assets/icons/components";

export default function Page() {
  return (
    <main >
      <div style={{display: 'flex', gap: '20px', padding: '40px 0 0 20px'}}>
        <Button>{'Button'}</Button>
        <Button width="103px">{'Follow'}</Button>
        <Button disabled>{'Button'}</Button>
        <Button variant="secondary">{'Button'}</Button>
        <Button variant="secondary">{'Button Button Button Button Button'}</Button>
        {/* <Button variant="outline">{'Button'}</Button> */}
        {/* <Button variant="outline" width="300px" minHeight="48px">{'Yes'}</Button> */}
        {/* <Button variant="outline" width="300px" minHeight="48px" disabled>{'Yes'}</Button> */}
        <Button variant="text-button">{'Button'}</Button>
        <Button variant="variant21">
          <FlagRussia/>
          {'Russia'}
        </Button>
      </div>
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
