'use client'

import {Navigation, NavMenuItem, NavMenuList} from "@shared/ui";
import {usePathname} from "next/navigation";
import {useIsMobile} from "@shared/ui/menu/lib/useIsMobile";
import {navigationItemsData} from "@shared/ui/menu/lib/NavigationItemsData";
import {checkIsActive} from "@shared/ui/menu/lib/checkIsActive";

type Props = {
    isOpen?: boolean;
};


export const Menu = ({isOpen=false}: Props) => {

    const pathname = usePathname()
    const isMobile = useIsMobile()


    const mappedNavMenuItems = navigationItemsData.map(({id, path, label, icon,activeIcon}) => {
        const isActive = checkIsActive(path,pathname)

        return <NavMenuItem isActive={isActive}  key={id} path={path} aria-label={label}>
            {isActive ?  activeIcon : icon}
                </NavMenuItem>
    })

    return <>
        {isMobile||isOpen && <Navigation>
            <NavMenuList>
                {mappedNavMenuItems}
            </NavMenuList>
        </Navigation>}
    </>;
};



