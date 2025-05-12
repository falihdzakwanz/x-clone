import React, { SVGProps, ComponentType } from "react";

interface Props {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  onClick?: () => void;
}

function SidebarRow({ Icon, title, onClick }: Props) {
  return (
    <div 
      onClick={onClick}
      className="flex max-w-fit items-center space-x-2 px-4 py-3 hover:bg-gray-100 rounded-full cursor-pointer transition-all group">
      <Icon className="h-6 w-6" />
      <p className="hidden md:inline-flex group-hover:text-twitter text-base font-light lg:text-xl">{title}</p>
    </div>
  );
}

export default SidebarRow;
