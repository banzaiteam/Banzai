import React, {useMemo} from 'react';
import {SidebarBase, SidebarBaseItem, SidebarBaseNavigation, type SidebarBaseProps} from "@shared/ui";
import {linksData} from "@features/sidebar/model/linksData";
import {LogOutOutline} from "@/assets/icons/components";

type SidebarProps = SidebarBaseProps & { isDisabled?: boolean, onClick?: () => void };

export const Sidebar = (props:SidebarProps) => {

    const {isDisabled,onClick,...rest} = props;

    const sidebarItemsMapped = useMemo(() => {

        return  linksData.map(({id,title,path,icon,iconActive},index) => {

            const isActive = isDisabled ? false : index===0;//для самой первой ссылки с иконкой

            return  <SidebarBaseItem disabled={isDisabled} key={id} path={path} icon={isActive ? iconActive : icon} isActive={isActive}>{title}</SidebarBaseItem>
        })
    },[])


    return <SidebarBase  {...rest}>
        <SidebarBaseNavigation>
            {sidebarItemsMapped}
        </SidebarBaseNavigation>
        {onClick && <SidebarBaseItem isActive={isDisabled} disabled={isDisabled} icon={<LogOutOutline stroke={'currentColor'} />} onClick={onClick}>Log Out</SidebarBaseItem>}
    </SidebarBase>

};

