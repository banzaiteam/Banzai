import colors from "tailwindcss/colors";
import {Icon} from "@shared/ui/icon/Icon";
import {RadixTextarea} from "@shared/ui";

export default function Page() {
  return (
    <main >
      Banzai
      <RadixTextarea/>
      <RadixTextarea disabled/>
      <RadixTextarea error errorMessage='Ошибка'/>
            <Icon name="home-outline" size={92} stroke='#fff'  />

    </main>
  );
}
