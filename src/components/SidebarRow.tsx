import React, { SVGProps } from 'react';
import { BellIcon } from '@heroicons/react/24/outline';

interface Props {
    Icon: typeof BellIcon;
    title: string;
    onClick?: () => {};
}

function SidebarRow({ Icon, title, onClick }: Props) {
    return (
        <div
            onClick={() => onClick?.()}
            className="flex items-center max-w-fit space-x-2 px-4 py-3 rounded-full hover:bg-gray-100 cursor-pointer transition-all duration-200 group"
        >
            <Icon className="h-6 w-6" />
            <p className="hidden  group-hover:text-twitter-blue text-base font-light lg:text-xl md:inline-flex">
                {title}
            </p>
        </div>
    );
}

export default SidebarRow;
