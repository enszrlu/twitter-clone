import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

function Widgets() {
    return (
        <div className="hidden px-2 mt-2 col-span-2 lg:inline ">
            <div className="flex items-center space-x-2 rounded-full bg-gray-100 p-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400"></MagnifyingGlassIcon>
                <input
                    type="text"
                    placeholder="Search Twitter"
                    className="bg-transparent outline-none flex-1"
                />
            </div>

            <TwitterTimelineEmbed
                sourceType="profile"
                screenName="ankara_kusu"
                options={{ height: 400 }}
            />
        </div>
    );
}

export default Widgets;
