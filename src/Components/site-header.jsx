"use client"

import { SearchForm } from "@/components/search-form"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useSidebar } from "@/components/ui/sidebar"
import { Link } from "react-router"
import { BellRingIcon, SidebarIcon, User2Icon } from "lucide-react"


export function SiteHeader() {
  const { toggleSidebar } = useSidebar()

  return (
    <header
      className="flex sticky  z-50 w-full items-center border-b ">
      <div className="flex h-20 w-full items-center gap-2 px-4">
        <Button className="h-8 w-8" variant="ghost" size="icon" data-sidebar="trigger" onClick={toggleSidebar}>
          <SidebarIcon />
        </Button>
        <SearchForm className="w-full sm:ml-auto sm:w-auto md:left-full" />
        <Separator orientation="vertical" className="mr-2 h-4" />
      <Button className="h-16 w-16" variant="ghost" size="icon" data-sidebar="trigger" onClick={"/ProfilePage"}>
      <Link to= "/profile" ><User2Icon/></Link>
      </Button>
     
      </div>
    </header>
  );
}
