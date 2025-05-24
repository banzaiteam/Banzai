import {PATHS} from "@shared/ui/navMenu/lib/constans";


export const checkIsActive = (href: string,pathname:string) => {
    if (href === PATHS.home) {
        return href === pathname
    }
    return pathname.startsWith(href)
}