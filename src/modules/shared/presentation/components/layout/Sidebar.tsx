'use client'
import { BarChart4, MonitorPlay } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathName = usePathname();
  const sidebarRoutes = [
    { icon: <MonitorPlay/>, label: 'Courses', path: '/instructor/courses' },
    { icon: <BarChart4/>, label: 'Performance', path: '/instructor/performance' }
  ]
  return (
    <div className="max-sm:hidden flex flex-col w-64 px-3 py-3 my-4 gap-4 text-sm font-medium h-full">
      {
        sidebarRoutes.map((route)=>(
          <Link href={route.path} key={route.path}
            className={`flex items-center gap-4 p-3 rounded-lg hover:bg-[#dfcbfa] ${pathName.startsWith(route.path) ? 'text-[#9747FF]' : ''}`}
          >
            {route.icon} {route.label}
          </Link>
        ))
      }
    </div>
  );
}

export default Sidebar;
