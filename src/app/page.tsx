import {Pagination,Input, RadixTextarea} from "@shared/ui";
import {Calendar, EyeOutline} from "@/assets/icons/components";
export default function Page() {
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
              <Input placeholder={'text...'} error helperText={'some error...'}>


              </Input>

          </div>
          <div style={{padding: '25px'}}>
              <Input placeholder={'text...'} disabled subTitle={'suffix'} side={'left'}>

                  <EyeOutline stroke={'currentColor'}/>

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
