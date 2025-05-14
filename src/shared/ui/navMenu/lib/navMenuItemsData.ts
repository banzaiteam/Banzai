import {PATHS} from "@shared/ui/navMenu/lib/constans";

type NavMenuItemData = {
    id: number | string;
    label: string;
    nameIcon: string;
    path:typeof PATHS[keyof typeof PATHS]; //union
}
export const navMenuItemsData:NavMenuItemData[] = [
    {
        id: 1,
        label: 'feed',
        nameIcon: 'home',
        path: PATHS.feed
    }, {
        id: 2,
        label: 'create',
        nameIcon: 'plus-square',
        path: PATHS.create
    }, {
        id: 3,
        label: 'messenger',
        nameIcon: 'message-circle',
        path: PATHS.messenger
    }, {
        id: 4,
        label: 'search',
        nameIcon: 'search',
        path: PATHS.search
    }, {
        id: 5,
        label: 'my profile',
        nameIcon: 'person',
        path: PATHS.profile
    },
];