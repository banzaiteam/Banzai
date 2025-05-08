import colors from "tailwindcss/colors";
import {Icon} from "@shared/ui/icon/Icon";
import {Textarea} from "@shared/ui/textarea/Textarea";
import {Input} from "@shared/ui/input/Input";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      Banzai
      <Textarea/>
      <Textarea disabled/>
      <Textarea error errorMessage='Ошибка'/>
            <Icon name="home-outline" size={92} stroke='#fff' />
        <div className={'flex flex-col gap-y-8 py-8' }>
            <Input  type={'email'} placeholder={'Email'} subTitle={'Email'} />
            <Input  type={'password'} placeholder={'Password'} subTitle={'Password'} icon={ <Icon name="eye" size={24} stroke='currentColor' />} />
            <Input   placeholder={'Input search'} icon={<Icon name="search" size={24} stroke='currentColor' />} iconPosition={'left'} />
        </div>


    </main>
  );
}
