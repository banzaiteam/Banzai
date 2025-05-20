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

    return  linksData.map(({id,title,path,icon,iconActive}) => {

    const isActive = pathname.startsWith(path);

        return  <SidebarItem key={id} path={path} icon={isActive ? iconActive : icon} isActive={isActive}>{title}</SidebarItem>
    })
},[])
    return (

        <div style={{
            display: 'grid',
            gridTemplateAreas: `
             "header header"
             "sidebar main"
                        `,
            gridTemplateColumns: 'auto 1fr',
            gridTemplateRows: 'auto 1fr',
            height: '100vh',
            gap: '16px'
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
                <SidebarItem isActive={true} icon={<LogOutOutline stroke={'currentColor'} />} onClick={()=>alert('Some event')}>Log Out</SidebarItem>
            </Sidebar>


            <main style={{gridArea: 'main'}}>
                <Textarea title={'test'}/>
            </main>
        </div>


    );

}
