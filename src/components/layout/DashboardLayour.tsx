import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Link, Outlet } from "react-router"
import { Button } from "../ui/button"
import {  HomeIcon } from "lucide-react";

export default function DashboardLayout() {

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-10 border-b px-4 z-10 ">
          <SidebarTrigger className="-ml-1" />
          <Link to="/"> <Button variant="outline"> <HomeIcon/> Home Page </Button> </Link>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet/>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}