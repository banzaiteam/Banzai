'use client'
import {Pagination,Input, RadixTextarea} from "@shared/ui";
import {Calendar, EyeOffOutline, EyeOutline, Search} from "@/assets/icons/components";
import {InputSlot} from "@shared/ui/input/Input";
import {useState} from "react";


export default function Page() {

    const [isShowPassword,setIsShowPassword] = useState(false);
  return (
      <main>
          Banzai
          <Input placeholder={'text...'}/>
          <Input disabled placeholder={'text...'}>

              <EyeOutline stroke={'currentColor'}/>
          </Input>

          <div style={{padding: '25px'}}>
              <Input placeholder={'text...'} subTitle={'suffix'}>

                  <EyeOutline stroke={'currentColor'}/>

              </Input>

          </div>
          <div style={{padding: '25px'}}>
              <Input placeholder={'text...'} disabled subTitle={'suffix'}>

                  <EyeOutline stroke={'currentColor'}/>

              </Input>

          </div>
          <div style={{padding: '25px'}}>
              <Input placeholder={'password'} type={isShowPassword ? 'text' : 'password'}>

                  <InputSlot aria-label={isShowPassword ? 'Показывать' : 'Не показывать'} onClick={() => {
                      setIsShowPassword(!isShowPassword)
                  }}>
                      {isShowPassword ? <EyeOffOutline stroke={'currentColor'}/> :
                          <EyeOutline stroke={'currentColor'}/>}
                  </InputSlot>

              </Input>

          </div>
          <div style={{padding: '25px'}}>
              <Input placeholder={'text...'} disabled subTitle={'suffix'} side={'left'}>

                  <EyeOutline stroke={'currentColor'}/>

              </Input>

          </div>

          <div style={{padding: '25px'}}>
              <Input placeholder={'text...'} error helperText={'help...'} subTitle={'suffix'} side={'left'}>


<InputSlot>
    <Search stroke={'currentColor'} />
</InputSlot>
              </Input>

          </div>

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
