import React from 'react';
import {
    BellIcon,
    HashtagIcon,
    BookmarkIcon,
    RectangleStackIcon,
    EllipsisHorizontalCircleIcon,
    EnvelopeIcon,
    UserIcon,
    HomeIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import SidebarRow from './SidebarRow';
import { useSession, signIn, signOut } from 'next-auth/react';

function Sidebar() {
    const { data: session } = useSession();
    return (
        <div className="flex flex-col col-span-2 items-center px-4 md:items-align">
            <Image
                className="m-3"
                src="/img/twitter.png"
                width={40}
                height={40}
                alt="Twitter Logo"
            />
            <SidebarRow Icon={HomeIcon} title="Home" />
            <SidebarRow Icon={HashtagIcon} title="Explore" />
            <SidebarRow Icon={BellIcon} title="Notifications" />
            <SidebarRow Icon={EnvelopeIcon} title="Messages" />
            <SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
            <SidebarRow Icon={RectangleStackIcon} title="Lists" />
            <SidebarRow
                Icon={UserIcon}
                onClick={session ? signOut : signIn}
                title={session ? 'Sign Out' : 'Sign In'}
            />
            <SidebarRow Icon={EllipsisHorizontalCircleIcon} title="More" />
        </div>
    );
}

export default Sidebar;
