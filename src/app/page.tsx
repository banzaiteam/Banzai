import colors from "tailwindcss/colors";
import {AlertToast, Pagination, RadixTextarea} from "@shared/ui";
import {Calendar} from "@/assets/icons/components";

export default function Page() {
  return (
    <main>
      <AlertToast status={"error"} message={'Error! The format of the uploaded photo must be PNG and JPEG'} />
      <AlertToast status={"error"} message={'Error! Server is not available'} hasCloseButton={true}/>
      <AlertToast status={"success"} message={'Your settings are saved'} hasCloseButton={true}/>
      Banzai
      <RadixTextarea/>
      <RadixTextarea disabled/>
      <RadixTextarea error errorMessage='Ошибка'/>
<Calendar/>
      <div style={{padding: '40px'}}>
        <Pagination/>
      </div>
    </main>
  );
}
