import React from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import TweetBox from './TweetBox';
import { Tweet } from '../../typings';
import TweetComponent from './Tweet';
import { fetchTweets } from '@/utils/fetchTweets';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
    tweets: Tweet[];
}

function Feed({ tweets: tweetsProp }: Props) {
    const [tweets, setTweets] = useState<Tweet[]>(tweetsProp);

    const handleRefresh = async () => {
        const refreshToast = toast.loading('Refreshing tweets...');
        const tweets = await fetchTweets();
        setTweets(tweets);

        toast.success('Tweets refreshed!', {
            id: refreshToast
        });
    };

    return (
        <div className="col-span-7 lg:col-span-5 border-x max-h-screen overflow-scroll scrollbar-hide">
            <div className="flex items-center justify-between">
                <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
                <ArrowPathIcon
                    className="mr-5 mt-5 cursor-pointer h-6 w-6 text-twitter-blue transition-all duration-500 ease-out hover:rotate-180 active:scale-125"
                    onClick={handleRefresh}
                />
            </div>

            <div>
                <TweetBox setTweets={setTweets}></TweetBox>
            </div>

            <div>
                {tweets.map((tweet) => (
                    <TweetComponent key={tweet._id} tweet={tweet}></TweetComponent>
                ))}
            </div>
        </div>
    );
}

export default Feed;
