'use client'

import {NavMenu, NavMenuItem, NavMenuList} from "@shared/ui";
import {usePathname} from "next/navigation";
import {useIsMobile} from "@shared/ui/navMenu/lib/useIsMobile";
import {checkIsActive} from "@shared/ui/navMenu/lib/checkIsActive";
import {navMenuItemsData} from "@shared/ui/navMenu/lib/navMenuItemsData";

type Props = {};


export const MobileNavigation = (props: Props) => {

    const pathname = usePathname()
    const isMobile = useIsMobile()


    const mappedNavMenuItems = navMenuItemsData.map(({id, path, label, icon,activeIcon}) => {
        const isActive = checkIsActive(path,pathname)

        return <NavMenuItem isActive={isActive}  key={id} path={path} aria-label={label}>
            {isActive ?  activeIcon : icon}
                </NavMenuItem>
    })

    return <>
        {isMobile && <NavMenu>
            <NavMenuList>
                {mappedNavMenuItems}
            </NavMenuList>
        </NavMenu>}
    </>;
};



