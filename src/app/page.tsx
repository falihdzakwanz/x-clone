import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";
import { fetchTweets } from "@/utils/fetchTweets";
import { Tweet } from "@/types/tweet.type";

export default async function Home() {
  const tweets: Tweet[] = await fetchTweets();

  return (
    <div className="lg:max-w-6xl mx-auto max-h-screen overflow-hidden">
      <main className="grid grid-cols-9">
        <Sidebar />
        <Feed tweets={tweets} />
        <Widgets />
      </main>
    </div>
  );
}
