import React, { useRef } from 'react';
import Image from 'next/image';
import {
    MagnifyingGlassCircleIcon,
    FaceSmileIcon,
    CalendarIcon,
    MapPinIcon,
    PhotoIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Tweet, TweetBody } from '../../typings';
import { fetchTweets } from '@/utils/fetchTweets';
import toast from 'react-hot-toast';

interface Props {
    setTweets: React.Dispatch<React.SetStateAction<Tweet[]>>;
}

function TweetBox({ setTweets }: Props) {
    const [input, setInput] = useState('');

    const { data: session } = useSession();

    const [image, setImage] = useState<string | undefined>();
    const imageInputRef = useRef<HTMLInputElement>(null);

    const addImageToTweet = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (!imageInputRef.current?.value) return;

        setImage(imageInputRef.current.value);
        setImageUrlBoxIsOpen(false);
        imageInputRef.current.value = '';
    };

    const postTweet = async () => {
        if (!input) return;

        const tweetBody: TweetBody = {
            text: input,
            image: image,
            username: session?.user?.name?.toLowerCase().replace(/ /g, '') || 'unknown',
            profileImg: session?.user?.image || '/img/avatar_placeholder.jpg',
            fullname: session?.user?.name || 'unknown'
        };

        const result = await fetch('/api/addTweet', {
            method: 'POST',
            body: JSON.stringify(tweetBody)
        });

        const json = await result.json();

        const newTweets = await fetchTweets();
        setTweets(newTweets);

        toast('Tweet posted!', {
            icon: '👏'
        });

        return json;
    };

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        postTweet();

        setInput('');
        setImage(undefined);
        setImageUrlBoxIsOpen(false);
    };

    const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false);

    return (
        <div className="flex space-x-2 p-5">
            <div className="relative h-14 w-14 mr-2">
                <Image
                    className="m-3 rounded-full"
                    src={session?.user?.image || '/img/avatar_placeholder.jpg'}
                    alt="Avatar placeholder"
                    fill
                />
            </div>

            <div className="flex flex-1 items-center pl-2">
                <form className="flex flex-1 flex-col">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        type="text"
                        placeholder="What's Happening?"
                        className="h-24 text-xl outline-none placeholder:text-xl w-full"
                    />
                    <div className="flex items-center">
                        <div className="flex flex-grow space-x-2 text-twitter-blue">
                            <PhotoIcon
                                className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
                                onClick={() => setImageUrlBoxIsOpen((prev) => !prev)}
                            ></PhotoIcon>
                            <MagnifyingGlassCircleIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
                            <FaceSmileIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"></FaceSmileIcon>
                            <CalendarIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"></CalendarIcon>
                            <MapPinIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"></MapPinIcon>
                        </div>
                        <button
                            disabled={!input || !session}
                            className="bg-twitter-blue px-5 py-2 text-white rounded-full font-bold cursor-pointer disabled:opacity-40 disabled:cursor-default"
                            onClick={handleSubmit}
                        >
                            Tweet
                        </button>
                    </div>
                    {imageUrlBoxIsOpen && (
                        <form className="mt-5 flex rounded-lg bg-twitter-blue/80 py-2 px-4">
                            <input
                                type="text"
                                ref={imageInputRef}
                                placeholder="Enter Image Url..."
                                className="flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white"
                            />
                            <button
                                type="submit"
                                onClick={addImageToTweet}
                                className="font-bold text-white"
                            >
                                Add Image
                            </button>
                        </form>
                    )}

                    {image && (
                        <img
                            src={image}
                            alt="Image to be tweeted"
                            className="mt-10 h-40 w-full rounded-xl object-contain shadow-lg"
                        />
                    )}
                </form>
            </div>
        </div>
    );
}

export default TweetBox;
