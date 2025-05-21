'use client'
import {useMemo} from "react";
import {Sidebar, Textarea} from "@shared/ui";
import {SidebarGroup, SidebarItem, SidebarNavigation} from "@shared/ui/sidebar/Sidebar";
import {LogOutOutline} from "@/assets/icons/components";
import {usePathname} from "next/navigation";
import {linksData} from "@shared/ui/sidebar/linksData";

export default function Page() {


    const pathname = usePathname();



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
