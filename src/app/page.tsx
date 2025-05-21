import colors from "tailwindcss/colors";
import {DatePicker, Pagination, Textarea} from "@shared/ui";
import {Calendar, CalendarOutline} from "@/assets/icons/components";

export default function Page() {
  return (
    <main>
      <div style={{maxWidth: '900px', width: '100%', padding: '20px'}}>
        <DatePicker label={"Date select"}
                    id='1'
          />
        <DatePicker label={"Date select"}
                    id='3'
                    disabled={true}
          />

        <DatePicker 
          id="birth-date"
          label="Birth-date"
          required
          errorMessage="Please enter a valid date"
        />

        <DatePicker 
          id="range"
          label="Date range"
          mode="range"
        />

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
