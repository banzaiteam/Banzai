import colors from "tailwindcss/colors";
import {Icon} from "@shared/ui/icon/Icon";
import {Input, RadixTextarea} from "@shared/ui";


export default function Page() {
  return (
      <main>
          Banzai
          <Input  placeholder={'text...'}/>
          <Input disabled placeholder={'text...'}/>
          <Input placeholder={'text...'} error helperText={'some error...'}/>
          <RadixTextarea/>
          <RadixTextarea disabled/>
          <RadixTextarea error errorMessage='Ошибка'/>
                <Icon name="home-outline" size={92} stroke='#fff'/>
      </main>
  );
}
