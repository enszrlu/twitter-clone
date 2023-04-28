import React, { useEffect, useState } from 'react';
import { Tweet, Comment, CommentBody } from '../../typings';
import TimeAgo from 'react-timeago';
import {
    ChatBubbleLeftRightIcon,
    ArrowsRightLeftIcon,
    HeartIcon,
    ArrowUpTrayIcon
} from '@heroicons/react/24/outline';
import { fetchComments } from '@/utils/fetchComments';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

interface Props {
    tweet: Tweet;
}
function Tweet({ tweet }: Props) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false);
    const [input, setInput] = useState<string>('');
    const { data: session } = useSession();

    const refreshComments = async () => {
        const comments: Comment[] = await fetchComments(tweet._id);
        setComments(comments);
    };

    const postComment = async () => {
        if (!input) return;

        const commentBody: CommentBody = {
            comment: input,
            username: session?.user?.name?.toLowerCase().replace(/ /g, '') || 'unknown',
            profileImg: session?.user?.image || '/img/avatar_placeholder.jpg',
            fullname: session?.user?.name || 'unknown',
            tweetId: tweet._id
        };

        const result = await fetch('/api/addComment', {
            method: 'POST',
            body: JSON.stringify(commentBody)
        });

        const json = await result.json();

        refreshComments();

        toast('Comment posted!', {
            icon: '👏'
        });

        return json;
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        postComment();

        setInput('');
        setCommentBoxVisible(false);
    };

    useEffect(() => {
        refreshComments();
    }, []);

    return (
        <div className="flex flex-col space-x-3 p-5 border-y border-gray-100">
            <div className="flex space-x-3">
                <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={tweet.profileImg}
                    alt="Profile"
                />
                <div>
                    <div className="flex items-center space-x-1">
                        <h4 className="font-bold mr-1">{tweet.fullname}</h4>
                        <h5 className="text-gray-500 hidden text-sm sm:inline">
                            @{tweet.username} ・
                        </h5>
                        <TimeAgo
                            className="text-sm text-gray-500"
                            date={tweet._createdAt}
                        ></TimeAgo>
                    </div>
                    <p>{tweet.text}</p>
                    {tweet.image && (
                        <img
                            src={tweet.image}
                            alt=""
                            className="m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover"
                        />
                    )}
                </div>
            </div>
            <div className="mt-5 flex justify-between">
                <div
                    className="flex cursor-pointer items-center space-x-3 text-gray-400"
                    onClick={() => session && setCommentBoxVisible(!commentBoxVisible)}
                >
                    <ChatBubbleLeftRightIcon className="h-5 w-5"></ChatBubbleLeftRightIcon>
                    <p>{comments.length}</p>
                </div>
                <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
                    <ArrowsRightLeftIcon className="h-5 w-5"></ArrowsRightLeftIcon>
                </div>
                <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
                    <HeartIcon className="h-5 w-5"></HeartIcon>
                </div>
                <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
                    <ArrowUpTrayIcon className="h-5 w-5"></ArrowUpTrayIcon>
                </div>
            </div>

            {commentBoxVisible && (
                <form className="mt-3 flex space-x-3" onSubmit={handleSubmit}>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        type="text"
                        placeholder="Write a comment...."
                        className="flex-1 rounded-lg outline-none bg-gray-100 p-2"
                    />
                    <button
                        className="text-twitter-blue disabled:text-gray-200"
                        disabled={!input}
                        type="submit"
                    >
                        Post
                    </button>
                </form>
            )}

            {comments?.length > 0 && (
                <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5">
                    {comments.map((comment) => (
                        <div className="relative space-x-2 flex" key={comment._id}>
                            <hr className="absolute left-5 top-8 h-8 border-x border-twitter-blue/30" />
                            <img
                                src={comment.profileImg}
                                className="h-7 w-7 rounded-full object-cover"
                                alt=""
                            />
                            <div>
                                <div className="flex items-center space-x-1">
                                    <p className="mr-1 font-bold">{comment.fullname}</p>
                                    <p className="hidden text-sm text-gray-500 lg:inline">
                                        @{comment.username}
                                    </p>
                                    <TimeAgo
                                        className="text-sm text-gray-500"
                                        date={comment._createdAt}
                                    ></TimeAgo>
                                </div>
                                <p>{comment.comment}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Tweet;
