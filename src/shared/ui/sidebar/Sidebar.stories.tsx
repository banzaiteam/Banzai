import type {Meta, StoryObj} from '@storybook/react';
import {Sidebar, SidebarGroup, SidebarItem, SidebarNavigation} from "@shared/ui";
import type {SidebarProps} from "@shared/ui/sidebar/Sidebar";
import {useMemo} from "react";
import {LogOutOutline} from "@/assets/icons/components";
import {linksData} from "@shared/ui/sidebar/linksData";

type RenderDefaultProps = SidebarProps & {
    isDisabled?: boolean;
}

const RenderDefault = (props: RenderDefaultProps) => {

    const {isDisabled=false,...rest} = props;

    const sidebarItemMapped = useMemo(() => {

        return  linksData.map(({id,title,path,icon,iconActive},index) => {

            const isActive = isDisabled ? false : index===0;

            return  <SidebarItem disabled={isDisabled} key={id} path={path} icon={isActive ? iconActive : icon} isActive={isActive}>{title}</SidebarItem>
        })
    },[])


    return  <Sidebar style={{gridArea: 'sidebar'}} {...rest}>
        <SidebarNavigation>
            <SidebarGroup>
                {sidebarItemMapped}
            </SidebarGroup>
        </SidebarNavigation>
        <SidebarItem isActive={isDisabled} disabled={isDisabled} icon={<LogOutOutline stroke={'currentColor'} />} onClick={()=>alert('Some event')}>Log Out</SidebarItem>
    </Sidebar>
}


const meta: Meta<typeof Sidebar> = {
    title: 'Shared/Sidebar',
    component: Sidebar,
    tags: ['autodocs'],

    /*decorators: [
        (Story) => (
            <Theme>
                <Story />
            </Theme>
        ),
    ],*/
  /*  argTypes: {},*/
} satisfies Meta<typeof Sidebar>

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
    render:(props)=><RenderDefault {...props}/>,
};



export const Disabled: Story = {
    ...Default,
    render:(props)=><RenderDefault isDisabled={true} {...props}/>,
};






