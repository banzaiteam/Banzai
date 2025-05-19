'use client'
import {useMemo} from "react";
import {Sidebar, Textarea} from "@shared/ui";
import {SidebarGroup, SidebarItem, SidebarNavigation} from "@shared/ui/sidebar/Sidebar";
import {
    Bookmark,
    BookmarkOutline,
    Home,
    HomeOutline, LogOutOutline, MessageCircle,
    MessageCircleOutline,
    Person,
    PersonOutline,
    PlusSquare,
    PlusSquareOutline, Search, SearchOutline, TrendingUp, TrendingUpOutline
} from "@/assets/icons/components";
import {usePathname} from "next/navigation";

export default function Page() {


    const pathname = usePathname();

    const linksData = [{
        id: 1,
        title: "Feed",
        path: '/feed',
        icon: <HomeOutline stroke={'currentColor'}/>,
        iconActive: <Home stroke={'currentColor'}/>,
    },{
        id: 2,
        title: "Create",
        path: '/create',
        icon: <PlusSquareOutline stroke={'currentColor'}/>,
        iconActive: <PlusSquare stroke={'currentColor'}/>,
    },{
        id: 3,
        title: "Profile",
        path: '/profile',
        icon: <PersonOutline stroke={'currentColor'}/>,
        iconActive: <Person stroke={'currentColor'}/>,
    },{
        id: 4,
        title: "Messenger",
        path: '/messenger',
        icon: <MessageCircleOutline stroke={'currentColor'}/>,
        iconActive: <MessageCircle stroke={'currentColor'}/>,
    },{
        id: 5,
        title: "Search",
        path: '/search',
        icon: <SearchOutline stroke={'currentColor'}/>,
        iconActive: <Search stroke={'currentColor'}/>,
    },{
        id: 6,
        title: "Statistics",
        path: '/statistics',
        icon: <TrendingUpOutline stroke={'currentColor'}/>,
        iconActive: <TrendingUp stroke={'currentColor'}/>,
    },{
        id: 7,
        title: "Favorites",
        path: '/favorites',
        icon: <BookmarkOutline stroke={'currentColor'}/>,
        iconActive: <Bookmark stroke={'currentColor'}/>,
    }];

const sidebarItemMapped = useMemo(() => {
    return  linksData.map(({id,title,path,icon,iconActive}) => <SidebarItem key={id} path={path} icon={pathname.startsWith(path) ? iconActive : icon}>{title}</SidebarItem>)
},[])
    return (

        <div style={{
            display: 'grid',
            gridTemplateAreas: `
             "header header"
             "sidebar main"
                        `,
            gridTemplateColumns: 'auto 1fr', // sidebar — auto, main — растягивается
            gridTemplateRows: 'auto 1fr',    // header — auto, остальное — по контенту
            height: '100vh',                 // на всю высоту экрана
            gap: '16px'                      // отступы между областями
        }}>

            <header style={{gridArea: 'header'}}>
                <Textarea title={'test'}/>
            </header>
            <Sidebar style={{gridArea: 'sidebar'}}>
                <SidebarNavigation>
                    <SidebarGroup>
                        {sidebarItemMapped}
                    </SidebarGroup>
                </SidebarNavigation>
                <SidebarItem icon={<LogOutOutline stroke={'currentColor'} />} onClick={()=>alert('321')}>Log Out</SidebarItem>
            </Sidebar>


            <main style={{gridArea: 'main'}}>
                <Textarea title={'test'}/>
            </main>
        </div>


    );

}
