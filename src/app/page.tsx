'use client'
import {Textarea} from "@shared/ui";

import {Pagination,Input} from "@shared/ui";
import {InputSlot} from "@shared/ui/input/Input";
import {useState} from "react";
import {Calendar, EyeOffOutline, EyeOutline, Search} from "@/assets/icons/components";


export default function Page() {

    const [isShowPassword,setIsShowPassword] = useState(false);
  return (
    <main>
      Banzai
      <Textarea title={'Заголовок'} placeholder="Введите текст..."/>
      <Textarea title={'Заголовок'} placeholder="Введите текст..." disabled/>
      <Textarea title={'Заголовок'} errorMessage='Ошибка'/>
      <Calendar/>
      <div style={{padding: '40px'}}>
        <Pagination/>
      </div>
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

        <Calendar/>
        <div style={{padding: '40px'}}>
            <Pagination/>
        </div>
    </main>
  )
}
