import colors from "tailwindcss/colors";
import {Pagination, RadixTextarea} from "@shared/ui";
import {Calendar} from "@/assets/icons/components";

export default function Page() {
  return (
    <main>
      Banzai
      <RadixTextarea  />
      <RadixTextarea disabled/>
      <RadixTextarea error errorMessage='Ошибка'/>
<Calendar/>
      <div style={{padding: '40px'}}>
        <Pagination/>
      </div>

    </main>
  );
}
