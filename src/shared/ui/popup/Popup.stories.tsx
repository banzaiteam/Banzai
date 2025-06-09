
import type { Meta, StoryObj } from '@storybook/react'
import {Button, Popup, PopupHeader} from '@/shared/ui'
import {DialogClose, DialogTitle} from "@radix-ui/react-dialog";
import {Close} from "@/assets/icons/components";
import {useState} from "react";


const Render = ()=>{
  const [isOpen, setIsOpen] = useState(true);

  const onClose = () => setIsOpen(false);

  return  <Popup open={isOpen}>
    <PopupHeader>
      <DialogTitle>Some Title</DialogTitle>
      <DialogClose onClick={onClose}>
        <Close />
      </DialogClose>
    </PopupHeader>
    <div style={{padding: '1rem'}}>
      <p>We have sent a link to confirm your email to epam@epam.com</p>
      <div style={{textAlign: 'right'}}>
        <Button variant="primary" onClick={onClose}>OK</Button>
      </div>
    </div>


  </Popup>
};

const meta = {
  title: 'Components/Popup',
  component: Popup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  render:Render,
} satisfies Meta<typeof Popup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
   args: {},
}
