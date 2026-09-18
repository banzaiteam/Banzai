import {PATHS} from "@shared/ui/menu/lib/constans";


export const checkIsActive = (href: string = '',pathname:string|null) => {
    if (href === PATHS.home) {
        return href === pathname
    }
    if(pathname === null){
        pathname=''
    }
    return pathname.startsWith(href)
}