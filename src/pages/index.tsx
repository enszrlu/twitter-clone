import Feed from '@/components/Feed';
import Sidebar from '@/components/Sidebar';
import Widgets from '@/components/Widgets';
import { fetchTweets } from '@/utils/fetchTweets';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Tweet } from '../../typings';
import { Toaster } from 'react-hot-toast';

interface Props {
    tweets: Tweet[];
}
export default function Home({ tweets }: Props) {
    return (
        <div className="lg:max-w-6xl mx-auto max-h-screen overflow-hidden">
            <Head>
                <title>Twitter</title>
                <link rel="icon" href="/img/twitter.png" />
            </Head>
            <Toaster />

            <main className="grid grid-cols-9">
                <Sidebar></Sidebar>

                <Feed tweets={tweets}></Feed>

                <Widgets></Widgets>
            </main>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const tweets = await fetchTweets();

    return {
        props: {
            tweets
        }
    };
};
